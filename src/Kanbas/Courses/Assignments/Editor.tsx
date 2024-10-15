import { useParams } from "react-router";
import { assignments } from "../../Database";
import { Link } from "react-router-dom";

export default function AssignmentEditor() {
    const aID = useParams().aid;
    const assignment = assignments.find((assignment) => assignment._id === aID)
    const { cid } = useParams();

    return (
        <div id="wd-assignments-editor" className="container mt-5">
            <form>
                <div className="mb-3">
                    <label htmlFor="wd-name" className="form-label">Assignment Name</label>
                    <input id="wd-name" className="form-control" value={`${assignment && assignment.title}`} />
                </div>

                <div className="mb-3">
                    <textarea
                        id="wd-description"
                        className="form-control"
                        rows={4}
                        value={`The assignment is available online.\nSubmit a link to the landing page of your Web application running on Netlify.\n\nThe landing page should include the following:\n- Your full name and section\n- Links to each of the lab assignments\n- Link to the Kanbas application\n- Links to all relevant source code repositories.\n\nThe Kanbas application should include a link to navigate back to the landing page.`}
                    />
                </div>

                <div className="row mb-3">
                    <div className="col-md-2 d-flex align-items-center justify-content-end">
                        <label htmlFor="wd-points" className="form-label">Points</label>
                    </div>
                    <div className="col-md-10">
                        <input id="wd-points" className="form-control" value={100} />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-2 d-flex align-items-center justify-content-end">
                        <label htmlFor="wd-group" className="form-label">Assignment Group</label>
                    </div>
                    <div className="col-md-10">
                        <select id="wd-group" className="form-select">
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="EXAMS">EXAMS</option>
                            <option value="QUIZZES">QUIZZES</option>
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-2 d-flex align-items-center justify-content-end">
                        <label htmlFor="wd-display-grade-as" className="form-label">Display Grade as</label>
                    </div>
                    <div className="col-md-10">
                        <select id="wd-display-grade-as" className="form-select">
                            <option value="PERCENTAGE">Percentage</option>
                            <option value="POINTS">Points</option>
                            <option value="LETTERGRADE">Letter Grade</option>
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-2 d-flex justify-content-end">
                        <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
                    </div>
                    <div className="col-md-10 mb-3">
                        <div className="border p-3 rounded">
                            <div className="mb-3">
                                <select id="wd-submission-type" className="form-select">
                                    <option value="ONLINE">Online</option>
                                    <option value="PAPER">Paper</option>
                                    <option value="EXTERNALTOOL">External Tool</option>
                                </select>
                            </div>

                            <label className="form-label pb-3"><b>Online Entry Options</b></label>
                            <div className="form-check mb-4">
                                <input type="checkbox" className="form-check-input" id="wd-text-entry" />
                                <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
                            </div>
                            <div className="form-check mb-4">
                                <input type="checkbox" className="form-check-input" id="wd-website-url" />
                                <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
                            </div>
                            <div className="form-check mb-4">
                                <input type="checkbox" className="form-check-input" id="wd-media-recordings" />
                                <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label>
                            </div>
                            <div className="form-check mb-4">
                                <input type="checkbox" className="form-check-input" id="wd-student-annotation" />
                                <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
                            </div>
                            <div className="form-check mb-4">
                                <input type="checkbox" className="form-check-input" id="wd-file-upload" />
                                <label className="form-check-label" htmlFor="wd-file-upload">File Uploads</label>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row mb-3">
                    <div className="col-md-2 d-flex justify-content-end">
                        <label htmlFor="wd-assign-to" className="form-label">Assign</label>
                    </div>

                    <div className="col-md-10 mb-3">

                        <div className="border p-3 rounded">
                            <label className="form-label"><b>Assign to</b></label>
                            <div className="mb-3">
                                <input type="text" id="wd-assign-to" className="form-control" value="Everyone" placeholder="member" />
                            </div>

                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="wd-due-date" className="form-label"><b>Due</b></label>
                                    <input type="date" id="wd-due-date" className="form-control" defaultValue="2024-05-13" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="wd-available-from" className="form-label"><b>Available from</b></label>
                                    <input type="date" id="wd-available-from" className="form-control" defaultValue="2024-05-06" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="wd-available-until" className="form-label"><b>Until</b></label>
                                    <input type="date" id="wd-available-until" className="form-control" defaultValue="2024-05-20" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr />

                <div className="d-flex justify-content-end">
                    <Link to={`/Kanbas/courses/${cid}/Assignments`} className="btn btn-secondary me-2">
                        Cancel
                    </Link>
                    <Link to={`/Kanbas/courses/${cid}/Assignments`} className="btn btn-danger">
                        Save
                    </Link>
                </div>
            </form>
        </div>
    );
}
