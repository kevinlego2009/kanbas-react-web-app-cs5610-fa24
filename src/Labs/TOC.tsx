import { Link } from "react-router-dom";
export default function TOC() {
    return (
        <ul>
            <li><Link id="wd-a" to="/Labs"> Labs</Link></li>
            <li><Link id="wd-a1" to="/Labs/Lab1"> Lab1</Link></li>
            <li><Link id="wd-a2" to="/Labs/Lab2"> Lab2</Link></li>
            <li><Link id="wd-a3" to="/Labs/Lab3"> Lab3</Link></li>
            <li><Link id="wd-k" to="/Kanbas"> Kanbas</Link></li>
            <li><a id="wd-github" href="https://github.com/kevinlego2009/kanbas-react-web-app-cs5610-fa24.git" target="_blank">Github</a></li>
        </ul>
    );
}