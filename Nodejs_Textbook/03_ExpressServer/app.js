const express = require('express');
const path = require('path');

const app = express();

// 일반 변수를 사용하는 것 보다 더 좋은 방법이다?
app.set('port', process.env.PORT || 3000);

// app.use의 콜백함수를 미들웨어라 칭함
// 블록 안의 코드가 모든 요청에 대해 실행됨
app.use(
  (req, res, next) => {
    console.log('1 모든 요청에 실행하고싶어요');
    next(); // solidity modifier의 _;와 같은 역할
  },
  (req, res, next) => {
    console.log('2 모든 요청에 실행하고싶어요');
    next();
  },
  (req, res, next) => {
    console.log('3 모든 요청에 실행하고싶어요');
    next();
  }
);

//           👇 /about/* 경로에 대해 실행
// app.use('/about',(req,res,next) =>{
//   console.log('모든 요청에 실행하고싶어요');
//   next();
// })

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
}); //           👆 운영체제별로 경로 규칙이 다른 문제점을 해결해줌

app.post('/', (req, res) => {
  res.send('hello express');
});

app.get('/category/Javascript', (req, res) => {
  res.send(`hello Javascript`);
});

// 라우트 파라미터(와일드카드) 사용
// 더 포괄적인 개념이 아래에 있어야함
app.get('/category/:name', (req, res) => {
  res.send(`wildcard is ${req.params.name}`);
});

app.get('/about', (req, res) => {
  res.send('hello express here is about');
});

// 더 포괄적인 개념이 아래에 있어야함2
app.get('*', (req, res) => {
  res.send(`this is *`);
});

app.listen(app.get('port'), () => {
  console.log('익스프레스 서버 실행');
});
