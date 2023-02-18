require('./01_Module1');
// 👆 다른 파일을 실행만 하고, 변수를 가져오고 싶지는 않을 때

console.log(require);
// 👆
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

// 👆 main, cache 정도 알아두면 좋다
// main : 실행한 파일(모듈)
// cache : 한 번 require했던 모듈의 exports를 저장해둠, 효율up
