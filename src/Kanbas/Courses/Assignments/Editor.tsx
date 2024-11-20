import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const aID = useParams().aid;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const flag = assignments.find((assignment: any) => assignment._id === aID)
    ? 1
    : 0;
  const { cid } = useParams();
  const [assignment, setAssignment] = useState<any>(
    flag
      ? assignments.find((assignment: any) => assignment._id === aID)
      : {
          course: cid,
          title: "New Assignment Title",
          description: "New Assignment Description",
          points: "100",
          dueDate: "",
          fromDate: "",
          untilDate: "",
        }
  );

  const saveAssignment = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!cid) return;

    if (Object.values(assignment).some((attribute: any) => attribute === "")) {
      alert("All fields must be filled out.");
      return;
    }

    if (flag) {
      await assignmentsClient.updateAssignment(assignment);
      dispatch(updateAssignment(assignment));
    } else {
      const newAssignment = await coursesClient.createAssignmentForCourse(
        cid,
        assignment
      );
      dispatch(addAssignment(newAssignment));
    }
    navigate(-1);
  };

  return (
    <div id="wd-assignments-editor" className="container mt-5">
      <form>
        <div className="mb-3">
          <label htmlFor="wd-name" className="form-label">
            Assignment Name
          </label>
          <input
            id="wd-name"
            className="form-control"
            value={`${assignment && assignment.title}`}
            onChange={(e) =>
              setAssignment((prev: any) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>

        <div className="mb-3">
          <textarea
            id="wd-description"
            className="form-control"
            rows={4}
            value={`${
              assignment.description
                ? assignment.description
                : "The assignment is available online.\nSubmit a link to the landing page of your Web application running on Netlify.\n\nThe landing page should include the following:\n- Your full name and section\n- Links to each of the lab assignments\n- Link to the Kanbas application\n- Links to all relevant source code repositories.\n\nThe Kanbas application should include a link to navigate back to the landing page."
            }`}
            onChange={(e) =>
              setAssignment((prev: any) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>
        {currentUser.role === "FACULTY" ? (
          <>
            <div className="row mb-3">
              <div className="col-md-2 d-flex align-items-center justify-content-end">
                <label htmlFor="wd-points" className="form-label">
                  Points
                </label>
              </div>
              <div className="col-md-10">
                <input
                  id="wd-points"
                  className="form-control"
                  value={assignment && assignment.points}
                  onChange={(e) =>
                    setAssignment((prev: any) => ({
                      ...prev,
                      points: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-2 d-flex align-items-center justify-content-end">
                <label htmlFor="wd-group" className="form-label">
                  Assignment Group
                </label>
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
                <label htmlFor="wd-display-grade-as" className="form-label">
                  Display Grade as
                </label>
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
                <label htmlFor="wd-submission-type" className="form-label">
                  Submission Type
                </label>
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

                  <label className="form-label pb-3">
                    <b>Online Entry Options</b>
                  </label>
                  <div className="form-check mb-4">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="wd-text-entry"
                    />
                    <label className="form-check-label" htmlFor="wd-text-entry">
                      Text Entry
                    </label>
                  </div>
                  <div className="form-check mb-4">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="wd-website-url"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="wd-website-url"
                    >
                      Website URL
                    </label>
                  </div>
                  <div className="form-check mb-4">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="wd-media-recordings"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="wd-media-recordings"
                    >
                      Media Recordings
                    </label>
                  </div>
                  <div className="form-check mb-4">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="wd-student-annotation"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="wd-student-annotation"
                    >
                      Student Annotation
                    </label>
                  </div>
                  <div className="form-check mb-4">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="wd-file-upload"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="wd-file-upload"
                    >
                      File Uploads
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-2 d-flex justify-content-end">
                <label htmlFor="wd-assign-to" className="form-label">
                  Assign
                </label>
              </div>

              <div className="col-md-10 mb-3">
                <div className="border p-3 rounded">
                  <label className="form-label">
                    <b>Assign to</b>
                  </label>
                  <div className="mb-3">
                    <input
                      type="text"
                      id="wd-assign-to"
                      className="form-control"
                      value="Everyone"
                      placeholder="member"
                    />
                  </div>

                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor="wd-due-date" className="form-label">
                        <b>Due</b>
                      </label>
                      <input
                        type="date"
                        id="wd-due-date"
                        className="form-control"
                        value={assignment.dueDate}
                        onChange={(e) =>
                          setAssignment((prev: any) => ({
                            ...prev,
                            dueDate: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="wd-available-from" className="form-label">
                        <b>Available from</b>
                      </label>
                      <input
                        type="date"
                        id="wd-available-from"
                        className="form-control"
                        value={assignment.fromDate}
                        onChange={(e) =>
                          setAssignment((prev: any) => ({
                            ...prev,
                            fromDate: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="wd-available-until"
                        className="form-label"
                      >
                        <b>Until</b>
                      </label>
                      <input
                        type="date"
                        id="wd-available-until"
                        className="form-control"
                        value={assignment.untilDate}
                        onChange={(e) =>
                          setAssignment((prev: any) => ({
                            ...prev,
                            untilDate: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        <hr />

        <div className="d-flex justify-content-end">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="btn btn-secondary me-2"
          >
            Cancel
          </button>
          <button onClick={(e) => saveAssignment(e)} className="btn btn-danger">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
