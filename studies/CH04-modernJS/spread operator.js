// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡspread로 객체 합치기
const personalData = {
  nickname: 'MG',
  email: 'pangyoelon@gmail.com',
};

const publicData = {
  age: 22,
};

const user = {
  ...personalData,
  ...publicData,
};

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡspread로 덮어쓰기
const overrides = {
  DATABASE_HOST: 'myhost.com',
  DATABASE_PASSWORD: 'mypasswd',
};

const config = {
  DATABASE_HOST: 'default.com',
  DATABASE_PASSWORD: '****',
  DATABASE_USERNAME: 'myuser',
  ...overrides, // overrides 안에 있는 host,password로 config 안에있는 host,password를 덮어씀
};
// config = {
//   DATABASE_HOST: 'myhost.com',
//   DATABASE_PASSWORD: 'mypasswd',
//   DATABASE_USERNAME: 'myuser',
// }

const config2 = {
  // 뒤에 있는 프로퍼티의 value가 앞에있는 value를 덮어씀
  ...overrides,
  DATABASE_HOST: 'default.com',
  DATABASE_PASSWORD: '****',
  DATABASE_USERNAME: 'myuser',
};
// config2 = {
//   DATABASE_HOST: 'default.com',
//   DATABASE_PASSWORD: '****',
//   DATABASE_USERNAME: 'myuser',
// }

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ배열 합치기
const pets = ['dog', 'cat'];
const predators = ['wolf', 'lion'];
const animals = [...pets, ...predators];
console.log(animals); // ['dog', 'cat', 'wolf', 'lion']

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡdestructuring, rest (object)
const user2 = {
  nickname: 'MG',
  age: 22,
  email: 'pangyoelon@gmail.com',
};
//                👇 나머지 프로퍼티들 할당 (rest)
const { nickname, ...personalData2 } = user2;
console.log(nickname); // MG
console.log(personalData2); // {age:22, email: 'pangyoelon@gmail.com'}
// console.log(...personalData2); // error

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡdestructuring, rest (array)
const [one, ...rest] = [1, 2, 3, 4, 5];
console.log(one); // 1
console.log(rest); // [2, 3, 4, 5]
console.log(...rest); // 2, 3, 4, 5

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡspread 활용 : 삼항연산자
const shouldOverride = true;

const user3 = {
  ...{
    email: 'pangyoelon@gmail.com',
    password: 'passwd',
  },
  ...{
    nickname: 'foo',
  },
  ...(shouldOverride // shouldOverride의 불리언 값을 조정함으로써 초기화 시 override여부를 결정할 수 있음
    ? {
        email: 'foo@foo.com',
      }
    : null),
};

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ함수에 spread
function foo(head, ...rest) {
  //                👆 나머지 파라미터들을 rest라는 배열로 모은다
  console.log(head);
  console.log(rest);
}

foo(1, 2, 3, 4, 5);
// 1
// [2,3,4,5]
