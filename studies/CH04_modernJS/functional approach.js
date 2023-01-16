// @ts-check
/* eslint-disable no-restricted-syntax */
// 👆 설정한 javascript 일부 기능 제한?

/**
 * // 👇 솔리디티의 구조체와 비슷한 것 선언?
 * @typedef Person
 * 
 * @property {number} age
 * // 👆 key=age, value에는 숫자가 들어가는 프로퍼티 추가?
 * @property {string} city
 * //                           👇 대괄호 : 해당 프로퍼티는 있을 수도 있고 없을 수도 있다?
 * @property {string | string[]} [pet]
 * //                👆 value에 string 또는 string의 배열이 들어갈 수 있다
 */


/** @type {Person[]} */
//         👆 person을 담는 배열 선언
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
  /** @type {string[]} */
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


// ㅡㅡㅡㅡㅡㅡㅡㅡB문제 고전 풀이
/** @typedef {Object.<string, Object.<string,number>>}  PetsOfCities */
// 👆 객체 타입 설정?, Object.<(key타입), (value타입)> (타입이름)
function solveB(){
  /** @type {PetsOfCities} */
  //        👆 PetOfCities들을 담는 객체
  const result = {}

  for (const person of people) {
    const {city, pet:petOrPets} = person
    //              👆 구조분해할당 시 콜론으로 이름을 바꿔서 저장 가능

    if(petOrPets){ // 👈 petOrPets가 존재할 때
      const petsOfCity = result[city] || {}
      //                              👆 result[city]가 falsy면 {}가 들어감
      if(typeof petOrPets === 'string'){ // 👈 petOrPets의 타입이 string일 때
        const pet = petOrPets
        const origNumPetsOfCity = petsOfCity[pet] || 0
        petsOfCity[pet] = origNumPetsOfCity + 1
      }else{ // 👈 나머지 경우의 수 (배열일 때)
        for (const pet of petOrPets){
          const origNumPetsOfCity = petsOfCity[pet] || 0
          petsOfCity[pet] = origNumPetsOfCity + 1
        }
      }
      result[city] = petsOfCity
      //    👆 변수값(=key)으로 객체 value에 접근
    }
  }
  return result
}


// ㅡㅡㅡㅡㅡㅡㅡㅡB문제 현대 풀이 (내 풀이)
// +) 할당할 때가 아니면 eslint에서는 삼항연산자 사용을 비추함?
function solveBModern() {
  /** @type {PetsOfCities} */
  const result = people.reduce((acc,{city, pet})=>{
    if(pet){

      // city 프로퍼티에 객체 타입 정의해주기
      //  👇 string literal 때문에 나는 오류인가?
      acc[city] = acc[city] ?? {} 
      //                            👆 좌항이 falsy면 우항 값으로 치환

      // 도시별로 동물 수 정리하기
      if(typeof pet === 'string'){
        acc[city][pet] = acc[city][pet] ? acc[city][pet] += 1 : 1
        
      }else if(typeof pet === 'object'){
        //                     👆 array를 typeof하면 object가 나온다
        pet.forEach(pet=>{
          acc[city][pet] = acc[city][pet] ? acc[city][pet] += 1 : 1
        })
      }
    }
    return acc;
  },{})
  return result
}


// ㅡㅡㅡㅡㅡㅡㅡㅡB문제 현대 풀이 (강사님 풀이)
// 메서드체이닝으로 범위를 좁혀나감
function solveBModern() {
  return people.map(({ pet: petOrPets, city })=>{
    const pets = (typeof petOrPets === 'string' ? [petOrPets] : petOrPets) || []
    return{ city, pets }
  })
  .flatMap(({ city, pets }) => pets.map(pet => [city, pet]))
  .reduce((/** @type {PetsOfCities} */ acc, [city, pet]) => {
    return{
      ...acc,
      [city]: {
        ...acc[city],
        [pet]: (acc[city]?.[pet] || 0) + 1,
        //               👆 optional chaining : 좌항이 undefined이면 undefined를 리턴, 오류 방지
      },
    }
    
  },{})
}


console.log('solveA : ', solveA());
console.log('solveAModern : ', solveAModern());

console.log('solveB : ', solveB());
console.log('mySolveBModern : ', solveBModern())
console.log('solveBModern : ', solveBModern())


// flat의 사용
/**
 * //ㅡㅡㅡ중첩배열평탄화ㅡㅡㅡ
 * const arr1 = [1, 2, [3, 4]];
 * arr1.flat(); 👈 [1, 2, 3, 4]
 * 
 * const arr2 = [1, 2, [3, 4, [5, 6]]];
 * arr2.flat(); 👈 [1, 2, 3, 4, [5, 6]]
 * 
 * const arr3 = [1, 2, [3, 4, [5, 6]]];
 * arr3.flat(2); 👈 [1, 2, 3, 4, 5, 6]
 * 
 * const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
 * arr4.flat(Infinity); 👈 [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * 
 * //ㅡㅡㅡ배열구멍제거ㅡㅡㅡ
 * const arr5 = [1, 2, , 4, 5];
 * arr5.flat(); 👈 [1, 2, 4, 5]
 */

// flatmap = map 실행 후 .flat(1)를 체이닝 한 것과 같은 효과