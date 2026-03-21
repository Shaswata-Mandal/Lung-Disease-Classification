import keras
keras.config.enable_unsafe_deserialization()
import tensorflow as tf
import numpy as np
import os
from utils.preprocess import preprocess_image
from config.model_config import MODEL_PATHS

MODEL_DIR = "models"

models = {}

def load_models():
    for model_name, path in MODEL_PATHS.items():
        print(f"✅ Loading {model_name} from {path}")

        if model_name == "efficientnet":
            base_model = tf.keras.models.load_model(path)

            inputs = tf.keras.Input(shape=(224, 224, 3))
            x = tf.keras.layers.Resizing(380, 380)(inputs)
            x = tf.keras.applications.efficientnet.preprocess_input(x)
            outputs = base_model(x)

            model = tf.keras.Model(inputs, outputs)

        else:
            model = tf.keras.models.load_model(
                path,
                compile=False, 
                safe_mode=False
            )

        models[model_name] = model

    print("🚀 All models loaded!")

CLASS_NAMES = ["Corona Virus Disease","Normal","Pneumonia", "Tuberculosis"]

def predict(image, model_name):
    processed = preprocess_image(image, model_name)

    preds = models[model_name].predict(processed)[0]

    predicted_class = CLASS_NAMES[np.argmax(preds)]
    confidence = float(np.max(preds))

    return {
        "prediction": predicted_class,
        "confidence": round(confidence, 4)
    }

def compare_models(image):
    results = []

    for model_name in models.keys():
        try:
            processed = preprocess_image(image, model_name)
            preds = models[model_name].predict(processed)[0]

            predicted_class = CLASS_NAMES[np.argmax(preds)]
            confidence = float(np.max(preds))

            results.append({
                "model": model_name,
                "prediction": predicted_class,
                "confidence": round(confidence, 4)
            })

        except Exception as e:
            results.append({
                "model": model_name,
                "error": str(e)
            })

    # 🔥 find best model (highest confidence)
    valid_results = [r for r in results if "confidence" in r]

    best_model = None
    if valid_results:
        best_model = max(valid_results, key=lambda x: x["confidence"])["model"]

    return {
        "results": results,
        "best_model": best_model
    }