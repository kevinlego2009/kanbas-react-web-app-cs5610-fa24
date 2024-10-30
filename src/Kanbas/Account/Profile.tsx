import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const fetchProfile = () => {
        if (!currentUser) return navigate("/Kanbas/Account/Signin");
        setProfile(currentUser);
    };
    const signout = () => {
        dispatch(setCurrentUser(null));
        navigate("/Kanbas/Account/Signin");
    };
    useEffect(() => { fetchProfile(); }, []);

    //     return (
    //         <div id="wd-profile-screen" className="d-flex">
    //             <div className="p-3" style={{ maxWidth: "400px", width: "100%" }}>
    //                 <h3 className="mb-2">Profile</h3>

    //                 <div className="mb-1">
    //                     <input id="wd-username"
    //                         className="form-control"
    //                         value="alice"
    //                         placeholder="username" />
    //                 </div>
    //                 <div className="mb-1">
    //                     <input id="wd-password"
    //                         className="form-control"
    //                         value="123"
    //                         placeholder="password" />
    //                 </div>
    //                 <div className="mb-1">
    //                     <input id="wd-firstname"
    //                         className="form-control"
    //                         value="Alice"
    //                         placeholder="First name" />
    //                 </div>
    //                 <div className="mb-1">
    //                     <input id="wd-lastname"
    //                         className="form-control"
    //                         value="Wonderland"
    //                         placeholder="Last name" />
    //                 </div>
    //                 <div className="mb-1">
    //                     <input id="wd-dob"
    //                         className="form-control"
    //                         type="date" />
    //                 </div>
    //                 <div className="mb-1">
    //                     <input id="wd-email"
    //                         className="form-control"
    //                         value="alice@wonderland.com"
    //                         type="email" />
    //                 </div>
    //                 <div className="mb-1">
    //                     <input id="wd-role"
    //                         className="form-control"
    //                         value="User" />
    //                 </div>

    //                 <div className="d-grid gap-2">
    //                     <Link id="wd-signout-btn" className="btn btn-danger" to="/Kanbas/Account/Signin">
    //                         Signout
    //                     </Link>
    //                 </div>

    //             </div>
    //         </div>
    //     );
    // }
    return (
        <div id="wd-profile-screen" className="d-flex">
            <div className="p-3" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="mb-2">Profile</h3>
                {profile && (
                    <div>
                        <input defaultValue={profile.username} id="wd-username" className="form-control mb-2"
                            onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
                        <input defaultValue={profile.password} id="wd-password" className="form-control mb-2"
                            onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
                        <input defaultValue={profile.firstName} id="wd-firstname" className="form-control mb-2"
                            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
                        <input defaultValue={profile.lastName} id="wd-lastname" className="form-control mb-2"
                            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
                        <input defaultValue={profile.dob} id="wd-dob" className="form-control mb-2"
                            onChange={(e) => setProfile({ ...profile, dob: e.target.value })} type="date" />
                        <input defaultValue={profile.email} id="wd-email" className="form-control mb-2"
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                        <select onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                            className="form-control mb-2" id="wd-role">
                            <option value="USER">User</option>            <option value="ADMIN">Admin</option>
                            <option value="FACULTY">Faculty</option>      <option value="STUDENT">Student</option>
                        </select>
                        <button onClick={signout} className="btn btn-danger w-100 mb-2" id="wd-signout-btn">
                            Sign out
                        </button>
                    </div>
                )}
            </div>
        </div>);
}