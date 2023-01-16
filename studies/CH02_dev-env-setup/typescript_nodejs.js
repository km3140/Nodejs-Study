// @ts-check
const http = require('http')

const server = http.createServer((req, res) => {
  res.statusCode = 'ok'
  // 👆 타입 스크립트가 오류를 잡아줌
  res.end('Hello!')
})

const PORT = 4000
server.listen(PORT, () => {
  console.log(`The server is listening at port: ${PORT}.`)
})

