import base64
import cv2
import requests

faceDetect = cv2.CascadeClassifier('detector.xml')


def send_face_to_api(images):
    images_data = []
    for image in images:
        images_data.append("data:image/jpeg;base64, " +
                           base64.b64encode(image).decode("utf-8"))
    try:
        requests.post("http://127.0.0.1:8000/api/v1/staff/logs/",
                      json={"images": images_data})
    except:
        pass


class Video(object):
    def __init__(self):
        print("[+] Connecting to camera please wait...")
        self.video = cv2.VideoCapture("rtsp://10.135.90.175:8554/live.sdp")
        print("[+] Connected to camera")

    def __del__(self):
        self.video.release()
        print("[+] Camera disconnected")

    def get_frame(self):
        ret, frame = self.video.read()
        # frame = cv2.rotate(frame, cv2.ROTATE_90_CLOCKWISE)
        faces = faceDetect.detectMultiScale(frame, 1.3, 5)
        faces_images = []
        for x, y, w, h in faces:
            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 255), 1)
            roi = frame[y:y + h + 20, x:x + w + 20]
            ret_face, face_jpg = cv2.imencode(".jpeg", roi)
            if ret_face:
                faces_images.append(face_jpg.tobytes())
        ret, jpg = cv2.imencode('.jpg', frame)
        return [jpg.tobytes(), faces_images]