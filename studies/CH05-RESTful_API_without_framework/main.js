// @ts-check

// 프레임워크 없이 간단한 웹 서버 만들어보기
// 프레임워크는 저변의 여러 과정들을 생략하고 있기 때문에 동작을 자세히 살펴보기 위해서 프레임워크 없이 먼저 해봄

// 로컬 파일을 DB로 사용 (JSON)
// 인증 로직 없음
// RESTful API 사용

const http = require('http');

// JSdoc : JS애플리케이션을 문서화하는 마크업언어
// 임시로 메모리를 DB처럼 사용
/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

/** @type {Post[]} */
const posts = [
  {
    id: 'first',
    title: 'My first post',
    content: 'Hello!',
  },
  {
    id: 'second',
    title: 'My second post',
    content: 'Hello!!',
  },
];
console.log(posts);

const server = http.createServer((req, res) => {
  //                              👇 () : 캡쳐그룹
  const POST_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/;
  //                    👆regExp  👆 a-z,A-Z,0-9,하이픈,언더바로 이루어진 여러 텍스트들
  // ^: 시작, $: 끝, \: 이스케이프, + : []로 이루어진 텍스트'들'

  const postIdRegexResult =
    (req.url && POST_ID_REGEX.exec(req.url)) || undefined;
  //                          👆 RegExpExecArray를 리턴, .test는 boolean 리턴

  if (req.url === '/posts' && req.method === 'GET') {
    res.statusCode = 200;
    res.end('List of post');
  } else if (postIdRegexResult) {
    //       👆 GET /posts/:id

    const postId = postIdRegexResult[1];
    // 👆 RegExpExecArray[1] = 캡쳐그룹
    console.log(`postID : ${postId}`);

    res.statusCode = 200;
    res.end('Some content of the post');
  } else if (req.url === '/posts' && req.method === 'POST') {
    res.statusCode = 200;
    res.end('Creating post');
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`The server is listening at port ${PORT}`);
});
