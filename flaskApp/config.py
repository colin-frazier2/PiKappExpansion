# config.py
import os

class Config:
    # MONGO_URI = "mongodb://localhost:27017/mydatabase"  # Replace with your MongoDB URI
    # MONGO_URI = "mongodb://root:example@mongo:27017/"
    MONGO_USER = os.getenv("MONGO_USER")
    MONGO_PASS = os.getenv("MONGO_PASS")
    MONGO_ENDPOINT = os.getenv("MONGO_ENDPOINT")

    # MONGO_URI = "mongodb://root:example@127.0.0.1:27017/chapterSchoolDb?authSource=admin"
    if MONGO_USER is None or MONGO_PASS is None or MONGO_ENDPOINT is None:
        MONGO_URI = "mongodb://root:example@mongodb:27017/chapterSchoolDb?authSource=admin"
    else: 
        MONGO_URI = f"mongodb://{MONGO_USER}:{MONGO_PASS}@{MONGO_ENDPOINT}/chapterSchoolDb?authSource=admin"

    print(MONGO_URI)