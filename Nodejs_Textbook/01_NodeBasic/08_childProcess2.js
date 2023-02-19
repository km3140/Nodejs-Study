const spawn = require('child_process').spawn;

const process = spawn('python', ['08_childProcess.py']); // 파이썬에게 실행 요청

process.stdout.on('data', function (data) {
  console.log(data.toString());
});

process.stderr.on('data', function (data) {
  console.log(data.toString());
});
