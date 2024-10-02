import { Link } from "react-router-dom";

export default function AccountNavigation() {
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
