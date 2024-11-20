import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Signup() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signup = async () => {
    const user = await client.signup(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/Kanbas/Account/Profile");
  };

  return (
    <div id="wd-signup-screen" className="d-flex">
      <div className="p-3" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="mb-2">Signup</h3>

        {/* <div className="mb-1">
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
          <Link
            id="wd-signup-btn"
            className="btn btn-primary"
            to="/Kanbas/Account/Profile"
          >
            Signup
          </Link>
        </div>

        <div className="mt-2">
          <Link
            id="wd-signin-link"
            className="text-primary"
            to="/Kanbas/Account/Signin"
          >
            Signin
          </Link>
        </div> */}
        <input
          defaultValue={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          className="form-control mb-2"
          placeholder="username"
          id="wd-username"
        />

        <input
          defaultValue={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          className="form-control mb-2"
          placeholder="password"
          type="password"
          id="wd-password"
        />

        <div className="d-grid gap-2">
          <button
            onClick={signup}
            id="wd-signup-btn"
            className="btn btn-primary w-100"
          >
            {" "}
            Sign up{" "}
          </button>
        </div>

        <div className="mt-2">
          <Link
            id="wd-signin-link"
            className="text-primary"
            to="/Kanbas/Account/Signin"
          >
            Signin
          </Link>
        </div>
      </div>
    </div>
  );
}
