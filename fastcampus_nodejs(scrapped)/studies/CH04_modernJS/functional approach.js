// @ts-check
/* eslint-disable no-restricted-syntax */
// π μ€μ ν javascript μΌλΆ κΈ°λ₯ μ ν?

/**
 * // π μλ¦¬λν°μ κ΅¬μ‘°μ²΄μ λΉμ·ν κ² μ μΈ?
 * @typedef Person
 * 
 * @property {number} age
 * // π key=age, valueμλ μ«μκ° λ€μ΄κ°λ νλ‘νΌν° μΆκ°?
 * @property {string} city
 * //                           π λκ΄νΈ : ν΄λΉ νλ‘νΌν°λ μμ μλ μκ³  μμ μλ μλ€?
 * @property {string | string[]} [pet]
 * //                π valueμ string λλ stringμ λ°°μ΄μ΄ λ€μ΄κ° μ μλ€
 */


/** @type {Person[]} */
//         π personμ λ΄λ λ°°μ΄ μ μΈ
const people = [
  {
    age: 20,
    city: 'μμΈ',
    pet: ['cat', 'dog'],
  },
  {
    age: 40,
    city: 'λΆμ°',
  },
  {
    age: 31,
    city: 'λκ΅¬',
    pet: ['cat', 'dog'],
  },
  {
    age: 36,
    city: 'μμΈ',
  },
  {
    age: 27,
    city: 'λΆμ°',
    pet: 'cat',
  },
  {
    age: 24,
    city: 'μμΈ',
    pet: 'dog',
  },
];

/**
 * λ¬Έμ 
 *
 * A. 30λ λ―Έλ§μ΄ ν λͺμ΄λΌλ μ¬λ λͺ¨λ  λμ
 * B. κ° λμλ³λ‘ κ°μ κ³ μμ΄λ₯Ό ν€μ°λ μ¬λμ μ
 */

// γ‘γ‘γ‘γ‘γ‘γ‘γ‘γ‘γ‘γ‘Aλ¬Έμ μ κ³ μ μ μΈ νμ΄

function solveA() {
  /** @type {string[]} */
  const cities = [];
  //                π λ°°μ΄ μν (κ°μ²΄λ in)
  for (const person of people) {
    if (person.age < 30) {
      //          π κ°μ₯ λ¨Όμ  μ‘°κ±΄μ λ§μ‘±νλ μμ νλλ₯Ό λ°ννλ λ©μλ
      if (!cities.find((city) => person.city === city)) {
        cities.push(person.city);
      }
    }
  }

  return cities;
}


// γ‘γ‘γ‘γ‘γ‘γ‘Aλ¬Έμ μ νλμ μΈ? νμ΄ (JSμ νΈλ¦¬ν° μ κ·Ή μ¬μ©, λ³΄κΈ° νΈνκ³  μ€μ²©μ΄ μμ΄μ μ¬κ³ νκΈ°κ° νΈνλ€(mutation))
function solveAModern() {
  //     π μ‘°κ±΄μ λ§λ μμλ€λ§μ λ¬Άμ΄μ λ°°μ΄λ‘ λ¦¬ν΄νλ λ©μλ
  const cities2 = people
  .filter(({ age }) => age < 30)
  //      ππ object destructuring
  .map(({ city }) => city);
  const set = new Set(cities2); // π cities2 λ°°μ΄μ μ§ν©μΌλ‘ λ§λ¬ -> μ€λ³΅λ μμ μ κ±°
  return Array.from(set); // π μ§ν©μ λ€μ λ°°μ΄λ‘ λλλ €μ λ°ν
}


