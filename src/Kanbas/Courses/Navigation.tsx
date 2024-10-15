import { Link, useLocation, useParams } from "react-router-dom";

export default function CoursesNavigation() {
    const { cid } = useParams();
    const {pathname} = useLocation();
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

    return (
        <div className="wd list-group rounded-0 fs-5 d-none d-md-block" id="wd-courses-navigation">
            {/* <Link className="list-group-item border-0 active" id="wd-course-home-link" to={`/Kanbas/Courses/${cid}/Home`}>
                Home
            </Link>
            <Link className="list-group-item border-0 text-danger" id="wd-course-modules-link" to={`/Kanbas/Courses/${cid}/Modules`}>
                Modules
            </Link>
            <Link className="list-group-item border-0 text-danger" id="wd-course-piazza-link" to={`/Kanbas/Courses/${cid}/Piazza`}>
                Piazza</Link>
            <Link className="list-group-item border-0 text-danger" id="wd-course-zoom-link" to={`/Kanbas/Courses/${cid}/Zoom`}>
                Zoom</Link>
            <Link className="list-group-item border-0 text-danger" id="wd-course-quizzes-link" to={`/Kanbas/Courses/${cid}/Assignments`}>
                Assignments</Link>
            <Link className="list-group-item border-0 text-danger" id="wd-course-assignments-link" to={`/Kanbas/Courses/${cid}/Quizzes`}>
                Quizzes</Link>
            <Link className="list-group-item border-0 text-danger" id="wd-course-grades-link" to={`/Kanbas/Courses/${cid}/Grades`}>
                Grades</Link>
            <Link className="list-group-item border-0 text-danger" id="wd-course-people-link" to={`/Kanbas/Courses/${cid}/People`}>
                People</Link> */}

            {links.map((link) => (
                <Link key={link} className={`list-group-item border-0 text-danger
                ${pathname.includes(link) ? "active text-black": ""}`} 
                id={`wd-course-${link}-link`} to={`/Kanbas/Courses/${cid}/${link}`}>
                    {link}</Link>
            )
            )}
        </div>
    );
}
