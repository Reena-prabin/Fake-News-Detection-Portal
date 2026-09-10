import { Link } from "react-router-dom";

function About() {

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

                    <Link to="/history">
                        📜 History
                    </Link>

                    <Link to="/profile">
                        👤 Profile
                    </Link>

                    <Link to="/about" className="active">
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

                        <h1>About the Project</h1>

                        <p>
                            Learn more about our Fake News Detection Portal.
                        </p>

                    </div>

                    <div className="user-info">
                        👤 Reena
                    </div>

                </header>


                {/* Introduction */}

                <section className="about-card">

                    <div className="about-icon">
                        🛡️
                    </div>

                    <h2>Fake News Detection Portal</h2>

                    <p>
                        Fake News Detection Portal is an AI-powered
                        web application designed to analyze news
                        articles and predict whether they are likely
                        to be real or fake.
                    </p>

                    <p>
                        The system uses Machine Learning to analyze
                        the textual patterns in a news article and
                        provide a prediction along with a confidence
                        score.
                    </p>

                </section>


                {/* How it Works */}

                <section className="about-card">

                    <h2>⚙️ How It Works</h2>

                    <div className="steps">

                        <div className="step">
                            <span>1</span>

                            <div>
                                <h3>Enter News</h3>

                                <p>
                                    The user enters or pastes a news
                                    article into the Check News page.
                                </p>
                            </div>
                        </div>


                        <div className="step">
                            <span>2</span>

                            <div>
                                <h3>AI Analysis</h3>

                                <p>
                                    The article is sent to our Python
                                    Machine Learning service for analysis.
                                </p>
                            </div>
                        </div>


                        <div className="step">
                            <span>3</span>

                            <div>
                                <h3>Prediction</h3>

                                <p>
                                    The model predicts whether the
                                    article is likely to be real or fake.
                                </p>
                            </div>
                        </div>


                        <div className="step">
                            <span>4</span>

                            <div>
                                <h3>Save Result</h3>

                                <p>
                                    The prediction and confidence score
                                    are stored in MongoDB for future reference.
                                </p>
                            </div>
                        </div>

                    </div>

                </section>


                {/* Technologies */}

                <section className="about-card">

                    <h2>💻 Technologies Used</h2>

                    <div className="technology-grid">

                        <div className="technology">
                            <strong>React.js</strong>
                            <span>Frontend</span>
                        </div>

                        <div className="technology">
                            <strong>Node.js</strong>
                            <span>Backend Runtime</span>
                        </div>

                        <div className="technology">
                            <strong>Express.js</strong>
                            <span>Backend API</span>
                        </div>

                        <div className="technology">
                            <strong>MongoDB</strong>
                            <span>Database</span>
                        </div>

                        <div className="technology">
                            <strong>Python</strong>
                            <span>Machine Learning</span>
                        </div>

                        <div className="technology">
                            <strong>FastAPI</strong>
                            <span>AI API</span>
                        </div>

                        <div className="technology">
                            <strong>Scikit-learn</strong>
                            <span>ML Library</span>
                        </div>

                        <div className="technology">
                            <strong>TF-IDF</strong>
                            <span>Text Feature Extraction</span>
                        </div>

                    </div>

                </section>


                {/* Architecture */}

                <section className="about-card">

                    <h2>🏗️ System Architecture</h2>

                    <div className="architecture">

                        <div className="architecture-box">
                            👤
                            <strong>User</strong>
                        </div>

                        <span>→</span>

                        <div className="architecture-box">
                            ⚛️
                            <strong>React</strong>
                        </div>

                        <span>→</span>

                        <div className="architecture-box">
                            🟢
                            <strong>Node / Express</strong>
                        </div>

                        <span>→</span>

                        <div className="architecture-box">
                            🐍
                            <strong>Python AI</strong>
                        </div>

                        <span>→</span>

                        <div className="architecture-box">
                            🍃
                            <strong>MongoDB</strong>
                        </div>

                    </div>

                </section>


                {/* Disclaimer */}

                <section className="about-disclaimer">

                    ⚠️ <strong>Important:</strong> The prediction
                    provided by this system is generated by a
                    Machine Learning model. It should be treated as
                    an indication rather than a guaranteed determination
                    of whether information is true or false.

                </section>

            </main>

        </div>
    );
}

export default About;