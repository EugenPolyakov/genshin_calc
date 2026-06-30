import RPresolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import rjson from '@rollup/plugin-json';
import clear from 'rollup-plugin-clear';
import RPpostcss from 'rollup-plugin-postcss';
import * as postcss from 'postcss';
//import postcssCopy from 'postcss-copy';
//import postcssCopy from 'postcss-copy-assets';
import img from 'rollup-plugin-img';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import { asyncWalk } from 'estree-walker';
//import { resolve, dirname, relative, basename, sep } from 'path';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';
import pkg from './package.json' with { type: 'json' };
import { readdirSync } from 'fs';

const POLYFILL_ID = '\0polyfill';
const __DEVEL__ = process.env.mode === 'development' || process.env.min === 'false';
const replaces = replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.mode),
    __VERSION__: JSON.stringify(pkg.version),
    __DEVEL__: JSON.stringify(__DEVEL__),
    // Важно для предотвращения случайных замен в присваиваниях
    preventAssignment: true
});
/**
 * Trims whitespace and quotes from css 'url()' values
 *
 * @param {string} value - string to trim
 * @returns {string} - the trimmed string
 */
function trimUrlValue(value) {
    var beginSlice, endSlice;
    value = value.trim();
    beginSlice = value.charAt(0) === '\'' || value.charAt(0) === '"' ? 1 : 0;
    endSlice = value.charAt(value.length - 1) === '\'' ||
        value.charAt(value.length - 1) === '"' ?
        -1 : undefined;
    return value.slice(beginSlice, endSlice).trim();
}

/**
 * Finds the base dir common to two paths.
 * For example '/a/b/c/d' and '/a/b/c/x/y' have '/a/b/c' in common.
 *
 * @param {string} a - path a
 * @param {string} b - path b
 * @returns {string} - the base dir common to both paths
 */
function getCommonBaseDir(a, b) {
    var common = [];
    a = a.split(path.sep);
    b = b.split(path.sep);
    for (var i = 0; i < a.length; i++) {
        if (b[i] === undefined || b[i] !== a[i]) {
            break;
        }
        common.push(a[i]);
    }
    return common.join(path.sep);
}

/**
 * Processes a Declaration containing 'url()'
 *
 * @param {object} decl - PostCSS Declaration
 * @param {object} copyOpts - options passed to this plugin
 * @param {string} copyOpts.base - Base path to copy assets to
 * @param {function} copyOpts.pathTransform - user defined path transform
 * @param {object} opts - options passed to PostCSS
 * @param {object} postCssResult - PostCSS Result
 * @returns {void}
 */
function handleUrlDecl(decl, copyOpts, postCssOpts, postCssResult) {
    // Replace 'url()' parts of Declaration
    decl.value = decl.value.replace(/url\((.*?)\)/g,
        function (fullMatch, urlMatch) {
            // Example:
            //   decl.value = 'background: url("../../images/foo.png?a=123");'
            //   urlMatch         = '"../../images/foo.png?a=123"'
            //   copyOpts.base    = 'dist/assets'
            //   postCssOpts.from = 'src/css/page/home.css'
            //   postCssOpts.to   = 'dist/assets/css/home.min.css'

            // "../../images/foo.png?a=123" -> ../../images/foo.png?a=123
            urlMatch = trimUrlValue(urlMatch);

            // Ignore absolute urls, data URIs, or hashes
            if (urlMatch.indexOf('/') === 0 ||
                urlMatch.indexOf('data:') === 0 ||
                urlMatch.indexOf('#') === 0 ||
                /^[a-z]+:\/\//.test(urlMatch)) {
                return fullMatch;
            }

            // '/path/to/project/src/css/page/'
            var cssFromDirAbs = path.dirname(path.resolve(postCssOpts.from));
            // '/path/to/project/dist/assets/css/page/'
            var cssToDir = path.dirname(postCssOpts.to);
            // parsed.pathname = '../../images/foo.png'
            var assetUrlParsed = url.parse(urlMatch, true);
            var assetUrlParsedPath = decodeURI(assetUrlParsed.pathname);
            // '/path/to/project/src/images/foo.png'
            var assetFromAbs =
                path.resolve(cssFromDirAbs, assetUrlParsedPath);
            // 'foo.png'
            var assetBasename = path.basename(assetUrlParsedPath);
            // '/path/to/project/src/images'
            var assetFromDirAbs = path.dirname(assetFromAbs);
            // '/path/to/project/src'
            var fromBaseDirAbs =
                getCommonBaseDir(assetFromDirAbs, cssFromDirAbs);
            // 'images'
            var assetPathPart = path.relative(fromBaseDirAbs, assetFromDirAbs);
            // '/path/to/project/dist/assets/images'
            var newAssetPath = path.join(copyOpts.base, assetPathPart);
            // '/path/to/project/dist/assets/images/foo.png'
            var newAssetFile = path.join(newAssetPath, assetBasename);

            // Read the original file
            if (!fs.existsSync(assetFromAbs)) {
                postCssResult.warn('Can\'t read asset file "' +
                    assetFromAbs + '". Ignoring.', { node: decl });
            }

            // Call user-defined function
            if (copyOpts.pathTransform) {
                newAssetFile = copyOpts.pathTransform(newAssetFile,
                    assetFromAbs);
                newAssetPath = path.dirname(newAssetFile);
                assetBasename = path.basename(newAssetFile);
            }

            // 'foo.png?a=123'
            var urlBasename = assetBasename +
                (assetUrlParsed.search ? assetUrlParsed.search : '') +
                (assetUrlParsed.hash ? assetUrlParsed.hash : '');
            // '../../images/foo.png?a=123'
            var newUrl = 'url("' +
                path.join(path.relative(cssToDir, newAssetPath), urlBasename) +
                '")';

            // Make url() path separator posix
            if (path.sep === path.win32.sep) {
                newUrl = newUrl.replace(/\\/g, '/');
            }

            // Create any new directories
            try {
                fs.mkdirSync(newAssetPath, { recursive: true });
            } catch (e) {
                postCssResult.warn('Can\'t create new asset dir "' +
                    newAssetPath + '". Ignoring.', { node: decl });
                return newUrl;
            }

            if (!fs.existsSync(newAssetFile))
                try {
                    // Write new asset file into base dir
                    //fsExtra.copySync(assetFromAbs, newAssetFile);
                    fs.copyFileSync(assetFromAbs, newAssetFile);//, fs.constants.COPYFILE_FICLONE_FORC);
                    /*let stats = fs.statSync(assetFromAbs);
                    fs.utimesSync(newAssetFile, stats.atime, stats.mtime);*/
                } catch (e) {
                    console.log(e);
                    postCssResult.warn('Can\'t write new asset file "' +
                        newAssetFile + '". Ignoring.', { node: decl });
                    return newUrl;
                }

            // Return the new url() string
            return newUrl;
        }
    );
}

