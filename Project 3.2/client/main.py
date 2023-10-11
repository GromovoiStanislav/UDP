import socket
import json

# Константы
SERVER_PORT = 12345  # Порт, на который будет отправлен файл
SERVER_ADDRESS = 'localhost'  # Замените на реальный IP-адрес сервера

FILE_PATH = 'publicKey.pem'  # Путь к файлу, который нужно отправить
fileName = 'publicKey.pem'  # Имя файла с расширением

# Чтение данных из файла
with open(FILE_PATH, 'rb') as file:
    fileData = file.read()

# Создание объекта для передачи
fileObject = {'fileName': fileName, 'fileData': fileData.decode('utf-8')}
# Сериализация объекта в JSON
jsonMessage = json.dumps(fileObject)
# Преобразование JSON в байтовый объект и отправка данных
message = jsonMessage.encode('utf-8')

# Создание UDP сокета
client = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

try:
    # Отправка данных на сервер
    client.sendto(message, (SERVER_ADDRESS, SERVER_PORT))
    print(f'Файл {fileName} успешно отправлен на сервер.')
finally:
    client.close()
