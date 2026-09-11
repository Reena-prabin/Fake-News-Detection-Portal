import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


// ===============================
// Icons
// ===============================

function ShieldIcon() {
    return (
        <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <path d="M12 3l7 3v5c0 4.8-3 8.5-7 10-4-1.5-7-5.2-7-10V6l7-3z" />
            <path d="M9 12l2 2 4-4" />
        </svg>
    );
}


function DashboardIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
    );
}


function SearchIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
        </svg>
    );
}


function HistoryIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <path d="M3 12a9 9 0 109-9c-2.4 0-4.6.9-6.2 2.5L3 7" />
            <path d="M3 3v4h4" />
            <path d="M12 7v5l3 2" />
        </svg>
    );
}


function UserIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 20c.8-3.5 3.2-5.5 7-5.5s6.2 2 7 5.5" />
        </svg>
    );
}


function InfoIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 10v6" />
            <circle cx="12" cy="7" r=".7" fill="currentColor" />
        </svg>
    );
}


function LogoutIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <path d="M10 5H5v14h5" />
            <path d="M14 8l4 4-4 4" />
            <path d="M18 12H9" />
        </svg>
    );
}


function NewsIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
        >
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
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <circle cx="12" cy="12" r="9" />
            <path d="M8 12l2.5 2.5L16 9" />
        </svg>
    );
}


function FakeIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <circle cx="12" cy="12" r="9" />
            <path d="M8.5 8.5l7 7" />
            <path d="M15.5 8.5l-7 7" />
        </svg>
    );
}


function ArrowIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <path d="M5 12h13" />
            <path d="M13 7l5 5-5 5" />
        </svg>
    );
}


// ===============================
// Dashboard
// ===============================

function Dashboard() {

    const [stats, setStats] = useState({
        totalPredictions: 0,
        realNews: 0,
        fakeNews: 0
    });


    // Get logged-in user

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const userName = user ? user.name : "User";


    // ===============================
    // Get Dashboard Statistics
    // ===============================

    useEffect(() => {

        const fetchStats = async () => {

            try {

                const response = await fetch(
                    "http://localhost:5000/stats"
                );


                const data = await response.json();


                if (response.ok) {

                    setStats(data);

                }

            } catch (error) {

                console.log(
                    "Unable to fetch statistics:",
                    error
                );

            }

        };


        fetchStats();

    }, []);


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

                    <Link
                        to="/dashboard"
                        className="active"
                    >
                        <DashboardIcon />
                        <span>
                            Dashboard
                        </span>
                    </Link>


                    <Link to="/check-news">

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


                <Link
                    to="/login"
                    className="logout"
                >

                    <LogoutIcon />

                    <span>
                        Logout
                    </span>

                </Link>

            </aside>


            {/* Main Content */}

            <main className="dashboard-main">

                <header className="dashboard-header">

                    <div>

                        <h1>
                            Dashboard
                        </h1>

                        <p>
                            Welcome back. Here's your
                            news analysis overview.
                        </p>

                    </div>


                    <div className="user-info">

                        <UserIcon />

                        <span>
                            {userName}
                        </span>

                    </div>

                </header>


                {/* Welcome Section */}

                <section className="welcome-card">

                    <div>

                        <span className="welcome-label">
                            AI-POWERED VERIFICATION
                        </span>

                        <h2>
                            Welcome to Fake News
                            Detection Portal
                        </h2>

                        <p>
                            Analyze news articles using our
                            AI-powered detection system and
                            identify potentially misleading
                            information.
                        </p>

                    </div>


                    <Link to="/check-news">

                        <button>

                            Check News

                            <ArrowIcon />

                        </button>

                    </Link>

                </section>


                {/* Statistics */}

                <section className="stats">

                    <div className="stat-card">

                        <div className="stat-icon">

                            <NewsIcon />

                        </div>

                        <div>

                            <p>
                                Total Predictions
                            </p>

                            <h2>
                                {stats.totalPredictions}
                            </h2>

                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon real">

                            <CheckIcon />

                        </div>

                        <div>

                            <p>
                                Real News
                            </p>

                            <h2>
                                {stats.realNews}
                            </h2>

                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon fake">

                            <FakeIcon />

                        </div>

                        <div>

                            <p>
                                Fake News
                            </p>

                            <h2>
                                {stats.fakeNews}
                            </h2>

                        </div>

                    </div>

                </section>


                {/* Quick Actions */}

                <section className="dashboard-section">

                    <div className="section-heading">

                        <h2>
                            Quick Actions
                        </h2>

                        <p>
                            Access the main features of the portal.
                        </p>

                    </div>


                    <div className="quick-actions">


                        <Link to="/check-news">

                            <div className="action-card">

                                <div className="action-icon">
                                    <SearchIcon />
                                </div>

                                <h3>
                                    Analyze News
                                </h3>

                                <p>
                                    Check an article using
                                    our AI model.
                                </p>

                                <span className="action-arrow">
                                    <ArrowIcon />
                                </span>

                            </div>

                        </Link>


                        <Link to="/history">

                            <div className="action-card">

                                <div className="action-icon">
                                    <HistoryIcon />
                                </div>

                                <h3>
                                    View History
                                </h3>

                                <p>
                                    Review your previous
                                    predictions and results.
                                </p>

                                <span className="action-arrow">
                                    <ArrowIcon />
                                </span>

                            </div>

                        </Link>


                        <Link to="/about">

                            <div className="action-card">

                                <div className="action-icon">
                                    <InfoIcon />
                                </div>

                                <h3>
                                    Learn More
                                </h3>

                                <p>
                                    Learn how our AI detection
                                    system works.
                                </p>

                                <span className="action-arrow">
                                    <ArrowIcon />
                                </span>

                            </div>

                        </Link>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Dashboard;