import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function History() {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const getHistory = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/history"
            );

            const data = await response.json();

            setHistory(data);

        } catch (error) {

            alert("Unable to fetch prediction history");

        }

        setLoading(false);
    };


    useEffect(() => {
        getHistory();
    }, []);


    const clearHistory = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to clear all prediction history?"
        );

        if (!confirmDelete) {
            return;
        }

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


    return (

        <div className="dashboard-layout">

            {/* Sidebar */}

            <aside className="sidebar">

                <div className="logo">
                    🛡️
                    <span>
                        Fake News<br />
                        Portal
                    </span>
                </div>

                <nav>

                    <Link to="/dashboard">
                        🏠 Dashboard
                    </Link>

                    <Link to="/check-news">
                        🔍 Check News
                    </Link>

                    <Link to="/history" className="active">
                        📜 History
                    </Link>

                    <Link to="/profile">
                        👤 Profile
                    </Link>

                    <Link to="/about">
                        ℹ️ About
                    </Link>

                </nav>

                <Link to="/login" className="logout">
                    🚪 Logout
                </Link>

            </aside>


            {/* Main Content */}

            <main className="dashboard-main">

                <header className="dashboard-header">

                    <div>

                        <h1>Prediction History</h1>

                        <p>
                            View your previous news analysis results.
                        </p>

                    </div>

                    <div className="user-info">
                        👤 Reena
                    </div>

                </header>


                {/* History Card */}

                <section className="history-page-card">

                    <div className="history-page-header">

                        <div>
                            <h2>📜 Previous Predictions</h2>

                            <p>
                                Total predictions:{" "}
                                <strong>{history.length}</strong>
                            </p>
                        </div>

                        {history.length > 0 && (
                            <button
                                className="clear-history-btn"
                                onClick={clearHistory}
                            >
                                🗑️ Clear History
                            </button>
                        )}

                    </div>


                    {loading ? (

                        <div className="empty-history">
                            Loading history...
                        </div>

                    ) : history.length === 0 ? (

                        <div className="empty-history">

                            <div className="empty-icon">
                                📭
                            </div>

                            <h3>No Predictions Yet</h3>

                            <p>
                                Analyze a news article to see your
                                prediction history here.
                            </p>

                            <Link to="/check-news">
                                <button>
                                    🔍 Check Your First News
                                </button>
                            </Link>

                        </div>

                    ) : (

                        <div className="history-list">

                            {history.map((item) => (

                                <div
                                    className="history-page-item"
                                    key={item._id}
                                >

                                    <div className="history-news">

                                        <p>
                                            {item.news}
                                        </p>

                                        <small>
                                            {new Date(
                                                item.createdAt
                                            ).toLocaleString()}
                                        </small>

                                    </div>


                                    <div className="history-result">

                                        <span
                                            className={
                                                item.result === "FAKE NEWS"
                                                    ? "history-badge fake-badge"
                                                    : "history-badge real-badge"
                                            }
                                        >
                                            {item.result === "FAKE NEWS"
                                                ? "❌ FAKE"
                                                : "✅ REAL"
                                            }
                                        </span>

                                        <span className="history-confidence">
                                            {item.confidence}%
                                        </span>

                                        <span className="history-level">
                                            {item.confidence_level}
                                        </span>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

            </main>

        </div>
    );
}

export default History;