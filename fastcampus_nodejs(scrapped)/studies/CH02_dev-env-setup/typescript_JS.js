// @ts-check
// ๐ ์ด ํ์ผ์์ ํ์์ฒดํฌ๋ฅผ ์ฌ์ฉํ๊ฒ ๋ค๋ ๋ป
//    ๊ผญ ๋งจ ์์ ์ ์ด์ค์ผ ์ธ์ ๋จ

const someString = 'error occur';
const result = Math.log(someString) // ๐ string์ log ์ฐ์ฐ์ ํ์, javascript๋ ์ค๋ฅ๋ฅผ ์ผ์ผํค์ง ์๋๋ค
                      // ๐ ํด๋น ๋ถ๋ถ type ์๋ฌ ๋ฐ์, ์ค๋ฅ ๋ฏธ์ฐ์ ๋ฐฉ์ง
console.log(result) // NaN์ด ์ฝ์์ ์ถ๋ ฅ
