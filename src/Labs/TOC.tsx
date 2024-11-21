import { Link } from "react-router-dom";
import { useLocation } from "react-router";

export default function TOC() {
  const { pathname } = useLocation();

  return (
    <ul className="nav nav-pills">
      <li>
        <Link className="nav-link" id="wd-a" to="/Labs">
          {" "}
          Labs
        </Link>
      </li>

      <li className="nav-item">
        <a
          id="wd-a1"
          href="#/Labs/Lab1"
          className={`nav-link ${pathname.includes("Lab1") ? "active" : ""}`}
        >
          Lab 1
        </a>
      </li>
      <li className="nav-item">
        <a
          id="wd-a2"
          href="#/Labs/Lab2"
          className={`nav-link ${pathname.includes("Lab2") ? "active" : ""}`}
        >
          Lab 2
        </a>
      </li>
      <li className="nav-item">
        <a
          id="wd-a3"
          href="#/Labs/Lab3"
          className={`nav-link ${pathname.includes("Lab3") ? "active" : ""}`}
        >
          Lab 3
        </a>
      </li>
      <li className="nav-item">
        <a
          id="wd-a4"
          href="#/Labs/Lab4"
          className={`nav-link ${pathname.includes("Lab4") ? "active" : ""}`}
        >
          Lab 4
        </a>
      </li>
      <li className="nav-item">
        <a
          id="wd-a5"
          href="#/Labs/Lab5"
          className={`nav-link ${pathname.includes("Lab5") ? "active" : ""}`}
        >
          Lab 5
        </a>
      </li>

      <li>
        <Link className="nav-link" id="wd-k" to="/Kanbas">
          {" "}
          Kanbas
        </Link>
      </li>
      <li>
        <a
          className="nav-link"
          id="wd-github-web"
          href="https://github.com/kevinlego2009/kanbas-react-web-app-cs5610-fa24.git"
          target="_blank"
        >
          Github_web
        </a>
      </li>
      <li>
        <a
          className="nav-link"
          id="wd-github-server"
          href="https://github.com/kevinlego2009/kanbas-node-server-app-cs5610-fa24/tree/a5-1"
          target="_blank"
        >
          Github_server
        </a>
      </li>
      <li>
        <a
          className="nav-link"
          id="wd-github-server"
          href="https://kanbas-node-server-app-cs5610-fa24-6t9t.onrender.com"
          target="_blank"
        >
          Render_server
        </a>
      </li>
    </ul>
  );
}
