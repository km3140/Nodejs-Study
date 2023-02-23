const express = require('express');
const path = require('path');
const morgan = require('morgan');
// 👆 요청, 응답에 대한 정보를 기록하는 미들웨어
const cookieParser = require('cookie-parser');
// 👆 쿠키 파싱 미들웨어
const session = require('express-session')
// 👆 요청마다 유저의 저장공간을 만들어준다

const app = express();
// 👆 익스프레스가 코드를 줄여준다
// res.json({ hello : 'zerocho' })
// ===
// res.writeHead(200, { 'Content-Type' : 'application/json' })
// res.end(JSON.stringify({ hello: 'zerocho'}))

app.set('port', process.env.PORT || 3000);
// 👆 일반 변수를 사용하는 것 보다 더 좋은 방법이다?

app.use(morgan('dev'));
//              👆 dev는 간략하게, combined를 넣으면 자세히 나온다

//                   👇 정적파일 줄 때 사용
app.use('/', express.static(__dirname, 'public-3140'));
//       👆 요청경로                  👆 실제경로
// ➕) 모듈들 간의 순서도 중요 : 대부분의 각 모듈들은 내부적으로 next가 동작함, 모듈별 특성에 맞게 상황별로 순서 조정

app.use(cookieParser('pangyoelonpassword'));
//                     👆 해당 키로 쿠키를 암호화 가능

app.use(session{
  resave: false,
  saveUninitialized: false,
  secret: 'pangyoelonpassword',
  cookie: {
    httpOnly: true, // JS를 이용한 공격을 방지
  },
  // name: 'connect.sid'
})

app.use(express.json()); // 👈 클라이언트에서 json을 보냈을 때 파싱해서 req.body로 넣어줌
app.use(express.urlencoded({ extended: true })); // 👈 클라이언트에서 form submit할 때 urlencoded파싱해서 req.body로 넣어줌
//                            👆 true면 qs, false면 querystring(내장)
// 👆 request의 body를 parsing해주는 express 미들웨어들

// app.use의 콜백함수를 미들웨어라 칭함 (요청과 응답의 중간)
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
  // (req,res,next)=>{
  //   try {
  //     // 오류 발생
  //     console.log(undefinedVar);
  //   } catch(err){
  //     next(err)
  //          👆 next안에 에러를 넣으면 바로 에러처리 미들웨어로 넘어감
  //   }
  // }
);

//           👇 /about/* 경로에 대해 실행
// app.use('/about',(req,res,next) =>{
//   console.log('모든 요청에 실행하고싶어요');
//   next();
// })

app.get(
  '/',
  (req, res, next) => {
    req.cookies; // 👈 쿠키가 있으면 이곳에 저장됨 (cookie-parser)
    // req.signedCookies; 👈 서명(암호화)된 쿠키

    // 기존에 문자열으로 처리했던 부분을 메소드로 깔끔하게
    // 👇'Set-Cookie': `name=${encodeURIComponent(name)}; Expires${expires.toGMTString()}; HTTPOnly; Path=/`
    res.cookie('name', encodeURIComponent(name), {
      expires: new Date(),
      httpOnly: true,
      path: '/',
    });

    // 쿠키 지우기
    res.clearCookie('name', encodeURIComponent(name), {
      httpOnly: true,
      path: '/',
    });

    res.sendFile(path.join(__dirname, 'index.html'));
    //            👆 운영체제별로 경로 규칙이 다른 문제점을 해결해줌

    // http는 요청 한 번에 응답 한 번이 원칙
    // 👇 응답하는 메소드를 두 번 이상 사용하면 안됨 (상위의 app.use 포함)
    // res.send('안녕하세요2')
    // res.json({hello: 'zerocho3'})

    // 응답하는 메소드를 사용한 뒤에 헤더설정 메소드를 사용하면 오류남
    // res.setHeader('Content-Type', 'text/html');

    if (true) {
      // 👆 대충 false || true
      next('route');
      //    👆 next 안에 'route'라는 키워드를 넣으면,
      // 같은 라우터의 나머지 미들웨어를 무시하고 해당하는 다른 라우터로 넘어간다
    } else {
      next();
    }
  },
  (req, res) => {
    console.log('실행되나요?');
  }
);

app.get('/', (req, res) => {
  console.log('실행되지롱');
});

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
// app.get('*', (req, res) => {
//   res.send(`this is *`);
// });

// 404처리 미들웨어
app.use((req, res, next) => {
  res.status(404).send('404지롱');
  //         👆 기본값은 200, 404처리를 위한 미들웨어니까 바꿔줌
});

// 에러처리 미들웨어
// 모든 에러는 이곳에서 처리됨
// 익스프레스에서 자동으로 에러처리를 해주긴 하는데 보안을 위해 따로 만들어줌
app.use((err, req, res, next) => {
  console.error(err);
  res.send('에러났지롱. 근데 안알려주지롱');
});

app.listen(app.get('port'), () => {
  console.log('익스프레스 서버 실행');
});
