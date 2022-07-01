import os
from threading import Timer
from flask import Flask, render_template, Response, request
from cpu_utils import Video as VideoCPU, send_face_to_api
# from cuda_utils import Video as VideoCUDA

app = Flask(__name__)


@app.route('/')
def index():
    ip = request.args.get("ip", None)
    port = request.args.get("port", None)
    user = request.args.get("user", None)
    password = request.args.get("password", None)
    queryString: str = "?"
    if ip:
        queryString += f'ip={ip}'
    if port:
        queryString += f'&port={port}'
    if user:
        queryString += f'&user={user}'
    if password:
        queryString += f'&password={password}'

    return render_template('index.html', data=queryString)


class Generator:
    can_send: bool = True
    ip = ""
    port = ""

    def __init__(self, ip, port) -> None:
        self.ip = ip
        self.port = port

    def reset_timer(self):
        print("[+] Reseting timer...")
        self.can_send = True
        print("[+] Timer reset!")

    def generate(self, camera):
        while True:
            frame, faces_images = camera.get_frame()
            if self.can_send and len(faces_images) > 0:
                self.can_send = False
                send_face_to_api(faces_images, self.ip, self.port)
                Timer(3.0, self.reset_timer).start()

            yield (b'--frame\r\n'
                   b'Content-Type:  image/jpeg\r\n\r\n' + frame +
                   b'\r\n\r\n')


def get_chunk(byte1=None, byte2=None, full_path=""):
    file_size = os.stat(full_path).st_size
    start = 0

    if byte1 < file_size:
        start = byte1
    if byte2:
        length = byte2 + 1 - byte1
    else:
        length = file_size - start

    with open(full_path, 'rb') as f:
        f.seek(start)
        chunk = f.read(length)
    return chunk, start, length, file_size


@app.route('/video/history')
def get_file():

    ip = request.args.get("ip", None)
    print(f"ip -------- {ip}")
    file_name = os.path.join("videos", "tmp", ip + ".mp4")

    byte1, byte2 = 0, None

    chunk, start, length, file_size = get_chunk(byte1, byte2, file_name)
    resp = Response(chunk, 200, mimetype='video/mp4',
                    content_type='video/mp4', direct_passthrough=True)
    resp.headers.add(
        'Content-Range', 'bytes {0}-{1}/{2}'.format(start, start + length - 1, file_size))
    return resp


@app.route('/video')
def video():
    ip = request.args.get("ip", None)
    port = request.args.get("port", None)
    user = request.args.get("user", None)
    password = request.args.get("password", None)

    generator = Generator(ip, port)
    return Response(generator.generate(VideoCPU(ip, port, user, password)),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8787, debug=True, threaded=True)
