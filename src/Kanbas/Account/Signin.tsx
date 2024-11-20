import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
// import * as db from "../Database";
import * as client from "./client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signin = async () => {
    const user = await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/Kanbas/Dashboard");
  };

  return (
    <div id="wd-signin-screen" className="d-flex">
      <div className="p-3" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="mb-2">Signin</h3>

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
            onClick={signin}
            id="wd-signin-btn"
            className="btn btn-primary w-100"
          >
            {" "}
            Sign in{" "}
          </button>
        </div>

        <div className="mt-2">
          <Link
            id="wd-signup-link"
            className="text-primary"
            to="/Kanbas/Account/Signup"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
