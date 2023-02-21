const http = require('http');
const fs = require('fs').promises;

const server = http
  .createServer(async (req, res) => {
    try {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); // html이고 한글로 디코딩 해라
      const data = await fs.readFile('./01_server2.html');
      res.end(data);
    } catch (err) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.message);
    }
  })
  .listen(8080);

server.on('listening', () => {
  console.log('8080번 포트에서 서버 대기 중입니다.');
});

server.on('error', error => {
  console.error(error);
});
