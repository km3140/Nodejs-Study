// @ts-check
const http = require('http')

const server = http.createServer((req, res) => {
  res.statusCode = 'ok'
  // π νμ μ€ν¬λ¦½νΈκ° μ€λ₯λ₯Ό μ‘μμ€
  res.end('Hello!')
})

const PORT = 4000
server.listen(PORT, () => {
  console.log(`The server is listening at port: ${PORT}.`)
})

