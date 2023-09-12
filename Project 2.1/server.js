const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const LOCAL_PORT = 8080; // Порт, на котором будет работать сервер

server.on('message', (msg, rinfo) => {
  console.log(
    `Получен запрос от ${rinfo.address}:${rinfo.port}: ${msg.toString()}`
  );

  // Отправка ответа обратно клиенту
  const response = 'Сообщение получено и обработано';
  server.send(response, rinfo.port, rinfo.address, (err) => {
    if (err) {
      console.error(`Ошибка при отправке ответа: ${err}`);
    } else {
      console.log(`Отправлен ответ на запрос: ${response}`);
    }
  });
});

server.bind(LOCAL_PORT, () => {
  console.log(`UDP сервер слушает на 0.0.0.0:${LOCAL_PORT}`);
});
