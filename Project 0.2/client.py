import socket

REMOTE_HOST = "localhost"
REMOTE_PORT = 8080  # Порт, на котором запущен удаленный сервис

client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

try:
    client_socket.sendto(b'Ping', (REMOTE_HOST, REMOTE_PORT))
    print("Отправлен запрос Ping на удаленный сервер")
except Exception as e:
    print(f"Ошибка при отправке: {str(e)}")
finally:
    client_socket.close()