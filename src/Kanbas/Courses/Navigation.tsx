import { Link } from "react-router-dom";

export default function CoursesNavigation() {
    return (
        <div className="wd list-group rounded-0 fs-5 d-none d-md-block" id="wd-courses-navigation">
            <Link className="list-group-item border-0 active" id="wd-course-home-link" to="/Kanbas/Courses/1234/Home">
                Home
            </Link>
            <Link className="list-group-item border-0 text-danger" id="wd-course-modules-link" to="/Kanbas/Courses/1234/Modules">
                Modules
            </Link>
            <Link className="list-group-item border-0 text-danger" id="wd-course-piazza-link" to="/Kanbas/Courses/1234/Piazza">
                Piazza</Link>
            <Link className="list-group-item border-0 text-danger" id="wd-course-zoom-link" to="/Kanbas/Courses/1234/Zoom">
                Zoom</Link>
            <Link className="list-group-item border-0 text-danger" id="wd-course-quizzes-link" to="/Kanbas/Courses/1234/Assignments">
                Assignments</Link>
            <Link className="list-group-item border-0 text-danger" id="wd-course-assignments-link" to="/Kanbas/Courses/1234/Quizzes">
                Quizzes</Link>
            <Link className="list-group-item border-0 text-danger" id="wd-course-grades-link" to="/Kanbas/Courses/1234/Grades">
                Grades</Link>
            <Link className="list-group-item border-0 text-danger" id="wd-course-people-link" to="/Kanbas/Courses/1234/People">
                People</Link>
        </div>
    );
}
