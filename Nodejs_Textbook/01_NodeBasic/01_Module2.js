const { odd, even } = require('./01_Module1'); // ๐ var.js์ module.exports ๊ฐ์ฒด๋ฅผ ๊ฐ์ ธ์์ ๊ตฌ์กฐ๋ถํดํ ๋น
//                                      ๐ .js๋ ์๋ต ๊ฐ๋ฅ
// +) import๋ ๋งจ ์์ ์์ด์ผ ํ์ง๋ง require๋ ์ด๋๊ณณ์ ์์ด๋ ์๊ด ์๋ค

function checkOddEven(number) {
  if (number % 2) {
    return odd;
  } else {
    return even;
  }
}

module.exports = checkOddEven;
