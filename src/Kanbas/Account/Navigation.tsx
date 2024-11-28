import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const active = (path: string) => (pathname.includes(path) ? "active text-black" : "");
  const { pathname } = useLocation();

  return (
    <div
      className="wd list-group rounded-0 fs-5 d-none d-md-block"
      id="wd-account-navigation"
    >
      <Link
        className={`list-group-item border-0 text-danger ${active("signin")}`}
        to={currentUser ? `/Kanbas/Account/Profile` : `/Kanbas/Account/Signin`}
      >
        Signin
      </Link>
      <Link
        className={`list-group-item border-0 text-danger ${active("signup")}`}
        to={currentUser ? `/Kanbas/Account/Profile` : `/Kanbas/Account/Signup`}
      >
        Signup
      </Link>
      <Link
        className={`list-group-item border-0 text-danger ${active("Profile")}`}
        to={`/Kanbas/Account/Profile`}
      >
        Profile
      </Link>

      {currentUser && currentUser.role === "ADMIN" && (
        <Link
          to={`/Kanbas/Account/Users`}
          className={`list-group-item border-0 text-danger ${active("Users")}`}
        >
          {" "}
          Users{" "}
        </Link>
      )}
    </div>
  );
}
