import { Link } from "react-router-dom";

function Profile() {

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

                    <Link to="/profile" className="active">
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

                        <h1>My Profile</h1>

                        <p>
                            Manage your account information.
                        </p>

                    </div>

                    <div className="user-info">
                        👤 Reena
                    </div>

                </header>


                {/* Profile */}

                <section className="profile-page-card">

                    <div className="profile-header">

                        <div className="large-profile-icon">
                            👤
                        </div>

                        <div>
                            <h2>Reena</h2>
                            <p>Fake News Portal User</p>
                        </div>

                    </div>


                    <div className="profile-details">

                        <div className="profile-detail">
                            <span>Full Name</span>
                            <strong>Reena</strong>
                        </div>

                        <div className="profile-detail">
                            <span>Email</span>
                            <strong>user@example.com</strong>
                        </div>

                        <div className="profile-detail">
                            <span>Account Type</span>
                            <strong>Standard User</strong>
                        </div>

                        <div className="profile-detail">
                            <span>Member Since</span>
                            <strong>September 2026</strong>
                        </div>

                    </div>


                    <button className="edit-profile-btn">
                        ✏️ Edit Profile
                    </button>

                </section>

            </main>

        </div>
    );
}

export default Profile;