// γ‘γ‘γ‘γ‘γ‘γ‘γ‘γ‘Bλ¬Έμ  κ³ μ  νμ΄
/** @typedef {Object.<string, Object.<string,number>>}  PetsOfCities */
// π κ°μ²΄ νμ μ€μ ?, Object.<(keyνμ), (valueνμ)> (νμμ΄λ¦)
function solveB(){
  /** @type {PetsOfCities} */
  //        π PetOfCitiesλ€μ λ΄λ κ°μ²΄
  const result = {}

  for (const person of people) {
    const {city, pet:petOrPets} = person
    //              π κ΅¬μ‘°λΆν΄ν λΉ μ μ½λ‘ μΌλ‘ μ΄λ¦μ λ°κΏμ μ μ₯ κ°λ₯

    if(petOrPets){ // π petOrPetsκ° μ‘΄μ¬ν  λ
      const petsOfCity = result[city] || {}
      //                              π result[city]κ° falsyλ©΄ {}κ° λ€μ΄κ°
      if(typeof petOrPets === 'string'){ // π petOrPetsμ νμμ΄ stringμΌ λ
        const pet = petOrPets
        const origNumPetsOfCity = petsOfCity[pet] || 0
        petsOfCity[pet] = origNumPetsOfCity + 1
      }else{ // π λλ¨Έμ§ κ²½μ°μ μ (λ°°μ΄μΌ λ)
        for (const pet of petOrPets){
          const origNumPetsOfCity = petsOfCity[pet] || 0
          petsOfCity[pet] = origNumPetsOfCity + 1
        }
      }
      result[city] = petsOfCity
      //    π λ³μκ°(=key)μΌλ‘ κ°μ²΄ valueμ μ κ·Ό
    }
  }
  return result
}


// γ‘γ‘γ‘γ‘γ‘γ‘γ‘γ‘Bλ¬Έμ  νλ νμ΄ (λ΄ νμ΄)
// +) ν λΉν  λκ° μλλ©΄ eslintμμλ μΌν­μ°μ°μ μ¬μ©μ λΉμΆν¨?
function solveBModern() {
  /** @type {PetsOfCities} */
  const result = people.reduce((acc,{city, pet})=>{
    if(pet){

      // city νλ‘νΌν°μ κ°μ²΄ νμ μ μν΄μ£ΌκΈ°
      //  π string literal λλ¬Έμ λλ μ€λ₯μΈκ°?
      acc[city] = acc[city] ?? {} 
      //                            π μ’ν­μ΄ falsyλ©΄ μ°ν­ κ°μΌλ‘ μΉν

      // λμλ³λ‘ λλ¬Ό μ μ λ¦¬νκΈ°
      if(typeof pet === 'string'){
        acc[city][pet] = acc[city][pet] ? acc[city][pet] += 1 : 1
        
      }else if(typeof pet === 'object'){
        //                     π arrayλ₯Ό typeofνλ©΄ objectκ° λμ¨λ€
        pet.forEach(pet=>{
          acc[city][pet] = acc[city][pet] ? acc[city][pet] += 1 : 1
        })
      }
    }
    return acc;
  },{})
  return result
}


// γ‘γ‘γ‘γ‘γ‘γ‘γ‘γ‘Bλ¬Έμ  νλ νμ΄ (κ°μ¬λ νμ΄)
// λ©μλμ²΄μ΄λμΌλ‘ λ²μλ₯Ό μ’νλκ°
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
        //               π optional chaining : μ’ν­μ΄ undefinedμ΄λ©΄ undefinedλ₯Ό λ¦¬ν΄, μ€λ₯ λ°©μ§
      },
    }
    
  },{})
}


console.log('solveA : ', solveA());
console.log('solveAModern : ', solveAModern());

console.log('solveB : ', solveB());
console.log('mySolveBModern : ', solveBModern())
console.log('solveBModern : ', solveBModern())


// flatμ μ¬μ©
/**
 * //γ‘γ‘γ‘μ€μ²©λ°°μ΄νννγ‘γ‘γ‘
 * const arr1 = [1, 2, [3, 4]];
 * arr1.flat(); π [1, 2, 3, 4]
 * 
 * const arr2 = [1, 2, [3, 4, [5, 6]]];
 * arr2.flat(); π [1, 2, 3, 4, [5, 6]]
 * 
 * const arr3 = [1, 2, [3, 4, [5, 6]]];
 * arr3.flat(2); π [1, 2, 3, 4, 5, 6]
 * 
 * const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
 * arr4.flat(Infinity); π [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * 
 * //γ‘γ‘γ‘λ°°μ΄κ΅¬λ©μ κ±°γ‘γ‘γ‘
 * const arr5 = [1, 2, , 4, 5];
 * arr5.flat(); π [1, 2, 4, 5]
 */

// flatmap = map μ€ν ν .flat(1)λ₯Ό μ²΄μ΄λ ν κ²κ³Ό κ°μ ν¨κ³Ό