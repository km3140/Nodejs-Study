console.log(this);
// 👆 브라우저에서는 window, 노드에서는 {}?

console.log(this === module.exports); // 👈 true !
// 👆 전역스코프의 this는 exports!
//    module.exports === exports === {}

function a() {
  console.log(this === global);
}
a(); // 👈 true

const b = () => console.log(this === exports);
b(); // 👈 true
