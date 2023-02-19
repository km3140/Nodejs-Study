const exec = require('child_process').exec;

var process = exec('dir'); // cmd의 dir 명령어 실행

process.stdout.on('data', function (data) {
  console.log(data.toString()); // 콘솔로 찍어내기
});

process.stderr.on('data', function (data) {
  console.log(data.toString());
});
