const dgram = require('dgram');
const fs = require('fs');

const client = dgram.createSocket('udp4');
const SERVER_PORT = 12345; // Порт, на который будет отправлен файл
const SERVER_ADDRESS = 'localhost'; // Замените на реальный IP-адрес сервера

const FILE_PATH = 'publicKey.pem'; // Путь к файлу, который нужно отправить
const fileName = 'publicKey.pem'; // Имя файла с расширением

fs.readFile(FILE_PATH, { encoding: null }, (err, data) => {
	if (err) throw err;


	/*
		В этом варианте может быть проблема с разделителем
	*/
	// // Конкатенируем имя файла и данные, разделяя их символом "||"
	// const message = Buffer.concat([Buffer.from(fileName), Buffer.from('||'), data]);


	// Создаем объект для передачи
	const fileObject = { fileName, fileData: data.toString() };
	// Сериализуем объект в JSON
	const jsonMessage = JSON.stringify(fileObject);
	// Преобразуем JSON в буфер и отправляем
	const message = Buffer.from(jsonMessage);



	client.send(message, 0, message.length, SERVER_PORT, SERVER_ADDRESS, (err) => {
		if (err) throw err;
		console.log(`Файл ${fileName} успешно отправлен на сервер.`);
		client.close();
	});
});