import { Link } from "react-router-dom";

function Dashboard() {
    return (
        <div className="dashboard-layout">

            {/* Sidebar */}

            <aside className="sidebar">

                <div className="logo">
                    🛡️
                    <span>Fake News<br />Portal</span>
                </div>

                <nav>

                    <Link to="/dashboard" className="active">
                        🏠 Dashboard
                    </Link>

                    <Link to="/check-news">
                        🔍 Check News
                    </Link>

                    <Link to="/history">
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
                        <h1>Dashboard</h1>
                        <p>Welcome back! Here's your news analysis overview.</p>
                    </div>

                    <div className="user-info">
                        👤 Reena
                    </div>

                </header>


                {/* Welcome Section */}

                <section className="welcome-card">

                    <div>
                        <h2>Welcome to Fake News Detection Portal 👋</h2>

                        <p>
                            Analyze news articles using our AI-powered
                            detection system and identify potentially
                            misleading information.
                        </p>
                    </div>

                    <Link to="/check-news">
                        <button>🔍 Check News</button>
                    </Link>

                </section>


                {/* Statistics */}

                <section className="stats">

                    <div className="stat-card">
                        <div className="stat-icon">📰</div>
                        <div>
                            <p>Total Predictions</p>
                            <h2>25</h2>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">✅</div>
                        <div>
                            <p>Real News</p>
                            <h2>14</h2>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">❌</div>
                        <div>
                            <p>Fake News</p>
                            <h2>11</h2>
                        </div>
                    </div>

                </section>


                {/* Quick Actions */}

                <section className="dashboard-section">

                    <h2>Quick Actions</h2>

                    <div className="quick-actions">

                        <Link to="/check-news">
                            <div className="action-card">
                                <span>🔍</span>
                                <h3>Analyze News</h3>
                                <p>
                                    Check an article using our AI model.
                                </p>
                            </div>
                        </Link>

                        <Link to="/history">
                            <div className="action-card">
                                <span>📜</span>
                                <h3>View History</h3>
                                <p>
                                    View your previous predictions.
                                </p>
                            </div>
                        </Link>

                        <Link to="/about">
                            <div className="action-card">
                                <span>ℹ️</span>
                                <h3>Learn More</h3>
                                <p>
                                    Learn how our AI system works.
                                </p>
                            </div>
                        </Link>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Dashboard;