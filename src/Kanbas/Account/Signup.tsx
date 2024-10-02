import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
    return (
        <div id="wd-signup-screen" className="d-flex">
            <div className="p-3" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="mb-2">Signup</h3>

                <div className="mb-1">
                    <input
                        id="wd-username"
                        className="form-control"
                        placeholder="username"
                    />
                </div>

                <div className="mb-1">
                    <input
                        id="wd-password"
                        className="form-control"
                        placeholder="password"
                        type="password"
                    />
                </div>

                <div className="d-grid gap-2">
                    <Link id="wd-signup-btn" className="btn btn-primary" to="/Kanbas/Account/Profile">
                        Signup
                    </Link>
                </div>

                <div className="mt-2">
                    <Link id="wd-signin-link" className="text-primary" to="/Kanbas/Account/Signin">
                        Signin
                    </Link>
                </div>
            </div>
        </div>
    );
}
