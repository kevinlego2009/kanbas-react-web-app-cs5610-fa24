import { Link } from "react-router-dom";
// import * as db from "./Database";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { addEnrollment, deleteEnrollment } from "./reducer";
import { useEffect, useState } from "react";
import * as coursesClient from "./Courses/client";
import * as userClient from "./Account/client";
import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export default function Dashboard({
  courses,
  course,
  setCourse,
  setCourses,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrolling,
  setEnrolling,
  updateEnrollment,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  setCourses: (course: any) => void;
  addNewCourse: (courseID: any) => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  // const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

  // type Course = {
  //   _id: string;
  //   name: string;
  //   description: string;
  //   image: string;
  //   enrolled: boolean;
  // };
  // const [allCourses, setAllCourses] = useState<Course[]>([]);
  // type Enrollment = {
  //   _id: string;
  //   user: string;
  //   course: string;
  // };
  // const [allEnrollments, setAllEnrollments] = useState<Enrollment[]>([]);

  // const isEnrolled = (courseID: string) => {
  //   return allEnrollments.some(
  //     (enrollment: any) =>
  //       enrollment.user === currentUser._id && enrollment.course === courseID
  //   );
  // };
  // useEffect(() => {
  //   const fetchAllCourses = async () => {
  //     const courses = await coursesClient.fetchAllCourses();
  //     setAllCourses(courses);
  //   };
  //   const fetchAllEnrollments = async () => {
  //     const { data } = await axios.get(`${ENROLLMENTS_API}`);
  //     const enrollments = data;
  //     setAllEnrollments(enrollments);
  //   };

  //   fetchAllCourses();
  //   fetchAllEnrollments();
  // }, [allCourses, allEnrollments]);

  // const enrollCourse = async (courseId: any) => {
  //   await userClient.enrollCourse(courseId);
  //   console.log(`Enrolled in ${courseId}`);
  // };

  // const unenrollCourse = async (courseId: any) => {
  //   await userClient.unenrollCourse(courseId);
  // };

  return (
    <div id="wd-dashboard" className="container-fluid">
      <h1 id="wd-dashboard-title">
        Dashboard{" "}
        <pre>{JSON.stringify(currentUser._id)}</pre>
        <button
          onClick={() => setEnrolling(!enrolling)}
          className="float-end btn btn-primary"
        >
          {enrolling ? "My Courses" : "All Courses"}
        </button>
      </h1>{" "}
      <hr />
      {/* Show different buttons depends on user status */}
      {currentUser.role === "FACULTY" ? (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => {
                const _id = new Date().getTime().toString();
                addNewCourse(_id);
                dispatch(
                  addEnrollment({
                    user: currentUser._id,
                    course: _id,
                  })
                );
              }}
            >
              {" "}
              Add{" "}
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <input
            defaultValue={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            defaultValue={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      ) : (
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          // onClick={() => setShowAll((showAll) => !showAll)}
        >
          {" "}
          Enrollments{" "}
        </button>
      )}
      {enrolling ? (
        <h2 id="wd-dashboard-published">
          Published Courses
          <hr />
        </h2>
      ) : currentUser.role === "FACULTY"? (
        <>
          <h2 id="wd-dashboard-published">
            Published Courses
            <hr />
          </h2>
        </>
      ) : (
        <h2 id="wd-dashboard-enrolled">
          Enrolled Courses
          <hr />
        </h2>
      )}{" "}
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {currentUser.role === "FACULTY"
            ? // Show all courses with Delete and Edit options for faculty
              courses.filter((course) => course && course._id).map((course) => (
                <div
                  className="wd-dashboard-course col"
                  style={{ width: "300px" }}
                  key={course._id}
                >
                  <div className="card rounded-3 overflow-hidden">
                    <div>
                      <Link
                        to={`/Kanbas/Courses/${course._id}/Home`}
                        className="wd-dashboard-course-link text-decoration-none text-dark"
                      >
                        <img
                          src={`${course.image}`}
                          width="100%"
                          height={160}
                        />
                        <div className="card-body">
                          <h5 className="wd-dashboard-course-title card-title text-primary">
                            {enrolling && (
                              <button
                                onClick={(event) => {
                                  event.preventDefault();
                                  updateEnrollment(
                                    course._id,
                                    !course.enrolled
                                  );
                                }}
                                className={`btn ${
                                  course.enrolled ? "btn-danger" : "btn-success"
                                } float-end`}
                              >
                                {course.enrolled ? "Unenroll" : "Enroll"}
                              </button>
                            )}
                            {course.name}
                          </h5>
                          <p
                            className="wd-dashboard-course-description card-text overflow-y-hidden"
                            style={{ maxHeight: 100 }}
                          >
                            {course.description}
                          </p>
                        </div>
                        <button className="btn btn-primary ms-2"> Go </button>
                      </Link>

                      {/* Delete and Edit buttons for faculty */}
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                          dispatch(
                            deleteEnrollment({
                              user: currentUser._id,
                              course: course._id,
                            })
                          );
                        }}
                        className="btn btn-danger float-end me-2 mb-2"
                        id="wd-delete-course-click"
                      >
                        Delete
                      </button>
                      <button
                        id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className="btn btn-warning float-end me-2 mb-2"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : // Non-faculty users: Respect the `showAll` state
            !enrolling
            ? // Enrolled courses only when showAll is false
              courses.filter((course) => course && course._id).map((course) => (
                <div
                  className="wd-dashboard-course col"
                  style={{ width: "300px" }}
                  key={course._id}
                >
                  <div className="card rounded-3 overflow-hidden">
                    <Link
                      to={`/Kanbas/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark"
                    >
                      <img src={`${course.image}`} width="100%" height={160} />
                      <div className="card-body">
                        <h5 className="wd-dashboard-course-title card-title text-primary">
                          {enrolling && (
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                updateEnrollment(course._id, !course.enrolled);
                              }}
                              className={`btn ${
                                course.enrolled ? "btn-danger" : "btn-success"
                              } float-end`}
                            >
                              {course.enrolled ? "Unenroll" : "Enroll"}
                            </button>
                          )}
                          {course.name}
                        </h5>
                        <p
                          className="wd-dashboard-course-description card-text overflow-y-hidden"
                          style={{ maxHeight: 100 }}
                        >
                          {course.description}
                        </p>
                        <button className="btn btn-primary"> Go </button>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            : // Show all courses when showAll is true
              courses.filter((course) => course && course._id).map((course) => (
                <div
                  className="wd-dashboard-course col"
                  style={{ width: "300px" }}
                  key={course._id}
                >
                  <div className="card rounded-3 overflow-hidden">
                    <div>
                      {course._id ? (
                        // Render as Link when enrolled
                        <Link
                          to={`/Kanbas/Courses/${course._id}/Home`}
                          className="wd-dashboard-course-link text-decoration-none text-dark"
                        >
                          <img
                            src={`${course.image}`}
                            width="100%"
                            height={160}
                          />
                          <div className="card-body">
                            <h5 className="wd-dashboard-course-title card-title text-primary">
                              {enrolling && (
                                <button
                                  onClick={(event) => {
                                    event.preventDefault();
                                    updateEnrollment(
                                      course._id,
                                      !course.enrolled
                                    );
                                  }}
                                  className={`btn ${
                                    course.enrolled
                                      ? "btn-danger"
                                      : "btn-success"
                                  } float-end`}
                                >
                                  {course.enrolled ? "Unenroll" : "Enroll"}
                                </button>
                              )}
                              {course.name}
                            </h5>
                            <p
                              className="wd-dashboard-course-description card-text overflow-y-hidden"
                              style={{ maxHeight: 100 }}
                            >
                              {course.description}
                            </p>
                          </div>
                        </Link>
                      ) : (
                        // Render as div (non-clickable) when not enrolled
                        <div className="wd-dashboard-course-link text-dark">
                          <img
                            src={`${course.image}`}
                            width="100%"
                            height={160}
                          />
                          <div className="card-body">
                            <h5 className="wd-dashboard-course-title card-title text-primary">
                              {enrolling && (
                                <button
                                  onClick={(event) => {
                                    event.preventDefault();
                                    updateEnrollment(
                                      course._id,
                                      !course.enrolled
                                    );
                                  }}
                                  className={`btn ${
                                    course.enrolled
                                      ? "btn-danger"
                                      : "btn-success"
                                  } float-end`}
                                >
                                  {course.enrolled ? "Unenroll" : "Enroll"}
                                </button>
                              )}
                              {course.name}
                            </h5>
                            <p
                              className="wd-dashboard-course-description card-text overflow-y-hidden"
                              style={{ maxHeight: 100 }}
                            >
                              {course.description}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Enroll/Unenroll Buttons */}
                      {course._id ? (
                        <button
                          className="btn btn-danger float-end me-2 mb-2"
                          id="wd-unenroll-course-click"
                          onClick={() => {
                            if (!course || !course._id) {
                              console.error(
                                "Course is undefined or does not have an _id"
                              );
                              return;
                            }
                            // unenrollCourse(course._id);
                            dispatch(
                              deleteEnrollment({
                                user: currentUser._id,
                                course: course._id,
                              })
                            );
                            setCourses(
                              courses.filter((c) => c._id !== course._id)
                            );
                          }}
                        >
                          Unenroll
                        </button>
                      ) : (
                        <button
                          className="btn btn-success float-end me-2 mb-2"
                          id="wd-enroll-course-click"
                          onClick={() => {
                            if (!course || !course._id) {
                              console.error(
                                "Course is undefined or does not have an _id"
                              );
                              return;
                            }
                            // enrollCourse(course._id);
                            dispatch(
                              addEnrollment({
                                user: currentUser._id,
                                course: course._id,
                              })
                            );
                            if (!courses.find((c) => c._id === course._id)) {
                              setCourses([...courses, course]);
                            }
                          }}
                        >
                          Enroll
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
