import socket
import json
import os

# Константы
PORT = 12345  # Порт, который будет слушать сервер
ADDRESS = 'localhost'  # Замените на реальный IP-адрес сервера
DOWNLOAD_FOLDER = 'download'  # Имя папки для сохранения файлов

# Создание UDP сокета
server = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server.bind((ADDRESS, PORT))  # Привязываем сервер к любому доступному интерфейсу

# Проверка существования папки DOWNLOAD_FOLDER и создание ее, если она не существует
if not os.path.exists(DOWNLOAD_FOLDER):
    os.makedirs(DOWNLOAD_FOLDER)


print(f'Сервер слушает на {ADDRESS}:{PORT}')

while True:
    data, addr = server.recvfrom(4096)  # Получение данных от клиента
    print(f'Получено сообщение от клиента: {addr[0]}:{addr[1]}')

    try:
        # Десериализация JSON в объект
        fileObject = json.loads(data.decode('utf-8'))

        fileName = fileObject['fileName']
        fileData = fileObject['fileData']

        # Сохранение принятых данных в папке DOWNLOAD_FOLDER с указанным именем
        filePath = os.path.join(DOWNLOAD_FOLDER, fileName)
        with open(filePath, 'wb') as file:
            file.write(fileData.encode('utf-8'))

        print(f'Файл {fileName} успешно сохранен в папке "{DOWNLOAD_FOLDER}".')

    except json.JSONDecodeError as e:
        print(f'Ошибка при разборе JSON: {e}')

server.close()
