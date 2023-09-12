import socket
import json

UDP_IP = "localhost"  # Хост, на котором будет работать UDP сервер
UDP_PORT = 8080  # Порт, на котором будет работать UDP сервер

server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server_socket.bind((UDP_IP, UDP_PORT))

print(f"UDP сервер слушает на {UDP_IP}:{UDP_PORT}")

while True:
    data, addr = server_socket.recvfrom(1024)
    print(f"Получено сообщение от {addr}: {data.decode()}")
    print(data) # b'{"count": 171, "timestamp": 1694492651828}'

    try:
      data = json.loads(data.decode())
      print(data) # {'count': 171, 'timestamp': 1694492651828}
    except json.JSONDecodeError as e:
      print(f"Ошибка декодирования JSON: {e}")
    except Exception as e:
      pass  # Обработка других исключений (вы можете добавить дополнительные блоки except при необходимости)