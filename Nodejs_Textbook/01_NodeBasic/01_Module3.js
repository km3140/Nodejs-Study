const { odd, even } = require('./01_Module1');
const checkNumber = require('./01_Module2');

function checkStringOddEven(str) {
  if (str.length % 2) {
    return odd;
  } else {
    return even;
  }
}

console.log(checkNumber(10)); // => 짝수입니다
console.log(checkStringOddEven('hello')); // => 홀수입니다
