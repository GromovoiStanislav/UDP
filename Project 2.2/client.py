import socket

REMOTE_HOST = 'localhost'
REMOTE_PORT = 8080  # Порт, на котором запущен удаленный сервис
message = b'Ping'

client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

try:
    # Отправка запроса
    client_socket.sendto(message, (REMOTE_HOST, REMOTE_PORT))
    print(f'Отправлен запрос "{message.decode()}" на удаленный сервер')

    # Ожидание ответа
    data, server_address = client_socket.recvfrom(1024)
    print(f'Получен ответ от сервера {server_address}: "{data.decode()}"')
except Exception as e:
    print(f'Ошибка при отправке/получении: {str(e)}')
finally:
    client_socket.close()