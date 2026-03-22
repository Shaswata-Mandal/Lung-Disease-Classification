import keras
keras.config.enable_unsafe_deserialization()
 
import tensorflow as tf
import numpy as np
 
 
# ============================================================
# Register custom layers used by the Hybrid Attention model.
# ============================================================
 
@tf.keras.utils.register_keras_serializable()
class ChannelMean(tf.keras.layers.Layer):
    def call(self, inputs):
        return tf.reduce_mean(inputs, axis=3, keepdims=True)
 
 
@tf.keras.utils.register_keras_serializable()
class ChannelMax(tf.keras.layers.Layer):
    def call(self, inputs):
        return tf.reduce_max(inputs, axis=3, keepdims=True)
 
 
CLASS_NAMES = ["Corona Virus Disease", "Normal", "Pneumonia", "Tuberculosis"]
 
models = {}
 
 
def _load_single_model(model_name, path):

    if model_name == "efficientnet":

        # Saved without preprocessing baked in — wrap it.
        base = tf.keras.models.load_model(path, compile=False)
        inputs = tf.keras.Input(shape=(224, 224, 3))
        x = tf.keras.layers.Resizing(380, 380)(inputs)
        x = tf.keras.applications.efficientnet.preprocess_input(x)
        outputs = base(x)
        return tf.keras.Model(inputs, outputs)
    
    else:

        return tf.keras.models.load_model(
            path,
            compile=False,
            safe_mode=False,
        )
 
 
def load_models():

    from config.model_config import MODEL_PATHS

    for model_name, path in MODEL_PATHS.items():
        print(f"⏳ Loading {model_name} from {path} ...")
        try:
            models[model_name] = _load_single_model(model_name, path)
            print(f"✅ {model_name} loaded successfully.")
        except Exception as e:
            print(f"❌ Failed to load {model_name}: {e}")

    print(f"\n🚀 Models ready: {list(models.keys())}")
 
 
def predict(image, model_name):

    if model_name not in models:
        return {"error": f"Model '{model_name}' is not loaded."}
    
    from utils.preprocess import preprocess_image
    processed = preprocess_image(image, model_name)
    preds = models[model_name].predict(processed)[0]

    return {
        "prediction": CLASS_NAMES[np.argmax(preds)],
        "confidence": round(float(np.max(preds)), 4),
    }
 
 
def compare_models(image):

    from utils.preprocess import preprocess_image
    results = []

    for model_name in models:
        try:
            processed = preprocess_image(image, model_name)
            preds = models[model_name].predict(processed)[0]
            results.append({
                "model": model_name,
                "prediction": CLASS_NAMES[np.argmax(preds)],
                "confidence": round(float(np.max(preds)), 4),
            })
        except Exception as e:
            results.append({"model": model_name, "error": str(e)})
            
    valid = [r for r in results if "confidence" in r]
    best_model = max(valid, key=lambda r: r["confidence"])["model"] if valid else None
    return {"results": results, "best_model": best_model}