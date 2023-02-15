
// 다음줄만 eslint의 모든 검사 무시
/* eslint-disable-next-line */
console.log('hello eslint');

// 모든 룰을 꺼버리는 것은 좋은 습관이 아니다
// 검사 해야할 다른 규칙도 무시되기 때문에 아래와 같은 상황이 있을 수 있음
/* eslint-disable-next-line */
console.log(eval());

// 올바른 예시
/* eslint-disable-next-line no-console */
console.log(eval());

// airbnb-base에 포함된 no-var-rule
// var 사용 시 자동으로 const로 바뀜

// eslint-plugin-node
exports = 3;
