import socket

SERVER_IP = "127.0.0.1"   # 127.0.0.1 = המחשב הזה עצמו
SERVER_PORT = 1234

client = socket.socket()
client.connect((SERVER_IP, SERVER_PORT))   # השרת חייב כבר לרוץ
print("Connected to", SERVER_IP, SERVER_PORT)

msg = input("Your name: ")
client.send(msg.encode())        # טקסט -> בייטים

data = client.recv(1024)         # נתקע כאן עד שמגיעה תשובה
print("Server said:", data.decode())

client.close()
