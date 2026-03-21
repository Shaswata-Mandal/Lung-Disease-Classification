import numpy as np
import tensorflow as tf

def preprocess_image(image, model_name):
    image = image.resize((224, 224))
    image = np.array(image)

    if model_name == "efficientnet":
        image = tf.keras.applications.efficientnet.preprocess_input(image)

    else:
        image = image / 255.0  # for custom CNN

    image = np.expand_dims(image, axis=0)
    return image