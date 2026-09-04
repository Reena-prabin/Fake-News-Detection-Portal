import joblib
import string
import nltk
from nltk.corpus import stopwords

nltk.download("stopwords")

model = joblib.load("ai-model/models/fake_news_model.pkl")
vectorizer = joblib.load("ai-model/models/tfidf_vectorizer.pkl")

stop_words = set(stopwords.words("english"))

def preprocess_text(text):
    text = text.lower()

    text = text.translate(
        str.maketrans("", "", string.punctuation)
    )

    text = " ".join(
        word for word in text.split()
        if word not in stop_words
    )

    return text

news = input("Enter the news: ")

cleaned_news = preprocess_text(news)

news_vector = vectorizer.transform([cleaned_news])

prediction = model.predict(news_vector)
probability = model.predict_proba(news_vector)

confidence = max(probability[0]) * 100

if prediction[0] == 0:
    print("Result: FAKE NEWS")
else:
    print("Result: REAL NEWS")

print("Confidence:", round(confidence, 2), "%")