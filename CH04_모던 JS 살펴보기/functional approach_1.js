const people = [
  {
    age: 20,
    city: '서울',
    pet: ['cat', 'dog'],
  },
  {
    age: 40,
    city: '부산',
  },
  {
    age: 31,
    city: '대구',
    pet: ['cat', 'dog'],
  },
  {
    age: 36,
    city: '서울',
  },
  {
    age: 27,
    city: '부산',
    pet: 'cat',
  },
  {
    age: 24,
    city: '서울',
    pet: 'dog',
  },
];
/**
 * 문제
 *
 * A. 30대 미만이 한 명이라도 사는 모든 도시
 * B. 각 도시별로 개와 고양이를 키우는 사람의 수
 */

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡA문제의 고전적인 풀이
function solveA() {
  const cities = [];
  //                👇 배열 순환 (객체는 in)
  for (const person of people) {
    if (person.age < 30) {
      //          👇 가장 먼저 조건을 만족하는 요소 하나를 반환하는 메소드
      if (!cities.find((city) => person.city === city)) {
        cities.push(person.city);
      }
    }
  }

  return cities;
}
console.log('solveA : ', solveA());

// ㅡㅡㅡㅡㅡㅡA문제의 현대적인? 풀이 (JS유틸리티 적극 사용, 보기 편하고 중첩이 없어서 사고하기가 편하다(mutation))
function solveAModern() {
  //     👇 조건에 맞는 요소들만을 묶어서 배열로 리턴하는 메소드
  const cities2 = people
    .filter(({ age }) => age < 30)
    //      👇👆 object destructuring
    .map(({ city }) => city);
  const set = new Set(cities2); // 👈 cities2 배열을 집합으로 만듬 -> 중복된 원소 제거
  return Array.from(set); // 👈 집합을 다시 배열로 되돌려서 반환
}
console.log('solveAModern : ', solveAModern());

// ㅡㅡㅡㅡㅡㅡㅡㅡ
