from fastapi import FastAPI, UploadFile, File, Form
from PIL import Image
import io
from services.download_models import download_models
from services.predict import load_models, predict, compare_models

app = FastAPI()

# 🔥 Runs automatically when server starts
@app.on_event("startup")
def startup_event():
    print("🚀 Starting ML Service...")
    download_models()
    load_models()
    print("✅ ML Service Ready!")

# Health check
@app.get("/")
def home():
    return {"status": "ML Service Running"}

# Prediction API
@app.post("/predict")
async def predict_api(
    file: UploadFile = File(...),
    model_name: str = Form(...)
):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")

        # 🔥 NEW: compare mode
        if model_name == "compare":
            result = compare_models(image)
            return result

        # normal prediction
        result = predict(image, model_name)

        return {
            "model": model_name,
            **result
        }

    except Exception as e:
        return {"error": str(e)}