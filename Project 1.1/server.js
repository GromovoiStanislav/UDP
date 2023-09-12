const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.error(`Ошибка сервера: ${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`Получено сообщение от ${rinfo.address}:${rinfo.port}: ${msg}`);
  try {
    console.log(JSON.parse(msg));
  } catch (err) {}
});

server.on('listening', () => {
  const address = server.address();
  console.log(`UDP сервер слушает на ${address.address}:${address.port}`);
});

server.bind(8080); // Здесь указываем порт, на котором сервер будет слушать
