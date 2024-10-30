import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();

  return (
    <div className="wd list-group rounded-0 fs-5 d-none d-md-block" id="wd-account-navigation">
      <Link className="list-group-item border-0 active" to={`/Kanbas/Account/Signin`}>
        Signin
      </Link>
      <Link className="list-group-item border-0 text-danger" to={`/Kanbas/Account/Signup`}>
        Signup
      </Link>
      <Link className="list-group-item border-0 text-danger" to={`/Kanbas/Account/Profile`}>
        Profile
      </Link>
    </div>
  );
}
