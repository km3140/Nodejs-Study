require('./05_circularReference2');

module.exports = {
  dummy: data,
};

// 05_circularReference1 <=> 05_circularReference2
// 이렇게 순환참조가 일어나면 노드에서 자동으로 exports를 빈 객체로 바꿔버림
