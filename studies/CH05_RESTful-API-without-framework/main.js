// @ts-check

// 프레임워크 없이 간단한 웹 서버 만들어보기
// 프레임워크는 저변의 여러 과정들을 생략하고 있기 때문에 동작을 자세히 살펴보기 위해서 프레임워크 없이 먼저 해봄

// 로컬 파일을 DB로 사용 (JSON)
// 인증 로직 없음
// RESTful API 사용
// TEST로 httpie 사용

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
    title: '나의 두번째 포스트', // 👈 utf-8 인코딩 정의를 해줘야함
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
    const result = {
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
      })),
      totalCount: posts.length,
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8'); // 👈 content가 json형태로 내려간다는 것, 인코딩 형식이 utf-8인 것을 알려줌
    res.end(JSON.stringify(result)); // 👈 json을 stringify 해줘야 body에 들어갈 수 있다
  } else if (postIdRegexResult && req.method === 'GET') {
    //       👆 GET /posts/:id
    const postId = postIdRegexResult[1];
    //              👆 RegExpExecArray[1] = 캡쳐그룹
    const post = posts.find((_post) => _post.id === postId);

    if (post) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(post));

      // httpie 테스트 : http POST localhost:4000/posts title=foo content=bar --print=hHbB // 👈 h:응답헤더, b:응답바디, H:요청헤더, B:요청바디
    } else {
      res.statusCode = 404;
      res.end('post not found');
    }
  } else if (req.url === '/posts' && req.method === 'POST') {
    req.setEncoding('utf-8'); // 👈 안해주면 바이너리 값으로 처리됨
    req.on('data', (data) => {
      // req.on('data',콜백) 👈 요청에 데이터가 있을 경우 처리

      // 메소드체이닝을 편하게 작성하기 위해 타입지정
      /**
       * @typedef CreatePostBody
       * @property {string} title
       * @property {string} content
       */
      /** @type {CreatePostBody} */
      const body = JSON.parse(data); // json으로 parse
      console.log(body);
      posts.push({
        id: body.title.toLowerCase().replace(/\s/g, '_'),
        //                                    👆 공백에 해당하는 모든 경우
        title: body.title,
        content: body.content,
      });
    });

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
