const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const serverPort = 8080; // Порт, на котором работает UDP сервер
const serverHost = 'localhost'; // Хост, где запущен UDP сервер

let count = 0;

function sendMessage() {
  const timestamp = new Date().getTime();
  const message = JSON.stringify({ count, timestamp });

  client.send(message, serverPort, serverHost, (err) => {
    if (err) {
      console.error(`Ошибка при отправке сообщения: ${err}`);
    } else {
      console.log(
        `Отправлено сообщение на ${serverHost}:${serverPort}: ${message}`
      );
    }
  });

  count++;
}

// Отправляем сообщение с интервалом 1 секунда
setInterval(sendMessage, 1000);
