import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as client from "./client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };
  const fetchProfile = () => {
    if (!currentUser) return navigate("/Kanbas/Account/Signin");
    setProfile(currentUser);
  };
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div id="wd-profile-screen" className="d-flex">
      <div className="p-3" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="mb-2">Profile</h3>
        {profile && (
          <div>
            <input
              defaultValue={profile.username}
              id="wd-username"
              className="form-control mb-2"
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
            />
            <input
              defaultValue={profile.password}
              id="wd-password"
              className="form-control mb-2"
              onChange={(e) =>
                setProfile({ ...profile, password: e.target.value })
              }
            />
            <input
              defaultValue={profile.firstName}
              id="wd-firstname"
              className="form-control mb-2"
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
            />
            <input
              defaultValue={profile.lastName}
              id="wd-lastname"
              className="form-control mb-2"
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
            />
            <input
              defaultValue={profile.dob}
              id="wd-dob"
              className="form-control mb-2"
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
              type="date"
            />
            <input
              defaultValue={profile.email}
              id="wd-email"
              className="form-control mb-2"
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
            <select
              defaultValue={currentUser?.role || "USER"}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              className="form-control mb-2"
              id="wd-role"
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
              <option value="FACULTY">FACULTY</option>
              <option value="STUDENT">STUDENT</option>
            </select>
            <button
              onClick={updateProfile}
              className="btn btn-primary w-100 mb-2"
            >
              {" "}
              Update{" "}
            </button>
            <button
              onClick={signout}
              className="btn btn-danger w-100 mb-2"
              id="wd-signout-btn"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
