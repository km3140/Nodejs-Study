const express = require('express');
const path = require('path');
const morgan = require('morgan');
// ๐ ์์ฒญ, ์๋ต์ ๋ํ ์ ๋ณด๋ฅผ ๊ธฐ๋กํ๋ ๋ฏธ๋ค์จ์ด
const cookieParser = require('cookie-parser');
// ๐ ์ฟ ํค ํ์ฑ ๋ฏธ๋ค์จ์ด
const session = require('express-session')
// ๐ ์์ฒญ๋ง๋ค ์ ์ ์ ์ ์ฅ๊ณต๊ฐ์ ๋ง๋ค์ด์ค๋ค

const app = express();
// ๐ ์ต์คํ๋ ์ค๊ฐ ์ฝ๋๋ฅผ ์ค์ฌ์ค๋ค
// res.json({ hello : 'zerocho' })
// ===
// res.writeHead(200, { 'Content-Type' : 'application/json' })
// res.end(JSON.stringify({ hello: 'zerocho'}))

app.set('port', process.env.PORT || 3000);
// ๐ ์ผ๋ฐ ๋ณ์๋ฅผ ์ฌ์ฉํ๋ ๊ฒ ๋ณด๋ค ๋ ์ข์ ๋ฐฉ๋ฒ์ด๋ค?

app.use(morgan('dev'));
//              ๐ dev๋ ๊ฐ๋ตํ๊ฒ, combined๋ฅผ ๋ฃ์ผ๋ฉด ์์ธํ ๋์จ๋ค

//                   ๐ ์ ์ ํ์ผ ์ค ๋ ์ฌ์ฉ
app.use('/', express.static(__dirname, 'public-3140'));
//       ๐ ์์ฒญ๊ฒฝ๋ก                  ๐ ์ค์ ๊ฒฝ๋ก
// โ) ๋ชจ๋๋ค ๊ฐ์ ์์๋ ์ค์ : ๋๋ถ๋ถ์ ๊ฐ ๋ชจ๋๋ค์ ๋ด๋ถ์ ์ผ๋ก next๊ฐ ๋์ํจ, ๋ชจ๋๋ณ ํน์ฑ์ ๋ง๊ฒ ์ํฉ๋ณ๋ก ์์ ์กฐ์ 

app.use(cookieParser('pangyoelonpassword'));
//                     ๐ ํด๋น ํค๋ก ์ฟ ํค๋ฅผ ์ํธํ ๊ฐ๋ฅ

app.use(session{
  resave: false,
  saveUninitialized: false,
  secret: 'pangyoelonpassword',
  cookie: {
    httpOnly: true, // JS๋ฅผ ์ด์ฉํ ๊ณต๊ฒฉ์ ๋ฐฉ์ง
  },
  // name: 'connect.sid'
})

app.use(express.json()); // ๐ ํด๋ผ์ด์ธํธ์์ json์ ๋ณด๋์ ๋ ํ์ฑํด์ req.body๋ก ๋ฃ์ด์ค
app.use(express.urlencoded({ extended: true })); // ๐ ํด๋ผ์ด์ธํธ์์ form submitํ  ๋ urlencodedํ์ฑํด์ req.body๋ก ๋ฃ์ด์ค
//                            ๐ true๋ฉด qs, false๋ฉด querystring(๋ด์ฅ)
// ๐ request์ body๋ฅผ parsingํด์ฃผ๋ express ๋ฏธ๋ค์จ์ด๋ค

// app.use์ ์ฝ๋ฐฑํจ์๋ฅผ ๋ฏธ๋ค์จ์ด๋ผ ์นญํจ (์์ฒญ๊ณผ ์๋ต์ ์ค๊ฐ)
// ๋ธ๋ก ์์ ์ฝ๋๊ฐ ๋ชจ๋  ์์ฒญ์ ๋ํด ์คํ๋จ
app.use(
  (req, res, next) => {
    console.log('1 ๋ชจ๋  ์์ฒญ์ ์คํํ๊ณ ์ถ์ด์');
    next(); // solidity modifier์ _;์ ๊ฐ์ ์ญํ 
  },
  (req, res, next) => {
    console.log('2 ๋ชจ๋  ์์ฒญ์ ์คํํ๊ณ ์ถ์ด์');
    next();
  },
  (req, res, next) => {
    console.log('3 ๋ชจ๋  ์์ฒญ์ ์คํํ๊ณ ์ถ์ด์');
    next();
  }
  // (req,res,next)=>{
  //   try {
  //     // ์ค๋ฅ ๋ฐ์
  //     console.log(undefinedVar);
  //   } catch(err){
  //     next(err)
  //          ๐ next์์ ์๋ฌ๋ฅผ ๋ฃ์ผ๋ฉด ๋ฐ๋ก ์๋ฌ์ฒ๋ฆฌ ๋ฏธ๋ค์จ์ด๋ก ๋์ด๊ฐ
  //   }
  // }
);

//           ๐ /about/* ๊ฒฝ๋ก์ ๋ํด ์คํ
// app.use('/about',(req,res,next) =>{
//   console.log('๋ชจ๋  ์์ฒญ์ ์คํํ๊ณ ์ถ์ด์');
//   next();
// })

