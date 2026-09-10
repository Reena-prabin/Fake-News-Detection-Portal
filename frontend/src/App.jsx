import { useEffect, useState } from "react";
import "./App.css";

function App() {

    const [news, setNews] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);


    // ===============================
    // Get Prediction History
    // ===============================

    const getHistory = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/history"
            );

            const data = await response.json();

            setHistory(data);

        } catch (error) {

            console.log("Unable to fetch history");

        }

    };


    // ===============================
    // Load History When Page Opens
    // ===============================

    useEffect(() => {

        getHistory();

    }, []);


    // ===============================
    // Check News
    // ===============================

    const checkNews = async () => {

        if (!news.trim()) {

            alert("Please enter a news article");

            return;

        }

        setLoading(true);
        setResult(null);

        try {

            const response = await fetch(
                "http://localhost:5000/predict",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        news: news
                    })
                }
            );

            const data = await response.json();

            setResult(data);

            // Refresh history
            getHistory();

        } catch (error) {

            alert("Unable to connect to backend");

        }

        setLoading(false);

    };


    // ===============================
    // Clear History
    // ===============================

    const clearHistory = async () => {

        try {

            await fetch(
                "http://localhost:5000/history",
                {
                    method: "DELETE"
                }
            );

            setHistory([]);

        } catch (error) {

            alert("Unable to clear history");

        }

    };


    // ===============================
    // UI
    // ===============================

    return (

        <div className="app">

            {/* Header */}

            <header className="header">

                <h1>
                    Fake News Detection Portal
                </h1>

                <p>
                    AI-powered news credibility analysis
                </p>

            </header>


            <main className="container">


                {/* News Input */}

                <div className="card">

                    <h2>
                        Check a News Article
                    </h2>

                    <p className="description">

                        Enter a news article below and our AI model
                        will analyze whether it is likely to be real or fake.

                    </p>


                    <textarea
                        placeholder="Paste your news article here..."
                        value={news}
                        onChange={(e) => setNews(e.target.value)}
                    />


                    <button
                        onClick={checkNews}
                        disabled={loading}
                    >

                        {loading
                            ? "Analyzing..."
                            : "Check News"
                        }

                    </button>

                </div>


                {/* Current Result */}

                {result && (

                    <div className="result-card">

                        <h2>
                            Analysis Result
                        </h2>


                        <div
                            className={
                                result.result === "FAKE NEWS"
                                    ? "result fake"
                                    : "result real"
                            }
                        >

                            {result.result}

                        </div>


                        <div className="details">

                            <div>

                                <span>
                                    Confidence
                                </span>

                                <strong>
                                    {result.confidence}%
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Confidence Level
                                </span>

                                <strong>
                                    {result.confidence_level}
                                </strong>

                            </div>

                        </div>

                    </div>

                )}


                {/* Prediction History */}

                {history.length > 0 && (

                    <div className="history-card">

                        <div className="history-header">

                            <h2>
                                Prediction History
                            </h2>


                            <button
                                className="clear-btn"
                                onClick={clearHistory}
                            >

                                Clear History

                            </button>

                        </div>


                        {history.map((item) => (

                            <div
                                className="history-item"
                                key={item._id}
                            >

                                <p>
                                    {item.news}
                                </p>


                                <div className="history-details">

                                    <span
                                        className={
                                            item.result === "FAKE NEWS"
                                                ? "history-fake"
                                                : "history-real"
                                        }
                                    >

                                        {item.result}

                                    </span>


                                    <span>
                                        {item.confidence}%
                                    </span>


                                    <span>
                                        {item.confidence_level}
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </main>


            {/* Footer */}

            <footer>

                <p>
                    Fake News Detection Portal • AI & MERN Stack
                </p>

            </footer>

        </div>

    );

}

export default App;