console.log(this);
// π λΈλΌμ°μ μμλ window, λΈλμμλ {}?

console.log(this === module.exports); // π true !
// π μ μ­μ€μ½νμ thisλ exports!
//    module.exports === exports === {}

function a() {
  console.log(this === global);
}
a(); // π true

const b = () => console.log(this === exports);
b(); // π true
