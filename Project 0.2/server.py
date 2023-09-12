import socket

LOCAL_HOST = "0.0.0.0"
LOCAL_PORT = 8080  # Порт, на котором будет работать сервер

server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server_socket.bind((LOCAL_HOST, LOCAL_PORT))

print(f"UDP сервер слушает на {LOCAL_HOST}:{LOCAL_PORT}")

while True:
    data, addr = server_socket.recvfrom(1024)
    print(f"Получен запрос от {addr}: {data.decode()}")