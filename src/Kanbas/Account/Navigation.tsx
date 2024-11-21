import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();

  return (
    <div
      className="wd list-group rounded-0 fs-5 d-none d-md-block"
      id="wd-account-navigation"
    >
      <Link
        className={`list-group-item border-0 text-danger ${
          pathname.includes("Signin") ? "active text-black" : ""
        }`}
        to={currentUser ? `/Kanbas/Account/Profile` : `/Kanbas/Account/Signin`}
      >
        Signin
      </Link>
      <Link
        className={`list-group-item border-0 text-danger ${
          pathname.includes("Signup") ? "active text-black" : ""
        }`}
        to={currentUser ? `/Kanbas/Account/Profile` : `/Kanbas/Account/Signup`}
      >
        Signup
      </Link>
      <Link
        className={`list-group-item border-0 text-danger ${
          pathname.includes("Profile") ? "active text-black" : ""
        }`}
        to={`/Kanbas/Account/Profile`}
      >
        Profile
      </Link>
    </div>
  );
}
