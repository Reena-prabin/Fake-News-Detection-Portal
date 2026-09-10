import { useState } from "react";

function App() {
    const [news, setNews] = useState("");
    const [result, setResult] = useState(null);

    const checkNews = async () => {
        if (!news.trim()) {
            alert("Please enter some news");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    news: news
                })
            });

            const data = await response.json();

            setResult(data);

        } catch (error) {
            alert("Unable to connect to backend");
        }
    };

    return (
        <div>
            <h1>Fake News Detection Portal</h1>

            <p>
                Enter a news article below to check whether it is real or fake.
            </p>

            <textarea
                placeholder="Enter news article here..."
                value={news}
                onChange={(e) => setNews(e.target.value)}
                rows="10"
                cols="60"
            />

            <br />
            <br />

            <button onClick={checkNews}>
                Check News
            </button>

            {result && (
                <div>
                    <h2>Result</h2>

                    <p>
                        Prediction: {result.result}
                    </p>

                    <p>
                        Confidence: {result.confidence}%
                    </p>

                    <p>
                        Confidence Level: {result.confidence_level}
                    </p>
                </div>
            )}
        </div>
    );
}

export default App;