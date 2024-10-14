import { Link, useLocation } from "react-router-dom";
import { MdOutlineAccountCircle } from "react-icons/md"
import { IoSpeedometerOutline } from "react-icons/io5"
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaCalendar, FaI, FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function KanbasNavigation() {
    const { pathname } = useLocation();
    const links = [
        { label: "Dashboard", path: "/Kanbas/Dashboard", icon: IoSpeedometerOutline },
        { label: "Courses", path: "/Kanbas/Dashboard", icon: LiaBookSolid },
        { label: "Calendar", path: "/Kanbas/Calendar", icon: FaCalendar },
        { label: "Inbox", path: "/Kanbas/Inbox", icon: FaInbox },
        { label: "Labs", path: "/Labs", icon: LiaCogSolid },
    ];

    return (
        <div id="wd-kanbas-navigation" style={{ width: 120 }}
            className="border-0 list-group rounded-0 bg-black position-fixed bottom-0 top-0 z-2 d-none d-md-block">

            <a className="border-0 text-center bg-black text-white list-group-item" href="https://www.northeastern.edu/" id="wd-neu-link" target="_blank">
                <img style={{ width: "80px", height: "85px", margin: "0 auto" }} src="./images/northeastern_logo.png" alt="Northeastern University Logo" /></a>
            
            <Link to="/Kanbas/Account" className={`list-group-item text-center border-0 bg-black
            ${pathname.includes("Account") ? "bg-white text-danger" : "bg-black text-white"}`}>
                <FaRegCircleUser className={`fs-1 ${pathname.includes("Account") ? "text-danger" : "text-white"}`} />
                <br />
                Account
            </Link>
            
            {links.map((link) => (
                <Link key={link.label} to={link.path} className={`list-group-item bg-black text-center border-0
              ${pathname.includes(link.label) ? "text-danger bg-white" : "text-white bg-black"}`}>
                    {link.icon({ className: "fs-1 text-danger" })}
                    <br />
                    {link.label}
                </Link>
            ))}

        </div>
    );
}
