const odd = '홀수입니다';
const even = '짝수입니다';

module.exports = {
  odd, // == odd : odd
  even, // == even : even
};
// 👆 module.exports라는 객체에 변수를 넣어서 다른 파일로 넘겨줄 수 있음
//    파일에서 단 한번만 써야한다
// +) 배열로 넘겨줄 수도 있다, 근데 보통은 객체로 함

// +) module.exports === exports === {}
// 즉,
// module.exports = {
//   odd,
//   even,
// };
// ===
// exports.odd = odd;
// exports.even = even;

// 주의) module.exports와 exports를 혼용하면 안된다
