import React, { useEffect, useState } from "react";
import { BsGripVertical } from "react-icons/bs";
import { RxTriangleDown } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import QuizControls from "./QuizControls";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import { deleteQuiz, setQuizzes } from "./reducer";
import { format } from "date-fns";
import { FaCircle } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { IoRocketOutline } from "react-icons/io5";

export default function Quizzes() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const dispatch = useDispatch();
  const [contextMenuQuiz, setContextMenuQuiz] = useState<string | null>(null);
  const [quizToDelete, setQuizToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleContextMenu = (quizId: string) => {
    setContextMenuQuiz((prev) => (prev === quizId ? null : quizId));
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".context-menu")) {
      setContextMenuQuiz(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleEdit = () => {
    navigate("/quiz-details");
  };

  const handleDelete = () => {
    console.log("Quiz deleted");
  };

  const handlePublish = async (quiz: any) => {
    try {
      // Toggle the isPublished state locally
      const updatedQuiz = { ...quiz, isPublished: !quiz.isPublished };

      // Update the state in the Redux store
      dispatch(
        setQuizzes(
          quizzes.map((q: any) => (q._id === quiz._id ? updatedQuiz : q))
        )
      );

      // Send the update to the backend
      await quizzesClient.updateQuiz(updatedQuiz);

      console.log(
        `Quiz "${quiz.title}" has been ${
          updatedQuiz.isPublished ? "published" : "unpublished"
        }.`
      );
    } catch (error) {
      console.error("Failed to update quiz publish status:", error);
    }
  };

  const fetchQuizzes = async () => {
    try {
      const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
      dispatch(setQuizzes(quizzes));
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleDeleteClick = (id: string) => {
    setQuizToDelete(id);
  };

  const confirmDelete = async (quizId: string) => {
    if (quizToDelete) {
      await quizzesClient.deleteQuiz(quizId);
      dispatch(deleteQuiz(quizId));
      setQuizToDelete(null);
    }
  };

  const cancelDelete = () => {
    setQuizToDelete(null);
  };

  return (
    <div>
      <div id="wd-quizzes" className="container-fluid">
        <div>
          <QuizControls currentUser={currentUser} />
        </div>
        <div className="mt-4">
          <ul id="wd-quizzes" className="list-group rounded-0">
            <li className="wd-quiz-lists list-group-item p-0 mb-5 fs-5 border-light shadow-sm">
              <div className="wd-title p-3 ps-2 bg-light d-flex align-items-center justify-content-between flex-wrap">
                <div className="d-flex align-items-center flex-nowrap">
                  <div className="d-flex align-items-center me-2">
                    <BsGripVertical className="fs-4 text-secondary" />
                    <RxTriangleDown className="fs-3 ms-2" />
                  </div>
                  <b className="ms-2">Assignment Quizzes</b>
                </div>
              </div>

              <ul
                className="wd-quiz-list list-group list-group-flush"
                style={{ borderLeft: "6px solid rgb(34, 151, 34)" }}
              >
                {quizzes.map((quiz: any) => (
                  <li
                    key={quiz._id}
                    className="wd-quiz-list-item list-group-item p-4 border-bottom"
                  >
                    <div className="d-flex align-items-center">
                      <div className="d-flex align-items-center flex-nowrap me-3">
                        <IoRocketOutline
                          className="fs-3 ms-2"
                          style={{ color: "green" }}
                        />
                      </div>
                      <div className="flex-grow-1">
                        <a
                          className="wd-quiz-link text-dark"
                          // href={`#/Kanbas/Courses/${cid}/Assignments/${assign._id}`}
                        >
                          <b>{quiz.title}</b>
                        </a>
                        <div className="text-muted mt-1">
                          {new Date() > new Date(quiz.untilDate) ? (
                            <span>
                              <b>Closed</b>
                            </span>
                          ) : new Date() > new Date(quiz.availableDate) ? (
                            new Date() < new Date(quiz.untilDate) ? (
                              <span>
                                <b>Available</b>
                              </span>
                            ) : null
                          ) : (
                            <span>
                              <b>Not available until</b>{" "}
                              {format(new Date(quiz.availableDate), "MMM d")} at
                              12:00am
                            </span>
                          )}
                          {" | "}
                          <b>Due</b> {format(new Date(quiz.dueDate), "MMM d")}{" "}
                          at 11:59pm | {quiz.points} pts |{" "}
                          {quiz.questions?.length || 0} Questions
                          {currentUser.role === "STUDENT" && (
                            <>
                              {" | "}
                              <b>Score:</b>{" "}
                              {quiz.lastAttempt?.score ?? "No attempts yet"}
                            </>
                          )}
                        </div>
                      </div>
                      <div className="d-flex align-items-center flex-nowrap">
                        {quiz.isPublished ? (
                          <div className="fs-4 me-2">✅</div>
                        ) : (
                          <div className="fs-4 me-2">🚫</div>
                        )}
                        <button
                          className="btn btn-lg border p-2 bg-light d-flex justify-content-center align-items-center"
                          style={{ width: "50px", height: "50px" }}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the document click listener
                            toggleContextMenu(quiz._id);
                          }}
                        >
                          <IoEllipsisVertical className="fs-4" />
                        </button>
                        {contextMenuQuiz === quiz._id && (
                          <div
                            className="context-menu position-absolute bg-white border rounded shadow-sm"
                            style={{
                              top: "60px",
                              right: "0",
                              minWidth: "200px",
                              zIndex: 1000,
                            }}
                          >
                            <button
                              className="btn btn-light w-100 text-start"
                              onClick={handleEdit}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-light w-100 text-start"
                              onClick={() => handleDeleteClick(quiz._id)}
                            >
                              Delete
                            </button>
                            {quizToDelete === quiz._id && (
                              <div className="confirm-dialog-overlay">
                                <div className="confirm-dialog">
                                  Are you sure you want to remove this quiz?
                                  <button
                                    onClick={() => confirmDelete(quiz._id)}
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
                            <button
                              className="btn btn-light w-100 text-start"
                              onClick={() => handlePublish(quiz)}
                            >
                              Publish/Unpublish
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
