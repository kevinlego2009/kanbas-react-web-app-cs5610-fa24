import { BsGripVertical } from "react-icons/bs";
import AssignmentControls from "./AssignmentControls";
import { RxTriangleDown } from "react-icons/rx";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import { MdOutlineAssignment } from "react-icons/md";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { assignments } from "../../Database";
import { useParams } from "react-router";

export default function Assignments() {
    const { cid } = useParams();
    const assignment = assignments.filter((assignment) => assignment.course === cid);

    return (
        <div id="wd-assignments" className="container-fluid">
            <div>
                <AssignmentControls />
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
                                <span className="border border-1 rounded-pill px-3 py-1 me-2" id="wd-assignments-title">40% of Total</span>
                                <AssignmentsControlButtons />
                            </div>
                        </div>

                        <ul className="wd-assignment-list list-group list-group-flush">

                            {assignment.map((assign: any) => (<li className="wd-assignment-list-item list-group-item p-4 border-bottom">
                                <div className="d-flex align-items-center">
                                    <div className="d-flex align-items-center flex-nowrap me-3">
                                        <BsGripVertical className="fs-4 text-secondary" />
                                        <MdOutlineAssignment style={{ color: 'green' }} />
                                    </div>
                                    <div className="flex-grow-1">
                                        <a className="wd-assignment-link text-dark" href={`#/Kanbas/Courses/${cid}/Assignments/${assign._id}`}>
                                            <b>{assign.title}</b>
                                        </a>
                                        <div className="text-muted mt-1">
                                            <span style={{ color: 'red' }}>Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100 pts
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center flex-nowrap">
                                        <FaCheckCircle style={{ top: "2px" }}
                                            className="text-success" />
                                        <FaCircle className="text-white fs-6" />
                                        <IoEllipsisVertical className="fs-4" />
                                    </div>
                                </div>
                            </li>))}

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
            </div >
        </div >
    );
}
