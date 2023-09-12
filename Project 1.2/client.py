import socket
import json
import time

UDP_IP = "localhost"  # Хост, где запущен UDP сервер
UDP_PORT = 8080  # Порт, на котором работает UDP сервер

client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

count = 0

while True:
    timestamp = int(time.time() * 1000)  # Текущая временная метка в миллисекундах
    message = json.dumps({"count": count, "timestamp": timestamp}).encode()
    
    client_socket.sendto(message, (UDP_IP, UDP_PORT))
    print(f"Отправлено сообщение на {UDP_IP}:{UDP_PORT}: {message.decode()}")
    
    count += 1
    time.sleep(1)  # Подождите 1 секунду перед отправкой следующего сообщения
