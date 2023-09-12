const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const LOCAL_PORT = 8080; // Порт, на котором будет работать сервер

server.on('message', (msg, rinfo) => {
  console.log(
    `Получен запрос от ${rinfo.address}:${rinfo.port}: ${msg.toString()}`
  );
});

server.bind(LOCAL_PORT, () => {
  console.log(`UDP сервер слушает на 0.0.0.0:${LOCAL_PORT}`);
});
