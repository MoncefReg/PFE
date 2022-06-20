from recognitionapp.dl import functions
import pickle
import pandas as pd
from os import path
import os
import numpy as np


def cosinDist(source_representation, test_representation):
    a = np.matmul(np.transpose(source_representation), test_representation)
    b = np.sum(np.multiply(source_representation, source_representation))
    c = np.sum(np.multiply(test_representation, test_representation))
    return 1 - (a / (np.sqrt(b) * np.sqrt(c)))


def recognise(img_path, db_path, model=None, normalization='base'):
    img_paths, bulk_process = functions.initialize_input(img_path)

    if os.path.isdir(db_path) is True:
        file_name = "representations.pkl"
        file_name = file_name.replace("-", "_").lower()

        file_path = f'{db_path}/{file_name}'

        if path.exists(file_path):
            f = open(file_path, 'rb')
            representations = pickle.load(f)

        else:
            employees = []

            for r, d, f in os.walk(db_path):
                for file in f:
                    if ('.jpg' in file.lower()) or ('.png' in file.lower()):
                        exact_path = f'{r}/{file}'
                        employees.append(exact_path)

            if len(employees) == 0:
                raise ValueError("No images found here!")

            representations = []

            for index in range(0, len(employees)):
                employee = employees[index]

                instance = [employee]

                custom_model = model

                representation = represent(img_path=employee, model=custom_model,
                                           normalization=normalization
                                           )

                instance.append(representation)
                representations.append(instance)

            f = open(file_path, "wb")
            pickle.dump(representations, f)
            f.close()

        df = pd.DataFrame(representations, columns=[
            "identity", f"representation"])

        df_base = df.copy()

        resp_obj = []

        for _path in range(0, len(img_paths)):
            img_path = img_paths[_path]

            custom_model = model

            target_representation = represent(img_path=img_path, model=custom_model,
                                              normalization=normalization
                                              )

            distances = []
            for index, instance in df.iterrows():
                source_representation = instance["representation"]

                distance = cosinDist(
                    source_representation, target_representation)

                distances.append(distance)

            df[f"cosine"] = distances

            threshold = 0.28
            df = df.drop(columns=["representation"])
            df = df[df[f"cosine"] <= threshold]

            df = df.sort_values(
                by=[f"cosine"], ascending=True).reset_index(drop=True)

            resp_obj.append(df)
            df = df_base.copy()

        if len(resp_obj) == 1:
            return resp_obj[0]

        return resp_obj

    else:
        raise ValueError("Path does not exist!")


def represent(img_path, model, normalization='base'):
    input_shape_x, input_shape_y = functions.find_input_shape(model)

    img = functions.preprocess_face(img=img_path, target_size=(
        input_shape_y, input_shape_x))

    img = functions.normalize_input(img=img, normalization=normalization)

    embedding = model.predict(img)[0].tolist()

    return embedding
