import { BsGripVertical } from "react-icons/bs";
import AssignmentControls from "./AssignmentControls";
import { RxTriangleDown } from "react-icons/rx";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import { MdOutlineAssignment } from "react-icons/md";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle, FaCircle, FaTrash } from "react-icons/fa";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { deleteAssignment, setAssignments } from "./reducer";
import { useEffect, useState } from "react";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(
    null
  );

  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(
      cid as string
    );
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleDeleteClick = (id: string) => {
    setAssignmentToDelete(id);
  };

  const confirmDelete = async (assignmentId: string) => {
    if (assignmentToDelete) {
      await assignmentsClient.deleteAssignment(assignmentId);
      dispatch(deleteAssignment(assignmentToDelete));
      setAssignmentToDelete(null);
    }
  };

  const cancelDelete = () => {
    setAssignmentToDelete(null);
  };

  return (
    <div id="wd-assignments" className="container-fluid">
      <div>
        <AssignmentControls currentUser={currentUser} />
      </div>
      <div className="mt-4">
        <ul id="wd-assignments" className="list-group rounded-0">
          <li className="wd-assignment-lists list-group-item p-0 mb-5 fs-5 border-light shadow-sm">
            <div className="wd-title p-3 ps-2 bg-light d-flex align-items-center justify-content-between flex-wrap">
              <div className="d-flex align-items-center flex-nowrap">
                <div className="d-flex align-items-center me-2">
                  <BsGripVertical className="fs-4 text-secondary" />
                  <RxTriangleDown className="fs-3 ms-2" />
                </div>
                <b className="ms-2">ASSIGNMENTS</b>
              </div>
              <div className="d-flex align-items-center mt-2 mt-sm-0">
                <span
                  className="border border-1 rounded-pill px-3 py-1 me-2"
                  id="wd-assignments-title"
                >
                  40% of Total
                </span>
                <AssignmentsControlButtons />
              </div>
            </div>

            <ul className="wd-assignment-list list-group list-group-flush">
              {assignments
                .map((assign: any) => (
                  <li
                    key={assign._id}
                    className="wd-assignment-list-item list-group-item p-4 border-bottom"
                  >
                    <div className="d-flex align-items-center">
                      <div className="d-flex align-items-center flex-nowrap me-3">
                        <BsGripVertical className="fs-4 text-secondary" />
                        <MdOutlineAssignment style={{ color: "green" }} />
                      </div>
                      <div className="flex-grow-1">
                        <a
                          className="wd-assignment-link text-dark"
                          href={`#/Kanbas/Courses/${cid}/Assignments/${assign._id}`}
                        >
                          <b>{assign.title}</b>
                        </a>
                        <div className="text-muted mt-1">
                          <span style={{ color: "red" }}>Multiple Modules</span>{" "}
                          | <b>Not available until</b>{" "}
                          {format(new Date(assign.fromDate), "MMM d")} at
                          12:00am | <b>Due</b>{" "}
                          {format(new Date(assign.dueDate), "MMM d")} at 11:59pm
                          | {assign.points} pts
                        </div>
                      </div>
                      <div className="d-flex align-items-center flex-nowrap">
                        {currentUser.role === "FACULTY" ? (
                          <FaTrash
                            onClick={() => handleDeleteClick(assign._id)}
                            className="text-danger fs-5 me-2"
                          />
                        ) : (
                          ""
                        )}
                        {assignmentToDelete === assign._id && (
                          <div className="confirm-dialog-overlay">
                            <div className="confirm-dialog">
                              <p>
                                Are you sure you want to remove this assignment?
                              </p>
                              <button
                                onClick={() => confirmDelete(assign._id)}
                                className="btn btn-danger me-2"
                              >
                                Yes
                              </button>
                              <button
                                onClick={cancelDelete}
                                className="btn btn-secondary"
                              >
                                No
                              </button>
                            </div>
                          </div>
                        )}
                        <FaCheckCircle
                          style={{ top: "2px" }}
                          className="text-success"
                        />
                        <FaCircle className="text-white fs-6" />
                        <IoEllipsisVertical className="fs-4" />
                      </div>
                    </div>
                  </li>
                ))}

              {/* <li className="wd-assignment-list-item list-group-item p-4 border-bottom">
                                <div className="d-flex align-items-center">
                                    <div className="d-flex align-items-center flex-nowrap me-3">
                                        <BsGripVertical className="fs-4 text-secondary" />
                                        <MdOutlineAssignment style={{ color: 'green' }} />
                                    </div>
                                    <div className="flex-grow-1">
                                        <a className="wd-assignment-link text-dark" href="#/Kanbas/Courses/1234/Assignments/123">
                                            <b>A2</b>
                                        </a>
                                        <div className="text-muted mt-1">
                                            <span style={{ color: 'red' }}>Multiple Modules</span> | <b>Not available until</b> May 13 at 12:00am | <b>Due</b> May 20 at 11:59pm | 100 pts
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center flex-nowrap">
                                        <FaCheckCircle style={{ top: "2px" }}
                                            className="text-success" />
                                        <FaCircle className="text-white fs-6" />
                                        <IoEllipsisVertical className="fs-4" />
                                    </div>
                                </div>
                            </li>

                            <li className="wd-assignment-list-item list-group-item p-4 border-bottom">
                                <div className="d-flex align-items-center">
                                    <div className="d-flex align-items-center flex-nowrap me-3">
                                        <BsGripVertical className="fs-4 text-secondary" />
                                        <MdOutlineAssignment style={{ color: 'green' }} />
                                    </div>
                                    <div className="flex-grow-1">
                                        <a className="wd-assignment-link text-dark" href="#/Kanbas/Courses/1234/Assignments/123">
                                            <b>A3</b>
                                        </a>
                                        <div className="text-muted mt-1">
                                            <span style={{ color: 'red' }}>Multiple Modules</span> | <b>Not available until</b> May 20 at 12:00am | <b>Due</b> May 27 at 11:59pm | 100 pts
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center flex-nowrap">
                                        <FaCheckCircle style={{ top: "2px" }}
                                            className="text-success" />
                                        <FaCircle className="text-white fs-6" />
                                        <IoEllipsisVertical className="fs-4" />
                                    </div>
                                </div>
                            </li> */}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
