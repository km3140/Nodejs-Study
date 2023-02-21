const http = require('http');

const server = http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); // html이고 한글로 디코딩 해라
    res.write('<h1>Hello Node!<h1>');
    res.write('<p>Hello Server</p>');
    res.end('<p>Hello Nodejs</p>');
  })
  .listen(8080);

server.on('listening', () => {
  console.log('8080번 포트에서 서버 대기 중입니다.');
});

server.on('error', error => {
  // 에러 처리!
  console.error(error);
});

// localhost:8080 또는 127.0.0.1:8080 하면 res객체에 적었던 html코드가 파싱되어 보여진다
