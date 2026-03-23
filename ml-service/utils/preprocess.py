import numpy as np
import tensorflow as tf
 
 
def preprocess_image(image, model_name):
    """
    Preprocess a PIL image for the given model.
    Returns a numpy array with batch dimension added.
    """
    image = image.resize((224, 224))
    image = np.array(image, dtype=np.float32)
 
    if model_name == "efficientnet":
        # Resizing (224→380)
        # Pass raw pixels here.
        pass
 
    elif model_name == "xception":
        # Resizing (224→299)
        pass
 
    elif model_name == "mobilenet":
        # MobileNetV3 expects pixels in [-1, 1]
        image = tf.keras.applications.mobilenet_v3.preprocess_input(image)
 
    elif model_name == "resnet":
        # ResNet50 expects BGR mean-subtracted pixels
        image = tf.keras.applications.resnet50.preprocess_input(image)
 
    elif model_name in ("hybrid", "ensemble", "custom_cnn"):
        # Trained with simple [0, 1] normalization
        image = image / 255.0
 
    else:
        image = image / 255.0
 
    image = np.expand_dims(image, axis=0)
    return image