import { Navigate, Route, Routes } from "react-router";
import CoursesNavigation from "./Navigation";

export default function Courses() {
    return (
        <div id="wd-courses">
            <h2>Course 1234</h2>
            <table>
                <tbody>
                    <tr>
                        <td valign="top">
                            <CoursesNavigation />
                        </td>
                        <td valign="top">
                            <Routes>
                                <Route path="/" element={<Navigate to="Home" />} />
                                <Route path="/Home" element={<h2>Home</h2>} />
                                <Route path="/Modules" element={<h2>Modules</h2>} />
                                <Route path="/Piazza" element={<h2>Piazza</h2>} />
                                <Route path="/Zoom" element={<h2>Zoom</h2>} />
                                <Route path="/Assignments" element={<h2>Assignments</h2>} />
                                <Route path="/Assignments/:aid" element={<h2>Assignment Editor</h2>} />
                                <Route path="/Quizzes" element={<h2>Quizzes</h2>} />
                                <Route path="/Grades" element={<h2>Grades</h2>} />
                                <Route path="/People" element={<h2>People</h2>} />
                            </Routes>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
