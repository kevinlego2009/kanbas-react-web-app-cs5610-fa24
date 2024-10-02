import { Link } from "react-router-dom";

export default function Profile() {
    return (
        <div id="wd-profile-screen" className="d-flex">
            <div className="p-3" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="mb-2">Profile</h3>

                <div className="mb-1">
                    <input id="wd-username"
                        className="form-control"
                        value="alice"
                        placeholder="username" />
                </div>
                <div className="mb-1">
                    <input id="wd-password"
                        className="form-control"
                        value="123"
                        placeholder="password" />
                </div>
                <div className="mb-1">
                    <input id="wd-firstname"
                        className="form-control"
                        value="Alice"
                        placeholder="First name" />
                </div>
                <div className="mb-1">
                    <input id="wd-lastname"
                        className="form-control"
                        value="Wonderland"
                        placeholder="Last name" />
                </div>
                <div className="mb-1">
                    <input id="wd-dob"
                        className="form-control"
                        type="date" />
                </div>
                <div className="mb-1">
                    <input id="wd-email"
                        className="form-control"
                        value="alice@wonderland.com"
                        type="email" />
                </div>
                <div className="mb-1">
                    <input id="wd-role"
                        className="form-control"
                        value="User" />
                </div>

                <div className="d-grid gap-2">
                    <Link id="wd-signout-btn" className="btn btn-danger" to="/Kanbas/Account/Signin">
                        Signout
                    </Link>
                </div>

            </div>
        </div>
    );
}
