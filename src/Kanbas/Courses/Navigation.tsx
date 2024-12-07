import { Link, useLocation, useParams } from "react-router-dom";

export default function CoursesNavigation() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <div
      className="wd list-group rounded-0 fs-5 d-none d-md-block"
      id="wd-courses-navigation"
    >
      {links.map((link) => (
        <Link
          key={link}
          className={`list-group-item border-0 text-danger
                ${pathname.includes(link) ? "active text-black" : ""}`}
          id={`wd-course-${link}-link`}
          to={`/Kanbas/Courses/${cid}/${link}`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
