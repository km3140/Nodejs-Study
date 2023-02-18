const { odd, even } = require('./01_Module1'); // 👈 var.js의 module.exports 객체를 가져와서 구조분해할당
//                                      👆 .js는 생략 가능
// +) import는 맨 위에 있어야 하지만 require는 어느곳에 있어도 상관 없다

function checkOddEven(number) {
  if (number % 2) {
    return odd;
  } else {
    return even;
  }
}

module.exports = checkOddEven;
