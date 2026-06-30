const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = process.argv[3] || 3000;
const host = 'localhost';

// MIME types для разных файлов
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    // Парсим URL
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    // Если корневой путь - отдаем index.html
    if (pathname === '/') {
        pathname = '/index.html';
    }
    
    // Полный путь к файлу
    const filePath = path.join(__dirname, 'dist', pathname);
    const ext = path.extname(filePath).toLowerCase();
    
    // Читаем файл
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Файл не найден - пробуем отдать index.html (для SPA)
                //serveIndexHtml(res);
                serveError(res, 404, 'Not found');
            } else {
                // Другая ошибка
                serveError(res, 500, 'Server Error');
            }
        } else {
            // Файл найден - отдаем его
            serveFile(res, filePath, data);
        }
    });
});

function serveFile(res, filePath, data) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeType = mimeTypes[ext] || 'application/octet-stream';
    
    res.writeHead(200, {
        'Content-Type': mimeType,
        'Cache-Control': 'no-cache'
    });
    res.end(data);
}

function serveIndexHtml(res) {
    const indexPath = path.join(__dirname, 'dist', 'index.html');
    fs.readFile(indexPath, (err, data) => {
        if (err) {
            serveError(res, 404, 'File not found');
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html',
                'Cache-Control': 'no-cache'
            });
            res.end(data);
        }
    });
}

function serveError(res, statusCode, message) {
    res.writeHead(statusCode, {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache'
    });
    
    const errorPage = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Error ${statusCode}</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                h1 { color: #d32f2f; }
            </style>
        </head>
        <body>
            <h1>Error ${statusCode}</h1>
            <p>${message}</p>
            <a href="/">Go to homepage</a>
        </body>
        </html>
    `;
    
    res.end(errorPage);
}

server.listen(port, host, () => {
    console.log(`🚀 HTTP Server running at http://${host}:${port}`);
    console.log(`📁 Serving static files from: ${path.join(__dirname, 'dist')}`);
    console.log(`💡 Usage: node server.js [port] (default: ${port})`);
});