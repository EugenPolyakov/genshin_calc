import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import rjson from '@rollup/plugin-json';
import clear from 'rollup-plugin-clear';
import postcss from 'rollup-plugin-postcss';
import postcssCopy from 'postcss-copy';
import img from 'rollup-plugin-img';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import { asyncWalk } from 'estree-walker';
import { resolve as pathResolve, dirname, relative, basename, sep } from 'path';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';
import pkg from './package.json' with { type: 'json' };
import { readdirSync } from 'fs';

const POLYFILL_ID = '\0polyfill';
const __DEVEL__ = process.env.mode === 'development' || process.env.min === 'false';
const replaces = replace({
    'process.env.NODE_ENV': process.env.NODE_ENV,
    __VERSION__: JSON.stringify(pkg.version),
    __DEVEL__: JSON.stringify(__DEVEL__),
    // Важно для предотвращения случайных замен в присваиваниях
    preventAssignment: true
});

function doResolve(source, importer, options, id, dir) {
    if (source.charAt(0) == '.') {
        let realFile = pathResolve(dirname(importer), source);
        if (realFile.match(dir)) {

            return {
                id: id,
                external: true,
                resolvedBy: 'custom',
                moduleSideEffects: true,
            };
        }
    }
}

function classExport(source, importer, options) {
    return doResolve(source, importer, options, 'DB', /[\/\\]src[\/\\]js[\/\\]classes[\/\\]/) || doResolve(source, importer, options, 'DB', /[\/\\]src[\/\\]js[\/\\]db[\/\\]/);
}

function resolver(resolveList) {
    return {
        name: 'custom',
        async resolveId(source, importer, options) {
            if (source === POLYFILL_ID) {
                // It is important that side effects are always respected
                // for polyfills, otherwise using
                // "treeshake.moduleSideEffects: false" may prevent the
                // polyfill from being included.
                return { id: POLYFILL_ID, moduleSideEffects: true };
            } else if (!options.isEntry) {
                for (let res of resolveList) {
                    let result = res(source, importer, options);
                    if (result)
                        return result;
                }
            }
            return null;
        }
    };
}
function resolver2() {
    return {
        name: 'custom2',
        async resolveId(source, importer, options) {
            if (source === POLYFILL_ID) {
                // It is important that side effects are always respected
                // for polyfills, otherwise using
                // "treeshake.moduleSideEffects: false" may prevent the
                // polyfill from being included.
                return { id: POLYFILL_ID, moduleSideEffects: true };
            } else {
                let resolution = await this.resolve(source, importer, options);
                console.log('-' + source + '\n---' + importer + '\n---' + JSON.stringify(options) + '\n---' + JSON.stringify(resolution));
            }
            return null;
        }
    };
}

/**
 * Extract the relative path from an AST node representing this kind of expression `new URL('./path/to/asset.ext', import.meta.url)`.
 *
 * @param {import('estree').Node} node - The AST node
 * @returns {string} The relative path
 */
function getRelativeAssetPath(node) {
    // either normal string expression or else it would be Template Literal with a single quasi
    const browserPath = node.arguments[0].value ?? node.arguments[0].quasis[0].value.cooked;
    return browserPath.split('/').join(sep);
}
/**
 * Checks if a AST node represents this kind of expression: `new URL('./path/to/asset.ext', import.meta.url)`.
 *
 * @param {import('estree').Node} node - The AST node
 * @returns {undefined | 'static' | 'dynamic'}
 */
function getImportMetaUrlType(node) {
    const isNewURL =
        node.type === 'NewExpression' &&
        node.callee.type === 'Identifier' &&
        node.callee.name === 'URL' &&
        node.arguments.length === 2 &&
        (node.arguments[0].type === 'Literal' ||
            // Allow template literals, reuses @rollup/plugin-dynamic-import-vars logic
            node.arguments[0].type === 'TemplateLiteral') &&
        typeof getRelativeAssetPath(node) === 'string' &&
        node.arguments[1].type === 'MemberExpression' &&
        node.arguments[1].object.type === 'MetaProperty' &&
        node.arguments[1].property.type === 'Identifier' &&
        node.arguments[1].property.name === 'url';

    if (!isNewURL) {
        return undefined;
    }

    if (node.arguments[0].type === 'TemplateLiteral' && node.arguments[0].expressions.length > 0) {
        return 'dynamic';
    }

    return 'static';
}

var fileHashes = new Map();

function workerCallReplace() {
    return {
        name: 'workerCallReplace',
        async transform(code, id) {
            let newCode = code;

            let ast2 = this.parse(newCode);
            let replaceList = new Map();

            await asyncWalk(ast2, {
                enter: async node => {
                    let importMetaUrlType = getImportMetaUrlType(node);
                    if (!importMetaUrlType) {
                        return;
                    }

                    if (importMetaUrlType === 'static') {
                        let absoluteScriptDir = dirname(id);
                        let relativeAssetPath = getRelativeAssetPath(node);
                        let absoluteAssetPath = pathResolve(absoluteScriptDir, relativeAssetPath);
                        let test = relative(process.cwd(), absoluteAssetPath);

                        if (test.startsWith("src\\js\\workers\\")) {
                            replaceList.set(node.arguments[0].start, {
                                end: node.arguments[0].end,
                                replaceTo: absoluteAssetPath,
                            });
                        }
                    }
                },
            });

            if (replaceList.size > 0) {
                let result = '';
                let lastIndex = 0;
                for (let val of replaceList) {
                    result += newCode.substring(lastIndex, val[0]) + '"' + (fileHashes.get(val[1].replaceTo) ?? val[1].replaceTo) + '"';
                    lastIndex = val[1].end;
                }
                result += newCode.substring(lastIndex, newCode.length);

                return result;
            }

            return null;
        },
    };
}