var postcssCopy =
    postcss.plugin('postcss-copy-assets', function (copyOpts) {
        copyOpts = copyOpts || {};
        return function (css, result) {
            var postCssOpts = result.opts;
            if (!postCssOpts.from) {
                result.warn('postcss-copy-assets requires postcss "from" option.');
                return;
            }
            if (!postCssOpts.to) {
                result.warn('postcss-copy-assets requires postcss "to" option.');
                return;
            }
            if (copyOpts.pathTransform &&
                typeof copyOpts.pathTransform !== 'function') {
                result.warn('postcss-copy-assets "pathTransform" option ' +
                    'must be a function.');
                return;
            }
            if (!copyOpts.base) {
                copyOpts.base = path.dirname(postCssOpts.to);
            }
            copyOpts.base = path.resolve(copyOpts.base);
            css.walkDecls(function (decl) {
                if (decl.value && decl.value.indexOf('url(') > -1) {
                    handleUrlDecl(decl, copyOpts, postCssOpts, result);
                }
            });
        };
    });

function doResolve(source, importer, options, id, dir) {
    if (source.charAt(0) == '.') {
        let realFile = path.resolve(path.dirname(importer), source);
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

/**
 * Extract the relative path from an AST node representing this kind of expression `new URL('./path/to/asset.ext', import.meta.url)`.
 *
 * @param {import('estree').Node} node - The AST node
 * @returns {string} The relative path
 */
function getRelativeAssetPath(node) {
    // either normal string expression or else it would be Template Literal with a single quasi
    const browserPath = node.arguments[0].value ?? node.arguments[0].quasis[0].value.cooked;
    return browserPath.split('/').join(path.sep);
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
                        let absoluteScriptDir = path.dirname(id);
                        let relativeAssetPath = getRelativeAssetPath(node);
                        let absoluteAssetPath = path.resolve(absoluteScriptDir, relativeAssetPath);
                        let test = path.relative(process.cwd(), absoluteAssetPath);

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
            RPresolve({
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
    ...readdirSync(path.resolve('./src/js/workers'), { withFileTypes: true }).filter(f => f.isFile()).map(file => workerInput(path.basename(file.name, '.js'))),
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
            RPresolve({
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
            RPpostcss({
                extract: 'css/ui.css',
                to: 'dist/css/ui.css',
                extensions: ['.css'],
                minimize: !__DEVEL__,
                plugins: [
                    postcssCopy({
                        basePath: process.cwd() + '\\src',
                        base: 'dist',
                        dest: 'dist',
                        template: '[path]/[name].[ext][query]',
                    }),
                ],
            }),
            commonjs(),
            replaces,
            RPresolve({
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
