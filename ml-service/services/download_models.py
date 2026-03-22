import os
import gdown
from config.model_config import MODEL_URLS, MODEL_PATHS

MODEL_DIR = "models"


def download_models():
    os.makedirs(MODEL_DIR, exist_ok=True)

    for name, url in MODEL_URLS.items():
        output_path = MODEL_PATHS[name]

        if not os.path.exists(output_path):
            print(f"Downloading {name}...")
            try:
                gdown.download(url, output_path, quiet=False)
                print(f"✅ {name} downloaded successfully.")
            except Exception as e:
                print(f"❌ Error downloading {name}: {e}")
        else:
            print(f"✅ {name} already exists, skipping download.")
