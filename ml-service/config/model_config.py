MODEL_URLS = {
    "custom_cnn": "https://drive.google.com/uc?id=1hZpCBxSa6x9R6Juj_YUurl4OCU5BqZby",
    "efficientnet": "https://drive.google.com/uc?id=14tUfQWoWdoJ2fuupK1N__FmRbXSyJ-C8",
    "mobilenet": "https://drive.google.com/uc?id=1XG2ZmMd5A3VGJd1xCS4YBNdFUlnWczg7",
    "resnet": "https://drive.google.com/uc?id=1ZgIiWiYzIiqTUkT2wOUgWudkxPA7KCWT",
    "xception": "https://drive.google.com/uc?id=1iVAgIEmK6b937jnRhSPfdMBOCYfQSMV3",
    "hybrid": "https://drive.google.com/uc?id=1xG0XXKGLfc-mv-c_HzqwYYUSzRCCIRGr",
    "ensemble": "https://drive.google.com/uc?id=1-KBvNoXAqLEfpNT19IfdfNlZnUZYgyzl",
}

# File extensions per model — .h5 for legacy models, .keras for new ones
MODEL_EXTENSIONS = {
    "custom_cnn": "h5",
    "efficientnet": "h5",
    "mobilenet": "keras",
    "resnet": "keras",
    "xception": "keras",
    "hybrid": "keras",
    "ensemble": "keras",
}

MODEL_PATHS = {
    name: f"models/{name}.{ext}"
    for name, ext in MODEL_EXTENSIONS.items()
}