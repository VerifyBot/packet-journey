import socket

IP = "0.0.0.0"        # 0.0.0.0 = תקשיב לכל כרטיסי הרשת של המחשב
PORT = 1234

server = socket.socket()
server.bind((IP, PORT))
server.listen()
print("Server listening on port", PORT)

while True:
    # accept נתקע כאן עד שלקוח מתחבר
    client, addr = server.accept()
    print("Connected:", addr)

    while True:
        data = client.recv(1024)   # נתקע כאן עד שמגיעים בייטים
        if not data:               # b"" = הצד השני סגר
            break

        name = data.decode()       # בייטים -> טקסט
        print("Got:", name)

        client.send(("Hello " + name).encode())   # טקסט -> בייטים

    client.close()
    print("Client closed. Waiting for the next one.")
