import base64
import cv2
import numpy
import requests

faceDetect = cv2.CascadeClassifier('detector.xml')


def send_face_to_api(images, ip, port):
    images_data = []
    for image in images:
        images_data.append("data:image/jpeg;base64, " +
                           base64.b64encode(image).decode("utf-8"))
    try:
        req = requests.post("http://backend-api:8888/api/v1/staff/mark-log/",
                            json={"images": images_data, "ip": ip, "port": port})
    except Exception as e:
        print(e)
        pass


class Video(object):
    def __init__(self, ip: str, port, user: str, password: str):
        print("[+] Connecting to camera please wait...")
        url = "rtsp://"
        creds = None
        self.ip = ip
        self.port = port
        location = f'{ip}:{port}'
        if user and password:
            creds = f'{user}:{password}@'
        if creds:
            url += creds
        url += location + "/live.sdp"
        print(url)
        self.video = cv2.VideoCapture(url)
        print("[+] Connected to camera")

    def __del__(self):
        self.video.release()
        print("[+] Camera disconnected")

    def get_frame(self):
        ret, frame = self.video.read()
        faces = faceDetect.detectMultiScale(frame, 1.3, 5)
        faces_images = []
        for x, y, w, h in faces:
            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 255), 1)
            roi = frame[y:y + h + 20, x:x + w + 20]
            ret_face, face_jpg = cv2.imencode(".jpeg", roi)
            if ret_face:
                faces_images.append(face_jpg.tobytes())
        if ret:
            ret, jpg = cv2.imencode('.jpg', frame)
        else:
            ret, jpg = cv2.imencode(".jpg", numpy.zeros((800, 800)))
        return [jpg.tobytes(), faces_images]
