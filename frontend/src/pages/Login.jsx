import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function MailIcon() {
    return (
        <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
        </svg>
    );
}

function LockIcon() {
    return (
        <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <rect x="5" y="10" width="14" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 018 0v3" />
        </svg>
    );
}

function EyeIcon({ open }) {
    return open ? (
        <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    ) : (
        <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M3 3l18 18" />
            <path d="M10.6 5.2A9.8 9.8 0 0112 5c6.5 0 10 7 10 7a18 18 0 01-3.1 4.2" />
            <path d="M6.6 6.6C3.6 8.5 2 12 2 12s3.5 7 10 7c1.8 0 3.3-.5 4.7-1.2" />
            <path d="M9.9 9.9a3 3 0 004.2 4.2" />
        </svg>
    );
}

function ShieldIcon() {
    return (
        <svg
            width="30"
            height="30"
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

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);


    const handleLogin = async (e) => {

        e.preventDefault();


        if (!email || !password) {

            alert("Please enter your email and password.");

            return;
        }


        setLoading(true);


        try {

            const response = await fetch(
                "http://localhost:5000/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                alert(
                    data.error ||
                    "Invalid email or password"
                );

                setLoading(false);

                return;
            }


            // ===============================
            // Store JWT Token
            // ===============================

            localStorage.setItem(
                "token",
                data.token
            );


            // ===============================
            // Store User Information
            // ===============================

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            // ===============================
            // Login Successful
            // ===============================

            alert("Login successful!");


            navigate("/dashboard");


        } catch (error) {

            console.log(
                "Login error:",
                error
            );

            alert(
                "Unable to connect to backend."
            );

        }


        setLoading(false);
    };


    return (

        <div className="login-page">

            <div className="login-wrapper">


                {/* LEFT SIDE */}

                <div className="login-intro">

                    <div className="portal-brand">

                        <div className="brand-icon">
                            <ShieldIcon />
                        </div>

                        <div>

                            <h2>
                                Fake News Portal
                            </h2>

                            <p>
                                AI-powered news verification
                            </p>

                        </div>

                    </div>


                    <div className="login-intro-content">

                        <span className="intro-label">
                            WELCOME BACK
                        </span>

                        <h1>
                            Stay informed.
                            <br />
                            <span>
                                Know what to trust.
                            </span>
                        </h1>

                        <p>
                            Sign in to analyze news articles,
                            review your prediction history,
                            and make more informed decisions
                            with AI-powered detection.
                        </p>

                    </div>


                    <div className="login-stats">

                        <div>

                            <strong>
                                98%
                            </strong>

                            <span>
                                Model Accuracy
                            </span>

                        </div>


                        <div>

                            <strong>
                                24/7
                            </strong>

                            <span>
                                AI Analysis
                            </span>

                        </div>


                        <div>

                            <strong>
                                Secure
                            </strong>

                            <span>
                                Authentication
                            </span>

                        </div>

                    </div>

                </div>


                {/* RIGHT SIDE */}

                <div className="login-panel">

                    <div className="login-panel-header">

                        <h1>
                            Sign in
                        </h1>

                        <p>
                            Enter your account details to continue.
                        </p>

                    </div>


                    <form onSubmit={handleLogin}>


                        {/* EMAIL */}

                        <div className="login-field">

                            <label htmlFor="email">
                                Email address
                            </label>

                            <div className="login-input-wrapper">

                                <MailIcon />

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                />

                            </div>

                        </div>


                        {/* PASSWORD */}

                        <div className="login-field">

                            <label htmlFor="password">
                                Password
                            </label>

                            <div className="login-input-wrapper">

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
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                >

                                    <EyeIcon
                                        open={showPassword}
                                    />

                                </button>

                            </div>

                        </div>


                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            className="login-submit"
                            disabled={loading}
                        >

                            {loading
                                ? "Signing in..."
                                : "Sign in"
                            }

                        </button>


                    </form>


                    {/* CREATE ACCOUNT */}

                    <div className="login-divider">

                        <span>
                            New to the portal?
                        </span>

                    </div>


                    <Link
                        to="/register"
                        className="create-account"
                    >
                        Create a new account
                    </Link>


                    {/* SECURITY MESSAGE */}

                    <p className="login-security">

                        <ShieldIcon />

                        Your credentials are securely
                        processed by the application.

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;