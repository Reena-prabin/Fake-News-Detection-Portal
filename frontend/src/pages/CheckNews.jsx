import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


// ===============================
// Icons
// ===============================

function ShieldIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 3l7 3v5c0 4.8-3 8.5-7 10-4-1.5-7-5.2-7-10V6l7-3z" />
            <path d="M9 12l2 2 4-4" />
        </svg>
    );
}


function DashboardIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
    );
}


function SearchIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
        </svg>
    );
}


function HistoryIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 12a9 9 0 109-9c-2.4 0-4.6.9-6.2 2.5L3 7" />
            <path d="M3 3v4h4" />
            <path d="M12 7v5l3 2" />
        </svg>
    );
}


function UserIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 20c.8-3.5 3.2-5.5 7-5.5s6.2 2 7 5.5" />
        </svg>
    );
}


function InfoIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 10v6" />
            <circle cx="12" cy="7" r=".7" fill="currentColor" />
        </svg>
    );
}


function LogoutIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M10 5H5v14h5" />
            <path d="M14 8l4 4-4 4" />
            <path d="M18 12H9" />
        </svg>
    );
}


function ArticleIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="4" y="3" width="16" height="18" rx="2" />
            <path d="M8 7h8" />
            <path d="M8 11h8" />
            <path d="M8 15h5" />
            <path d="M8 18h3" />
        </svg>
    );
}


function CheckIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="9" />
            <path d="M8 12l2.5 2.5L16 9" />
        </svg>
    );
}


function FakeIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="9" />
            <path d="M8.5 8.5l7 7" />
            <path d="M15.5 8.5l-7 7" />
        </svg>
    );
}


// ===============================
// Check News
// ===============================

function CheckNews() {

    const navigate = useNavigate();

    const [news, setNews] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);


    // ===============================
    // Get Logged-in User
    // ===============================

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const userName = user
        ? user.name
        : "User";


    // ===============================
    // Check News
    // ===============================

    const checkNews = async () => {

        if (!news.trim()) {

            alert("Please enter a news article");

            return;

        }


        const token =
            localStorage.getItem("token");


        if (!token) {

            navigate("/login");

            return;

        }


        setLoading(true);
        setResult(null);


        try {

            const response =
                await fetch(
                    "http://localhost:5000/predict",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${token}`
                        },

                        body: JSON.stringify({
                            news: news
                        })
                    }
                );


            const data =
                await response.json();


            if (response.status === 401) {

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                navigate("/login");

                return;

            }


            if (!response.ok) {

                alert(
                    data.error ||
                    "Unable to process prediction"
                );

                return;

            }


            setResult(data);


        } catch (error) {

            alert(
                "Unable to connect to backend"
            );

        } finally {

            setLoading(false);

        }

    };


    // ===============================
    // Logout
    // ===============================

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };


    // ===============================
    // UI
    // ===============================

    return (

        <div className="dashboard-layout">


            {/* Sidebar */}

            <aside className="sidebar">

                <div className="logo">

                    <div className="sidebar-logo-icon">
                        <ShieldIcon />
                    </div>

                    <span>
                        Fake News
                        <br />
                        Portal
                    </span>

                </div>


                <nav>

                    <Link to="/dashboard">

                        <DashboardIcon />

                        <span>
                            Dashboard
                        </span>

                    </Link>


                    <Link
                        to="/check-news"
                        className="active"
                    >

                        <SearchIcon />

                        <span>
                            Check News
                        </span>

                    </Link>


                    <Link to="/history">

                        <HistoryIcon />

                        <span>
                            History
                        </span>

                    </Link>


                    <Link to="/profile">

                        <UserIcon />

                        <span>
                            Profile
                        </span>

                    </Link>


                    <Link to="/about">

                        <InfoIcon />

                        <span>
                            About
                        </span>

                    </Link>

                </nav>


                <button
                    className="logout"
                    onClick={handleLogout}
                >

                    <LogoutIcon />

                    <span>
                        Logout
                    </span>

                </button>

            </aside>


            {/* Main Content */}

            <main className="dashboard-main">


                {/* Header */}

                <header className="dashboard-header">

                    <div>

                        <h1>
                            Check News
                        </h1>

                        <p>
                            Analyze a news article using
                            our AI detection model.
                        </p>

                    </div>


                    <div className="user-info">

                        <UserIcon />

                        <span>
                            {userName}
                        </span>

                    </div>

                </header>


                {/* Analysis Input */}

                <section className="news-card">

                    <div className="news-card-header">

                        <div className="news-card-icon">
                            <ArticleIcon />
                        </div>

                        <div>

                            <h2>
                                Analyze News Article
                            </h2>

                            <p>
                                Paste the complete news article
                                below for AI-powered analysis.
                            </p>

                        </div>

                    </div>


                    <textarea
                        className="news-input"
                        placeholder="Paste your news article here..."
                        value={news}
                        onChange={(e) =>
                            setNews(e.target.value)
                        }
                    />


                    <div className="news-card-footer">

                        <span>
                            {news.length} characters
                        </span>


                        <button
                            className="analyze-btn"
                            onClick={checkNews}
                            disabled={loading}
                        >

                            <SearchIcon />

                            {loading
                                ? "Analyzing..."
                                : "Analyze News"
                            }

                        </button>

                    </div>

                </section>


                {/* Analysis Result */}

                {result && (

                    <section className="analysis-card">

                        <div className="analysis-header">

                            <div>

                                <span className="result-label">
                                    AI ANALYSIS RESULT
                                </span>

                                <h2>
                                    Detection Result
                                </h2>

                            </div>


                            <div
                                className={
                                    result.result === "FAKE NEWS"
                                        ? "result-icon fake"
                                        : "result-icon real"
                                }
                            >

                                {result.result === "FAKE NEWS"
                                    ? <FakeIcon />
                                    : <CheckIcon />
                                }

                            </div>

                        </div>


                        <div
                            className={
                                result.result === "FAKE NEWS"
                                    ? "result fake"
                                    : "result real"
                            }
                        >

                            {result.result}

                        </div>


                        <div className="analysis-details">

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


                        <div className="analysis-disclaimer">

                            <InfoIcon />

                            <p>
                                This prediction is generated
                                by a machine learning model.
                                It should be used as an analytical
                                aid and not as a guaranteed fact.
                            </p>

                        </div>

                    </section>

                )}

            </main>

        </div>

    );
}

export default CheckNews;