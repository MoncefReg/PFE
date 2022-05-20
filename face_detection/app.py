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

    def __init__(self) -> None:
        pass

    def reset_timer(self):
        print("[+] Reseting timer...")
        self.can_send = True
        print("[+] Timer reset!")

    def generate(self, camera):
        while True:
            frame, faces_images = camera.get_frame()
            if self.can_send and len(faces_images) > 0:
                self.can_send = False
                send_face_to_api(faces_images)
                Timer(3.0, self.reset_timer).start()

            yield (b'--frame\r\n'
                   b'Content-Type:  image/jpeg\r\n\r\n' + frame +
                   b'\r\n\r\n')


@app.route('/video')
def video():
    ip = request.args.get("ip", None)
    port = request.args.get("port", None)
    user = request.args.get("user", None)
    password = request.args.get("password", None)

    generator = Generator()
    return Response(generator.generate(VideoCPU(ip, port, user, password)),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8787, debug=True)
