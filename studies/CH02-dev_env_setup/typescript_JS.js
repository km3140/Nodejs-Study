// @ts-check
// 👆 이 파일에서 타입체크를 사용하겠다는 뜻
//    꼭 맨 위에 적어줘야 인식 됨

const someString = 'error occur';
const result = Math.log(someString) // 👈 string에 log 연산을 했음, javascript는 오류를 일으키지 않는다
                      // 👆 해당 부분 type 에러 발생, 오류 미연에 방지
console.log(result) // NaN이 콘솔에 출력
