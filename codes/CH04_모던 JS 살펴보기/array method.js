const obj = [
  {
    name: 'kim',
    job: 'dealer',
  },
  {
    name: 'park',
    job: 'tanker',
  },
  {
    name: 'lee',
    job: 'healer',
  },
];

const result = obj.map((item) => item.name);
console.log(result); // [kim, park, lee]

const result2 = obj.map((item) => {
  item.name; // 중괄호 사용 시 리턴을 사용해야한다
});
console.log(result2); // [ undefined, undefined, undefined ]

const result3 = obj.map((item) => {
  return item.name;
});
console.log(result3); // [kim, park, lee]
