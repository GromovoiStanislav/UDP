import socket

LOCAL_HOST = '0.0.0.0'  # Принимать запросы от любого хоста
LOCAL_PORT = 8080  # Порт, на котором будет работать сервер

server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

try:
    server_socket.bind((LOCAL_HOST, LOCAL_PORT))
    print(f'UDP сервер слушает на {LOCAL_HOST}:{LOCAL_PORT}')

    while True:
        data, client_address = server_socket.recvfrom(1024)
        print(f'Получен запрос от клиента {client_address}: "{data.decode()}"')

        # Обработка запроса и отправка ответа
        response = 'Сообщение получено и обработано'
        server_socket.sendto(response.encode(), client_address)
        print(f'Отправлен ответ клиенту {client_address}: "{response}"')
except Exception as e:
    print(f'Ошибка: {str(e)}')
finally:
    server_socket.close()