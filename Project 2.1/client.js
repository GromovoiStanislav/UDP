const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const REMOTE_HOST = 'localhost';
const REMOTE_PORT = 8080; // Порт, на котором запущен удаленный сервис

const message = 'Ping';

client.on('message', (msg, rinfo) => {
  console.log(
    `Получен ответ от сервера (${rinfo.address}:${
      rinfo.port
    }): ${msg.toString()}`
  );
  client.close();
});

client.send(message, REMOTE_PORT, REMOTE_HOST, (err) => {
  if (err) {
    console.error(`Ошибка при отправке: ${err}`);
    client.close();
  } else {
    console.log(`Отправлен запрос "${message}" на удаленный сервер`);
  }
});
