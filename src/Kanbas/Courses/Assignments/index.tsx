import { BsGripVertical } from "react-icons/bs";
import AssignmentControls from "./AssignmentControls";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { RxTriangleDown } from "react-icons/rx";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import { MdOutlineAssignment } from "react-icons/md";

export default function Assignments() {
    return (
        <div id="wd-assignments" className="container-fluid">
            <div>
                <AssignmentControls />
            </div>
            <div className="mt-4">
                <ul id="wd-assignments" className="list-group rounded-0">
                    <li className="wd-assignment-lists list-group-item p-0 mb-5 fs-5 border-light shadow-sm">
                        <div className="wd-title p-3 ps-2 bg-light d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <BsGripVertical className="me-2 fs-4 text-secondary" />
                                <RxTriangleDown className="fs-3 position-relative" style={{ top: '-2px' }} />
                                <b className="ms-2">ASSIGNMENTS</b>
                            </div>
                            <div className="d-flex align-items-center">
                                <span className="border border-1 rounded-pill px-3 py-1 me-2" id="wd-assignments-title">40% of Total</span>
                                <AssignmentsControlButtons />
                            </div>
                        </div>

                        <ul className="wd-assignment-list list-group list-group-flush">
                            <li className="wd-assignment-list-item list-group-item p-4 border-bottom">
                                <div className="d-flex align-items-center">
                                    <div className="me-2">
                                        <BsGripVertical className="fs-4 text-secondary" />
                                        <MdOutlineAssignment style={{ color: 'green' }} />
                                    </div>
                                    <div className="flex-grow-1">
                                        <a className="wd-assignment-link text-dark" href="#/Kanbas/Courses/1234/Assignments/123">
                                            <b>A1</b>
                                        </a>
                                        <div className="text-muted mt-1">
                                            <span style={{ color: 'red' }}>Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100 pts
                                        </div>
                                    </div>
                                    <LessonControlButtons />
                                </div>
                            </li>

                            <li className="wd-assignment-list-item list-group-item p-4 border-bottom">
                                <div className="d-flex align-items-center">
                                    <div className="me-2">
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
                                    <LessonControlButtons />
                                </div>
                            </li>

                            <li className="wd-assignment-list-item list-group-item p-4 border-bottom">
                                <div className="d-flex align-items-center">
                                    <div className="me-2">
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
                                    <LessonControlButtons />
                                </div>
                            </li>

                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}
