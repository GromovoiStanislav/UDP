const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const REMOTE_HOST = 'localhost';
const REMOTE_PORT = 8080; // Порт, на котором запущен удаленный сервис

client.send('Ping', REMOTE_PORT, REMOTE_HOST, (err) => {
  if (err) {
    console.error(`Ошибка при отправке: ${err}`);
  } else {
    console.log('Отправлен запрос Ping на удаленный сервер');
  }

  client.close();
});
