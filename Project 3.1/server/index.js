const dgram = require('dgram');
const fs = require('fs');
const path = require('path');

const server = dgram.createSocket('udp4');
const PORT = 12345; // Порт, который будет слушать сервер
const DOWNLOAD_FOLDER = 'download'; // Имя папки для сохранения файлов

server.on('message', (msg, info) => {
	console.log(`Получено сообщение от клиента: ${info.address}:${info.port}`);

	/*
		В этом варианте может быть проблема с разделителем
	*/
	// // Парсим полученное сообщение, чтобы извлечь имя файла и данные
	// const parts = msg.toString().split('||');
	// console.log("parts.length", parts.length)
	// if (parts.length === 2) {
	// 	const fileName = parts[0];
	// 	const fileData = parts[1];
	// 	// Сохраняем принятые данные в папке "download" с указанным именем
	// 	const filePath = path.join(__dirname, DOWNLOAD_FOLDER, fileName);
	// 	fs.writeFile(filePath, fileData, { encoding: null }, (err) => {
	// 		if (err) {
	// 			console.error('Ошибка при записи файла:', err);
	// 		} else {
	// 			console.log(`Файл ${fileName} успешно сохранен в папке "download".`);
	// 		}
	// 	});
	// } else {
	// 	console.log('Неверный формат сообщения.');
	// }


	try {
		// Десериализуем JSON в объект
		const fileObject = JSON.parse(msg.toString());

		const fileName = fileObject.fileName;
		const fileData = fileObject.fileData;

		// Сохраняем принятые данные в папке "download" с указанным именем
		const filePath = path.join(__dirname, DOWNLOAD_FOLDER, fileName);
		fs.writeFile(filePath, fileData, { encoding: null }, (err) => {
			if (err) {
				console.error('Ошибка при записи файла:', err);
			} else {
				console.log(`Файл ${fileName} успешно сохранен в папке "download".`);
			}
		});




	} catch (error) {
		console.error('Ошибка при разборе JSON:', error);
	}

});

server.on('listening', () => {
	const address = server.address();
	console.log(`Сервер слушает на ${address.address}:${address.port}`);
});

server.bind(PORT);