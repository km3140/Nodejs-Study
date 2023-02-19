const url = require('url');

const { URL } = url;

const myURL = new URL('https://www.naver.com/');
console.log('new URL(): ', myURL);
console.log('url.format: ', url.format(myURL));