function hashSaver() {
    return {
        name: 'hashSaver',
        generateBundle(options, bundle) {
            for (const [fileName, fileInfo] of Object.entries(bundle)) {
                if (fileInfo.type === 'chunk') {
                    fileHashes.set(fileInfo.facadeModuleId, fileName);
                }
            }
        }
    };
}

function workerInput(fileName) {
    return {
        input: './src/js/workers/' + fileName + '.js',
        output: {
            dir: 'dist/js',
            entryFileNames: fileName + '-[hash].js',
            format: 'iife',
            banner: "importScripts('db.js?' + " + JSON.stringify(pkg.version) + ");",
            globals: {
                DB: 'DB',
            },
        },
        plugins: [
            resolver([
                classExport,
            ]),
            commonjs(),
            replaces,
            resolve({
                // Включаем все модули в бандл
                browser: true,           // Использовать браузерные версии модулей
                preferBuiltins: false,   // Не предпочитать встроенные Node.js модули
                modulesOnly: false,      // Разрешать не только node_modules
                extensions: ['.jsx', '.js'],  // JSX в приоритете
            }),
            rjson(),
            __DEVEL__ ? {} : terser({
                mangle: true,
            }),
            hashSaver(),
        ],
    };
}

var nameCache = {};

export default [
    {
        input: './src/js/empty.js',
        output: {
            file: './dist/js/empty.js',
        },
        plugins: [
            clear({
                // required, point out which directories should be clear.
                targets: ['./dist'],
                // optional, whether clear the directores when rollup recompile on --watch mode.
                watch: true, // default: false
            }),
            copy({
                targets: [
                    { src: './src/images/stonks.jpg', dest: "./dist/images/", rename: 'share.jpg' },
                    { src: './src/images/favicon.png', dest: "./dist/images/" },
                    { src: './src/images/help', dest: "./dist/images/" },
                    { src: './src/help', dest: "./dist/" },
                    { src: './src/js/lang/**/*', dest: "./dist/js/lang/" },
                    {
                        src: './src/index.ejs',
                        dest: "./dist/",
                        rename: 'index.html',
                        transform: (contents, filename) => contents.toString().replaceAll('<%= version %>', pkg.version.toString()),
                    },
                ]
            }),
            {
                name: 'remove-all',
                generateBundle(outputOptions, bundle, isWrite) {
                    if (!isWrite) return; // только при реальной записи на диск

                    for (const fileName in bundle) {
                        delete bundle[fileName];
                    }
                }
            }
        ]
    },
    ...readdirSync(pathResolve('./src/js/workers')).map(file => workerInput(basename(file, '.js'))),
    {
        input: './src/js/generated/db.js',
        output: {
            file: 'dist/js/db.js',
            //dir: 'dist/test/',
            format: 'iife',
            name: 'DB',
            externalLiveBindings: false,
        },
        plugins: [
            resolve({
                // Включаем все модули в бандл
                browser: true,           // Использовать браузерные версии модулей
                preferBuiltins: false,   // Не предпочитать встроенные Node.js модули
                modulesOnly: false,      // Разрешать не только node_modules

                // ВАЖНО: Не указываем external, чтобы всё включилось
                // resolveOnly: []        // Не ограничиваем какие модули включать
            }),
            commonjs(),
            replaces,
            rjson(),
            __DEVEL__ ? {} : terser({
                mangle: true,
            }),
            workerCallReplace(),
        ],
    },
    {
        input: './src/js/app.js',
        output: {
            dir: 'dist',
            entryFileNames: 'js/app.js',
            format: 'iife',
            name: 'App',
            globals: {
                DB: 'DB',
            },
        },
        plugins: [
            resolver([
                classExport,
            ]),
            postcss({
                extract: 'css/ui.css',
                to: 'dist/css/ui.css',
                extensions: ['.css'],
                minimize: !__DEVEL__,
                plugins: [
                    postcssCopy({
                        basePath: process.cwd() + '\\src',
                        dest: 'dist',
                        template: '[path]/[name].[ext][query]',
                    }),
                ],
            }),
            commonjs(),
            replaces,
            resolve({
                // Включаем все модули в бандл
                browser: true,           // Использовать браузерные версии модулей
                preferBuiltins: false,   // Не предпочитать встроенные Node.js модули
                modulesOnly: false,      // Разрешать не только node_modules
                extensions: ['.jsx', '.js'],  // JSX в приоритете
            }),
            rjson(),
            img(),
            babel({
                assumptions: {
                    iterableIsArray: true,
                },
                //babelHelpers: 'bundled',
                presets: [
                    ['@babel/preset-env', { /*'targets': { 'ie': 10 }, 'useBuiltIns': "usage", 'corejs': '3'*/ }],
                    ['@babel/preset-react', { runtime: 'automatic' }]
                ],
                //extensions: ['.js', '.jsx'],
                //exclude: 'node_modules/**'
            }),
            __DEVEL__ ? {} : terser({
                mangle: true,
            }),
        ],
    },
];
