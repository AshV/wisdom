import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 5173;
const DIST = path.resolve('dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.wav': 'audio/wav',
  '.woff2': 'font/woff2',
};

http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath.startsWith('/wisdom/')) {
    urlPath = urlPath.slice('/wisdom/'.length);
  } else if (urlPath === '/wisdom') {
    res.writeHead(302, { Location: '/wisdom/' });
    return res.end();
  }
  let filePath = path.join(DIST, urlPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  if (!fs.existsSync(filePath)) {
    filePath = path.join(DIST, 'index.html');
  }
  const ext = path.extname(filePath);
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
}).listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}/wisdom/`);
});
