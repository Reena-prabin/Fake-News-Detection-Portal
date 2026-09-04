import pandas as pd
import string
import nltk
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from nltk.corpus import stopwords
nltk.download("stopwords")

# Load datasets
fake = pd.read_csv("ai-model/dataset/Fake.csv")
true = pd.read_csv("ai-model/dataset/True.csv")
# Add labels
fake["label"] = 0
true["label"] = 1
# Combine datasets
news = pd.concat([fake, true], ignore_index=True)
# Shuffle the dataset
news = news.sample(frac=1, random_state=42).reset_index(drop=True)
# Convert text to lowercase
news["text"] = news["text"].str.lower()
print(news["text"].head())
import string

news["text"] = news["text"].str.translate(
    str.maketrans("", "", string.punctuation)
)

print(news["text"][0])
stop_words = set(stopwords.words("english"))

news["text"] = news["text"].apply(
    lambda x: " ".join(
        word for word in x.split()
        if word not in stop_words
    )
)

print(news["text"][0])
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(news["text"])
y = news["label"]
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)
model = LogisticRegression()

model.fit(X_train, y_train)

print("Model trained successfully!")
print(X)

print()

print(y.head())
print("Training Data:", X_train.shape)
print("Testing Data :", X_test.shape)
# Predict on test data
y_pred = model.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)

print()
print("Accuracy:", accuracy)
# Save model and vectorizer
joblib.dump(model, "ai-model/models/fake_news_model.pkl")
joblib.dump(vectorizer, "ai-model/models/tfidf_vectorizer.pkl")

print("Model saved successfully!")