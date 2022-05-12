import cv2
from matplotlib import scale
import numpy

faceDetect = cv2.cuda.CascadeClassifier_create('cuda_detector.xml')

class Video(object):
    def __init__(self):
        print("[+] Connecting to camera please wait...")
        self.video = cv2.VideoCapture("rtsp://192.168.1.4:8554/live.sdp")
        print("[+] Connected to camera")

    def __del__(self):
        self.video.release()
        print("[+] Camera disconnected")

    def get_frame(self):
        ret, frame = self.video.read()

        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        gpu_frame = cv2.cuda_GpuMat(gray_frame)

        faces = faceDetect.detectMultiScale(gpu_frame)
        results = faces.download()
        print('results: ', results)
        if numpy.all(results):
            for result in results:
                for x, y, w, h in result:
                    cv2.rectangle(frame, (x, y), (x + w, y + h),
                                  (255, 0, 255), 1)
        ret, jpg = cv2.imencode('.jpg', frame)
        return jpg.tobytes()
