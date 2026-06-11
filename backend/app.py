from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import numpy as np
from pathlib import Path
import joblib

app = FastAPI()

# Allow GitHub Pages frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_path = Path("model.pkl")

print("Current working directory:", Path.cwd())
print("Model path:", model_path.resolve())
print("Exists:", model_path.exists())

model = joblib.load(model_path)


class PredictionRequest(BaseModel):
    f1: float
    f2: float
    f3: float
    f4: float


@app.get("/")
def root():
    return {"status": "online"}


@app.post("/predict")
def predict(data: PredictionRequest):

    x = np.array([
        [
            data.f1,
            data.f2,
            data.f3,
            data.f4
        ]
    ])

    prediction = int(model.predict(x)[0])

    probabilities = model.predict_proba(x)[0]

    return {
        "prediction": prediction,
        "class0_probability": float(probabilities[0]),
        "class1_probability": float(probabilities[1])
    }