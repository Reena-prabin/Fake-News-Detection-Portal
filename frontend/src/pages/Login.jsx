import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function MailIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 5h16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2Z" />
            <path d="m4 7 8 6 8-6" />
        </svg>
    );
}

function LockIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
    );
}

function EyeIcon({ hidden }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            {hidden ? (
                <>
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                    <path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c5 0 8.5 4 9.5 6a11.5 11.5 0 0 1-3.1 3.5" />
                    <path d="M6.6 6.6C4.5 8 3.2 10 2.5 11.5 3.5 13.5 7 18 12 18c1.1 0 2.1-.2 3-.5" />
                </>
            ) : (
                <>
                    <path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                    <circle cx="12" cy="12" r="2.5" />
                </>
            )}
        </svg>
    );
}

function ShieldIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3 20 6v5c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6l8-3Z" />
            <path d="m8.5 12 2.2 2.2 4.8-5" />
        </svg>
    );
}

function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            alert("Please enter your email and password.");
            return;
        }

        // Temporary navigation
        // Real authentication will be connected next.
        navigate("/dashboard");
    };

    return (
        <div className="login-page">

            <div className="login-background">
                <div className="login-glow glow-one"></div>
                <div className="login-glow glow-two"></div>
            </div>

            <div className="login-wrapper">

                {/* LEFT SECTION */}

                <section className="login-intro">

                    <div className="portal-brand">

                        <div className="portal-mark">
                            <ShieldIcon />
                        </div>

                        <div>
                            <span>FAKE NEWS</span>
                            <strong>DETECTION PORTAL</strong>
                        </div>

                    </div>

                    <div className="intro-content">

                        <p className="eyebrow">
                            INTELLIGENT NEWS ANALYSIS
                        </p>

                        <h1>
                            Identify misinformation
                            <span>with confidence.</span>
                        </h1>

                        <p className="intro-text">
                            Analyze news articles using machine learning
                            and get an instant prediction with a confidence
                            score.
                        </p>

                        <div className="intro-line"></div>

                        <div className="intro-stats">

                            <div>
                                <strong>AI</strong>
                                <span>Powered Analysis</span>
                            </div>

                            <div>
                                <strong>ML</strong>
                                <span>Text Classification</span>
                            </div>

                            <div>
                                <strong>24/7</strong>
                                <span>Accessible</span>
                            </div>

                        </div>

                    </div>

                    <p className="intro-footer">
                        AI-powered credibility analysis platform
                    </p>

                </section>


                {/* RIGHT SECTION */}

                <section className="login-panel">

                    <div className="login-panel-inner">

                        <div className="login-heading">

                            <div className="login-shield">
                                <ShieldIcon />
                            </div>

                            <div>
                                <h2>Welcome back</h2>
                                <p>
                                    Sign in to access your dashboard
                                </p>
                            </div>

                        </div>


                        <form onSubmit={handleLogin}>

                            <div className="login-field">

                                <label htmlFor="email">
                                    Email address
                                </label>

                                <div className="login-input">

                                    <MailIcon />

                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />

                                </div>

                            </div>


                            <div className="login-field">

                                <div className="password-label">

                                    <label htmlFor="password">
                                        Password
                                    </label>

                                    <a href="#">
                                        Forgot password?
                                    </a>

                                </div>

                                <div className="login-input">

                                    <LockIcon />

                                    <input
                                        id="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />

                                    <button
                                        type="button"
                                        className="eye-button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        <EyeIcon
                                            hidden={showPassword}
                                        />
                                    </button>

                                </div>

                            </div>


                            <label className="remember-row">

                                <input type="checkbox" />

                                <span>
                                    Remember me
                                </span>

                            </label>


                            <button
                                type="submit"
                                className="login-submit"
                            >
                                <span>Sign in</span>

                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M5 12h14" />
                                    <path d="m13 6 6 6-6 6" />
                                </svg>

                            </button>

                        </form>


                        <div className="login-divider">
                            <span>New to the portal?</span>
                        </div>


                        <Link
                            to="/register"
                            className="create-account"
                        >
                            Create an account
                        </Link>


                        <p className="security-note">
                            <ShieldIcon />
                            Your account information is securely protected.
                        </p>

                    </div>

                </section>

            </div>

            <p className="login-copyright">
                © 2026 Fake News Detection Portal
            </p>

        </div>
    );
}

export default Login;