app.get(
  '/',
  (req, res, next) => {
    req.cookies; // ๐ ์ฟ ํค๊ฐ ์์ผ๋ฉด ์ด๊ณณ์ ์ ์ฅ๋จ (cookie-parser)
    // req.signedCookies; ๐ ์๋ช(์ํธํ)๋ ์ฟ ํค

    // ๊ธฐ์กด์ ๋ฌธ์์ด์ผ๋ก ์ฒ๋ฆฌํ๋ ๋ถ๋ถ์ ๋ฉ์๋๋ก ๊น๋ํ๊ฒ
    // ๐'Set-Cookie': `name=${encodeURIComponent(name)}; Expires${expires.toGMTString()}; HTTPOnly; Path=/`
    res.cookie('name', encodeURIComponent(name), {
      expires: new Date(),
      httpOnly: true,
      path: '/',
    });

    // ์ฟ ํค ์ง์ฐ๊ธฐ
    res.clearCookie('name', encodeURIComponent(name), {
      httpOnly: true,
      path: '/',
    });

    res.sendFile(path.join(__dirname, 'index.html'));
    //            ๐ ์ด์์ฒด์ ๋ณ๋ก ๊ฒฝ๋ก ๊ท์น์ด ๋ค๋ฅธ ๋ฌธ์ ์ ์ ํด๊ฒฐํด์ค

    // http๋ ์์ฒญ ํ ๋ฒ์ ์๋ต ํ ๋ฒ์ด ์์น
    // ๐ ์๋ตํ๋ ๋ฉ์๋๋ฅผ ๋ ๋ฒ ์ด์ ์ฌ์ฉํ๋ฉด ์๋จ (์์์ app.use ํฌํจ)
    // res.send('์๋ํ์ธ์2')
    // res.json({hello: 'zerocho3'})

    // ์๋ตํ๋ ๋ฉ์๋๋ฅผ ์ฌ์ฉํ ๋ค์ ํค๋์ค์  ๋ฉ์๋๋ฅผ ์ฌ์ฉํ๋ฉด ์ค๋ฅ๋จ
    // res.setHeader('Content-Type', 'text/html');

    if (true) {
      // ๐ ๋์ถฉ false || true
      next('route');
      //    ๐ next ์์ 'route'๋ผ๋ ํค์๋๋ฅผ ๋ฃ์ผ๋ฉด,
      // ๊ฐ์ ๋ผ์ฐํฐ์ ๋๋จธ์ง ๋ฏธ๋ค์จ์ด๋ฅผ ๋ฌด์ํ๊ณ  ํด๋นํ๋ ๋ค๋ฅธ ๋ผ์ฐํฐ๋ก ๋์ด๊ฐ๋ค
    } else {
      next();
    }
  },
  (req, res) => {
    console.log('์คํ๋๋์?');
  }
);

app.get('/', (req, res) => {
  console.log('์คํ๋์ง๋กฑ');
});

app.post('/', (req, res) => {
  res.send('hello express');
});

app.get('/category/Javascript', (req, res) => {
  res.send(`hello Javascript`);
});

// ๋ผ์ฐํธ ํ๋ผ๋ฏธํฐ(์์ผ๋์นด๋) ์ฌ์ฉ
// ๋ ํฌ๊ด์ ์ธ ๊ฐ๋์ด ์๋์ ์์ด์ผํจ
app.get('/category/:name', (req, res) => {
  res.send(`wildcard is ${req.params.name}`);
});

app.get('/about', (req, res) => {
  res.send('hello express here is about');
});

// ๋ ํฌ๊ด์ ์ธ ๊ฐ๋์ด ์๋์ ์์ด์ผํจ2
// app.get('*', (req, res) => {
//   res.send(`this is *`);
// });

// 404์ฒ๋ฆฌ ๋ฏธ๋ค์จ์ด
app.use((req, res, next) => {
  res.status(404).send('404์ง๋กฑ');
  //         ๐ ๊ธฐ๋ณธ๊ฐ์ 200, 404์ฒ๋ฆฌ๋ฅผ ์ํ ๋ฏธ๋ค์จ์ด๋๊น ๋ฐ๊ฟ์ค
});

// ์๋ฌ์ฒ๋ฆฌ ๋ฏธ๋ค์จ์ด
// ๋ชจ๋  ์๋ฌ๋ ์ด๊ณณ์์ ์ฒ๋ฆฌ๋จ
// ์ต์คํ๋ ์ค์์ ์๋์ผ๋ก ์๋ฌ์ฒ๋ฆฌ๋ฅผ ํด์ฃผ๊ธด ํ๋๋ฐ ๋ณด์์ ์ํด ๋ฐ๋ก ๋ง๋ค์ด์ค
app.use((err, req, res, next) => {
  console.error(err);
  res.send('์๋ฌ๋ฌ์ง๋กฑ. ๊ทผ๋ฐ ์์๋ ค์ฃผ์ง๋กฑ');
});

app.listen(app.get('port'), () => {
  console.log('์ต์คํ๋ ์ค ์๋ฒ ์คํ');
});
