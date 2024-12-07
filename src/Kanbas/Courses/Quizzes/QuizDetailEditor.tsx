import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addQuiz, updateQuiz } from "./reducer";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import AddQuizQuestion from "./AddQuizQuestion";

export default function QuizDetailEditor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cid } = useParams();
  const qID = useParams().qid;
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const [tab, setTab] = useState("Details");
  const [showAddQuestion, setShowAddQuestion] = useState(false); // State to track if AddQuizQuestion should be displayed

  const flag = quizzes.find((quiz: any) => quiz._id === qID) ? 1 : 0;

  const [quiz, setQuiz] = useState<any>(
    flag
      ? quizzes.find((quiz: any) => quiz._id === qID)
      : {
          courseId: cid,
          title: "New Quiz Name",
          description: "New Quiz Instructions",
          type: "Graded Quiz",
          assignmentGroup: "Quizzes",
          points: 100,
          shuffleAnswers: true,
          multipleAttempts: false,
          maxAttempts: 1,
          showCorrectAnswers: false,
          accessCode: "",
          oneQuestionAtATime: true,
          webcamRequired: false,
          lockQuestionsAfterAnswering: false,
          dueDate: "",
          availableDate: "",
          untilDate: "",
          isPublished: false,
          questions: [],
          timeLimit: 20,
        }
  );

  const saveQuiz = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!cid) return;

    const requiredFields = ["dueDate", "availableDate", "untilDate"];

    if (
      Object.values(quiz).some(
        (attribute: any) =>
          attribute === "" && !requiredFields.includes(attribute)
      )
    ) {
      alert("All date fields must be filled out.");
      return;
    }

    if (flag) {
      await quizzesClient.updateQuiz(quiz);
      dispatch(updateQuiz(quiz));
    } else {
      const newQuiz = await coursesClient.createQuizForCourse(quiz);
      dispatch(addQuiz(newQuiz));
    }
    navigate(-1);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-start mb-3">
          <button
            className="btn btn-outline-dark me-2 hover-red"
            onClick={() => {
              setTab("Details");
              setShowAddQuestion(false); // Reset AddQuizQuestion visibility
            }}
          >
            Details
          </button>
          <button
            className="btn btn-outline-dark hover-red"
            onClick={() => {
              setTab("Questions");
            }}
          >
            Questions
          </button>
        </div>

        <style>
          {`.hover-red:hover {
                        background-color: #dc3545 !important; 
                        color: white !important; 
                        border-color: #dc3545 !important; 
                    }
                    .btn-outline-dark {
                        color: black; 
                        border-color: black;
                        }`}
        </style>

        {tab === "Details" ? (
          <div>
            <hr />
            <div className="container mt-5">
              <h2>Quiz Editor</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="quizName" className="form-label">
                    Quiz Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="quizName"
                    value={quiz.title}
                    onChange={(e) =>
                      setQuiz((prev: any) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Unnamed Quiz"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="quizInstructions" className="form-label">
                    Quiz Instructions
                  </label>
                  <textarea
                    className="form-control"
                    id="quizInstructions"
                    value={quiz.description}
                    onChange={(e) =>
                      setQuiz((prev: any) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Enter quiz instructions here..."
                  ></textarea>
                </div>

                <div className="row mb-3">
                  <div className="col-md-2 d-flex align-items-center justify-content-end">
                    <label htmlFor="quizType" className="form-label">
                      Quiz Type
                    </label>
                  </div>
                  <div className="col-md-10">
                    <select
                      className="form-select"
                      id="quizType"
                      value={quiz.type}
                      onChange={(e) =>
                        setQuiz((prev: any) => ({
                          ...prev,
                          type: e.target.value,
                        }))
                      }
                    >
                      <option value={"Graded Quiz"}>Graded Quiz</option>
                      <option value={"Practice Quiz"}>Practice Quiz</option>
                      <option value={"Ungraded Survey"}>Ungraded Survey</option>
                      <option value={"Graded Survey"}>Graded Survey</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-2 d-flex align-items-center justify-content-end">
                    <label htmlFor="assignmentGroup" className="form-label">
                      Assignment Group
                    </label>
                  </div>
                  <div className="col-md-10">
                    <select
                      className="form-select"
                      id="assignmentGroup"
                      value={quiz.assignmentGroup}
                      onChange={(e) =>
                        setQuiz((prev: any) => ({
                          ...prev,
                          assignmentGroup: e.target.value,
                        }))
                      }
                    >
                      <option value={"Quizzes"}>QUIZZES</option>
                      <option value={"Assignments"}>ASSIGNMENTS</option>
                      <option value={"Exams"}>EXAMS</option>
                      <option value={"Project"}>PROJECTS</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-10 offset-md-2">
                    <label className="form-label">
                      <b>Options</b>
                    </label>
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="shuffleAnswers"
                        checked={quiz.shuffleAnswers}
                        onChange={() =>
                          setQuiz((prev: any) => ({
                            ...prev,
                            shuffleAnswers: !prev.shuffleAnswers,
                          }))
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="shuffleAnswers"
                      >
                        Shuffle Answers
                      </label>
                    </div>

                    <div className="form-check mb-2 d-flex align-items-center">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        id="time-limit"
                        checked={quiz.timeLimit > 0} // Check if a time limit is set
                        onChange={(e) =>
                          setQuiz((prev: any) => ({
                            ...prev,
                            timeLimit: e.target.checked ? 20 : 0, // Default to 20 if checked, reset to 0 if unchecked
                          }))
                        }
                      />
                      <label
                        htmlFor="timeLimit"
                        className="form-check-label me-2"
                      >
                        Time Limit
                      </label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        id="timeLimit"
                        value={quiz.timeLimit}
                        onChange={(e) =>
                          setQuiz((prev: any) => ({
                            ...prev,
                            timeLimit: Number(e.target.value),
                          }))
                        }
                        style={{ width: "80px" }}
                        disabled={quiz.timeLimit === 0} // Disable input if no time limit is set
                      />
                      Minutes
                    </div>

                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="multipleAttempts"
                        checked={quiz.multipleAttempts}
                        onChange={() =>
                          setQuiz((prev: any) => ({
                            ...prev,
                            multipleAttempts: !prev.multipleAttempts,
                          }))
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="multipleAttempts"
                      >
                        Allow Multiple Attempts
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-10 offset-md-2">
                    <label htmlFor="wd-assign-to" className="form-label">
                      <b>Assign</b>
                    </label>
                    <input
                      type="text"
                      id="wd-assign-to"
                      className="form-control"
                      value={quiz.assignTo || "Everyone"}
                      onChange={(e) =>
                        setQuiz((prev: any) => ({
                          ...prev,
                          assignTo: e.target.value,
                        }))
                      }
                      placeholder="Assign to"
                    />

                    <div className="row mt-3">
                      <div className="col">
                        <label htmlFor="wd-due-date" className="form-label">
                          <b>Due</b>
                        </label>
                        <input
                          type="date"
                          id="wd-due-date"
                          className="form-control"
                          value={quiz.dueDate}
                          onChange={(e) =>
                            setQuiz((prev: any) => ({
                              ...prev,
                              dueDate: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="col">
                        <label
                          htmlFor="wd-available-from"
                          className="form-label"
                        >
                          <b>Available From</b>
                        </label>
                        <input
                          type="date"
                          id="wd-available-from"
                          className="form-control"
                          value={quiz.availableDate}
                          onChange={(e) =>
                            setQuiz((prev: any) => ({
                              ...prev,
                              availableDate: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="col">
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
                          value={quiz.untilDate}
                          onChange={(e) =>
                            setQuiz((prev: any) => ({
                              ...prev,
                              untilDate: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-secondary me-2"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(-1);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => saveQuiz(e)}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>{" "}
          </div>
        ) : (
          <div>
            {!showAddQuestion ? (
              // Display the button to add a new question
              <div>
                <div className="d-flex justify-content-center mb-3">
                  <button
                    className="btn btn-outline-dark hover-red"
                    onClick={() => setShowAddQuestion(true)} // Show AddQuizQuestion on click
                  >
                    + New Question
                  </button>
                </div>
                <hr />
                <div className="d-flex justify-content-end">
                  <button className="btn btn-secondary me-2">Cancel</button>
                  <button className="btn btn-danger">Save</button>
                </div>
              </div>
            ) : (
              // Display the AddQuizQuestion component
              <div>
                <AddQuizQuestion />
                <hr></hr>
                <div className="d-flex justify-content-end mt-3">
                  <button
                    className="btn btn-secondary me-2"
                    onClick={() => setShowAddQuestion(false)} // Hide AddQuizQuestion on cancel
                  >
                    Cancel
                  </button>
                  <button className="btn btn-danger">Save</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
