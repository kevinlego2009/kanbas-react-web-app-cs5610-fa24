import { Link } from "react-router-dom";
import { MdOutlineAccountCircle } from "react-icons/md"
import { IoSpeedometerOutline } from "react-icons/io5"
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaCalendar, FaI, FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function KanbasNavigation() {
    return (
        <div id="wd-kanbas-navigation" style={{ width: 120 }}
            className="border-0 list-group rounded-0 bg-black position-fixed bottom-0 top-0 z-2 d-none d-md-block">
            <a className="border-0 text-center bg-black text-white list-group-item" href="https://www.northeastern.edu/" id="wd-neu-link" target="_blank">
                <img style={{ width: "80px", height: "85px", margin: "0 auto" }} src="./images/northeastern_logo.png" alt="Northeastern University Logo" /></a>
            <Link className="border-0 text-center bg-black text-white list-group-item" to="/Kanbas/Account" id="wd-account-link">
                <MdOutlineAccountCircle className="fs-1 text-white" />
                <br />Account
            </Link>
            <Link className="border-0 text-center bg-white text-danger list-group-item" to="/Kanbas/Dashboard" id="wd-dashboard-link">
                <IoSpeedometerOutline className="fs-1 text-danger" />
                <br />Dashboard
            </Link>
            <Link className="border-0 text-center bg-black text-white list-group-item" to="/Kanbas/Courses" id="wd-course-link">
                <LiaBookSolid className="fs-1 text-danger" />
                <br />Courses
            </Link>
            <Link className="border-0 text-center bg-black text-white list-group-item" to="/Kanbas/Calendar" id="wd-calendar-link">
                <FaCalendar className="fs-1 text-danger" />
                <br />Calendar
            </Link>
            <Link className="border-0 text-center bg-black text-white list-group-item" to="/Kanbas/Inbox" id="wd-inbox-link">
                <FaInbox className="fs-1 text-danger" />
                <br />Inbox
            </Link>
            <Link className="border-0 text-center bg-black text-white list-group-item" to="/Labs" id="wd-labs-link">
                <LiaCogSolid className="fs-1 text-danger" />
                <br />Labs
            </Link>
        </div>
    );
}
