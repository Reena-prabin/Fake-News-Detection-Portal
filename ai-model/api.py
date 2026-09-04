from fastapi import FastAPI
from pydantic import BaseModel

from predict import predict_news

app = FastAPI()


class NewsRequest(BaseModel):
    news: str


@app.get("/")
def home():
    return {"message": "Fake News Detection AI API is running"}


@app.post("/predict")
def predict(request: NewsRequest):
    result, confidence, confidence_level = predict_news(request.news)

    return {
        "result": result,
        "confidence": confidence,
        "confidence_level": confidence_level
    }