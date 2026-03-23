from fastapi import FastAPI, UploadFile, File, Form
from PIL import Image
import io

from services.download_models import download_models
from services.predict import load_models, predict, compare_models

app = FastAPI()

VALID_MODELS = {
    "custom_cnn", "efficientnet", "mobilenet",
    "resnet", "xception", "hybrid", "ensemble",
}


@app.on_event("startup")
def startup_event():
    print("🚀 Starting ML Service...")
    download_models()
    load_models()
    print("✅ ML Service Ready!")


@app.get("/")
def home():
    return {"status": "ML Service Running"}


@app.get("/models")
def list_models():
    """Returns the list of all available model names."""
    return {"models": sorted(VALID_MODELS)}


@app.post("/predict")
async def predict_api(
    file: UploadFile = File(...),
    model_name: str = Form(...),
):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")

        # Compare mode: run all models and return the best
        if model_name == "compare":
            result = compare_models(image)
            return result

        # Validate model name
        if model_name not in VALID_MODELS:
            return {
                "error": f"Unknown model '{model_name}'. "
                         f"Valid options: {sorted(VALID_MODELS)} or 'compare'."
            }

        result = predict(image, model_name)
        return {"model": model_name, **result}

    except Exception as e:
        return {"error": str(e)}
