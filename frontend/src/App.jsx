import { useState } from "react";
import "./App.css";

function App() {
    const [news, setNews] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const checkNews = async () => {
        if (!news.trim()) {
            alert("Please enter a news article");
            return;
        }

        setLoading(true);
        setResult(null);

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

        setLoading(false);
    };

    return (
        <div className="app">

            <header className="header">
                <h1>Fake News Detection Portal</h1>
                <p>AI-powered news credibility analysis</p>
            </header>

            <main className="container">

                <div className="card">

                    <h2>Check a News Article</h2>

                    <p className="description">
                        Enter a news article below and our AI model will
                        analyze whether it is likely to be real or fake.
                    </p>

                    <textarea
                        placeholder="Paste your news article here..."
                        value={news}
                        onChange={(e) => setNews(e.target.value)}
                    />

                    <button onClick={checkNews} disabled={loading}>
                        {loading ? "Analyzing..." : "Check News"}
                    </button>

                </div>

                {result && (
                    <div className="result-card">

                        <h2>Analysis Result</h2>

                        <div className={
                            result.result === "FAKE NEWS"
                                ? "result fake"
                                : "result real"
                        }>
                            {result.result}
                        </div>

                        <div className="details">

                            <div>
                                <span>Confidence</span>
                                <strong>{result.confidence}%</strong>
                            </div>

                            <div>
                                <span>Confidence Level</span>
                                <strong>{result.confidence_level}</strong>
                            </div>

                        </div>

                    </div>
                )}

            </main>

            <footer>
                <p>Fake News Detection Portal • AI & MERN Stack</p>
            </footer>

        </div>
    );
}

export default App;