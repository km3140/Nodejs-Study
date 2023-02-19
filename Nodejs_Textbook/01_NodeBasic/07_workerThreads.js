const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  // 메인스레드 작업영역, 이 영역에서 메인스레드가 워커스레드에게 분배함
  const worker = new Worker(__filename); // 워커스레드 하나 생성
  //                          👆 현재 파일, 다른 파일을 사용하고 싶다면 path모듈을 사용
  worker.on('message', value => console.log('워커로부터', value)); // 워커스레드로부터 메세지를 받을 시, 콘솔 출력
  worker.on('exit', () => console.log('워커 끝~')); // 워커스레드가 종료 시, 콘솔 출력
  worker.postMessage('ping'); // 워커스레드에 'ping' 송신
} else {
  // 워커스레드 작업영역
  parentPort.on('message', value => {
    // 부모스레드로부터 메세지 받을 시
    console.log('부모로부터', value); // 콘솔 출력
    parentPort.postMessage('pong'); // 부모(메인) 스레드에 'pong' 송신
    parentPort.close(); // 워커스레드 종료
  });
}
