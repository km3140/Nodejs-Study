require('./01_Module1');
// ๐ ๋ค๋ฅธ ํ์ผ์ ์คํ๋ง ํ๊ณ , ๋ณ์๋ฅผ ๊ฐ์ ธ์ค๊ณ  ์ถ์ง๋ ์์ ๋

console.log(require);
// ๐
// [Function: require] {
//   resolve: [Function: resolve] { paths: [Function: paths] },
//   main: Module {
//     id: '.',
//     path: 'C:\\WEB\\Nodejs-Study\\Nodejs_Textbook\\01_NodeBasic',
//     exports: {},
//     filename: 'C:\\WEB\\Nodejs-Study\\Nodejs_Textbook\\01_NodeBasic\\03_require.js',
//     loaded: false,
//     children: [ [Module] ],
//     paths: [
//       'C:\\WEB\\Nodejs-Study\\Nodejs_Textbook\\01_NodeBasic\\node_modules',
//       'C:\\WEB\\Nodejs-Study\\Nodejs_Textbook\\node_modules',
//       'C:\\WEB\\Nodejs-Study\\node_modules',
//       'C:\\WEB\\node_modules',
//       'C:\\node_modules'
//     ]
//   },
//   extensions: [Object: null prototype] {
//     '.js': [Function (anonymous)],
//     '.json': [Function (anonymous)],
//     '.node': [Function (anonymous)]
//   },
//   cache: [Object: null prototype] {
//     'C:\\WEB\\Nodejs-Study\\Nodejs_Textbook\\01_NodeBasic\\03_require.js': Module {
//       id: '.',
//       path: 'C:\\WEB\\Nodejs-Study\\Nodejs_Textbook\\01_NodeBasic',
//       exports: {},
//       filename: 'C:\\WEB\\Nodejs-Study\\Nodejs_Textbook\\01_NodeBasic\\03_require.js',
//       loaded: false,
//       children: [Array],
//       paths: [Array]
//     },
//     'C:\\WEB\\Nodejs-Study\\Nodejs_Textbook\\01_NodeBasic\\01_Module-1.js': Module {
//       id: 'C:\\WEB\\Nodejs-Study\\Nodejs_Textbook\\01_NodeBasic\\01_Module-1.js',
//       path: 'C:\\WEB\\Nodejs-Study\\Nodejs_Textbook\\01_NodeBasic',
//       exports: [Object],
//       filename: 'C:\\WEB\\Nodejs-Study\\Nodejs_Textbook\\01_NodeBasic\\01_Module-1.js',
//       loaded: true,
//       children: [],
//       paths: [Array]
//     }
//   }
// }

// ๐ main, cache ์ ๋ ์์๋๋ฉด ์ข๋ค
// main : ์คํํ ํ์ผ(๋ชจ๋)
// cache : ํ ๋ฒ requireํ๋ ๋ชจ๋์ exports๋ฅผ ์ ์ฅํด๋ , ํจ์จup
