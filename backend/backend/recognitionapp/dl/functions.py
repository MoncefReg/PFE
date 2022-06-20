from tensorflow.keras.preprocessing import image
import os
import numpy as np
import cv2
import base64
from PIL import Image
import requests

import tensorflow as tf

tf_version = tf.__version__
tf_major_version = int(tf_version.split(".")[0])
tf_minor_version = int(tf_version.split(".")[1])


def initialize_input(img1_path, img2_path=None):
    if type(img1_path) == list:
        bulk_process = True
        img_list = img1_path.copy()
    else:
        bulk_process = False
        if (
                (type(img2_path) == str and img2_path is not None)
                or (isinstance(img2_path, np.ndarray) and img2_path.any())
        ):
            img_list = [[img1_path, img2_path]]
        else:
            img_list = [img1_path]

    return img_list, bulk_process


def loadBase64Img(uri):
    encoded_data = uri.split(',')[1]
    nparr = np.fromstring(base64.b64decode(encoded_data), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img


def load_image(img):
    exact_image = False
    base64_img = False
    url_img = False

    if type(img).__module__ == np.__name__:
        exact_image = True

    elif len(img) > 11 and img[0:11] == "data:image/":
        base64_img = True

    elif len(img) > 11 and img.startswith("http"):
        url_img = True

    if base64_img is True:
        img = loadBase64Img(img)

    elif url_img:
        img = np.array(Image.open(requests.get(img, stream=True).raw))

    elif exact_image is not True:
        if os.path.isfile(img) is not True:
            raise ValueError("Confirm that ", img, " exists")

        img = cv2.imread(img)

    return img


def get_region(img):
    img_region = [0, 0, img.shape[0], img.shape[1]]
    return img, img_region


def normalize_input(img, normalization='base'):
    if normalization == 'base':
        return img
    else:
        img *= 255

        if normalization == 'raw':
            pass

        elif normalization == 'Facenet':
            mean, std = img.mean(), img.std()
            img = (img - mean) / std

        elif normalization == 'VGGFace':
            img[..., 0] -= 93.5940
            img[..., 1] -= 104.7624
            img[..., 2] -= 129.1863

    return img


def preprocess_face(img, target_size=(224, 224), return_region=False):
    enforce_detection = False
    img = load_image(img)
    base_img = img.copy()

    img, region = get_region(img=img)

    if img.shape[0] == 0 or img.shape[1] == 0:
        if enforce_detection is True:
            raise ValueError("Detected face shape is ", img.shape,
                             ". Consider to set enforce_detection argument to False.")
        else:
            img = base_img.copy()

    if img.shape[0] > 0 and img.shape[1] > 0:
        factor_0 = target_size[0] / img.shape[0]
        factor_1 = target_size[1] / img.shape[1]
        factor = min(factor_0, factor_1)

        dsize = (int(img.shape[1] * factor), int(img.shape[0] * factor))
        img = cv2.resize(img, dsize)

        diff_0 = target_size[0] - img.shape[0]
        diff_1 = target_size[1] - img.shape[1]
        img = np.pad(img, ((diff_0 // 2, diff_0 - diff_0 // 2),
                           (diff_1 // 2, diff_1 - diff_1 // 2), (0, 0)), 'constant')

    if img.shape[0:2] != target_size:
        img = cv2.resize(img, target_size)

    img_pixels = image.img_to_array(img)
    img_pixels = np.expand_dims(img_pixels, axis=0)
    img_pixels /= 255

    if return_region is True:
        return img_pixels, region
    else:
        return img_pixels


def find_input_shape(model):
    input_shape = model.layers[0].input_shape

    if type(input_shape) == list:
        input_shape = input_shape[0][1:3]
    else:
        input_shape = input_shape[1:3]

    if tf_major_version == 2 and tf_minor_version >= 5:
        x = input_shape[0]
        y = input_shape[1]
        input_shape = (y, x)

    if type(input_shape) == list:
        input_shape = tuple(input_shape)

    return input_shape
