import base64
from threading import Thread
import cv2
import numpy
import requests
from moviepy.editor import VideoFileClip
import os

faceDetect = cv2.CascadeClassifier('detector.xml')


def allow_record(url):
    try:
        clip = VideoFileClip(url)
        duration = clip.duration
        duration = 0
        return duration <= 60
    except:
        return True


def send_face_to_api(images, ip, port):
    images_data = []
    for image in images:
        images_data.append("data:image/jpeg;base64, " +
                           base64.b64encode(image).decode("utf-8"))
    try:
        req = requests.post("http://localhost/api/v1/staff/mark-log/", timeout=0.0000000001,
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
        self.video = cv2.VideoCapture(url)
        print("[+] Connected to camera")

        self.path_file = f"videos/tmp/{ip}.webm"
        self.prev_path_file = f"videos/{ip}.webm"

        width = self.video.get(cv2.CAP_PROP_FRAME_WIDTH)
        height = self.video.get(cv2.CAP_PROP_FRAME_HEIGHT)
        fps = self.video.get(cv2.CAP_PROP_FPS)

        fourcc = cv2.VideoWriter_fourcc(*'VP90')
        self.out = cv2.VideoWriter(self.path_file, fourcc, 20.0,
                                   (int(width), int(height)))

    def __del__(self):
        self.video.release()
        print("[+] Camera disconnected")

    def save_frame(self, frame):
        if allow_record(self.path_file):
            self.out.write(frame)
        elif os.path.isfile(self.path_file):
            if os.path.isfile(self.prev_path_file):
                os.remove(self.prev_path_file)
            os.replace(self.path_file, self.prev_path_file)

    def get_frame(self):
        ret, frame = self.video.read()

        # self.save_frame(frame)

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
