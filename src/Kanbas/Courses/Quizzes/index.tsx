import React, { useEffect, useState } from "react";
import { BsGripVertical } from "react-icons/bs";
import { RxTriangleDown } from "react-icons/rx";
import { assignments } from "../../Database";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import QuizControls from "./QuizControls";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import { deleteQuiz, setQuizzes } from "./reducer";
import { MdOutlineAssignment } from "react-icons/md";
import { format } from "date-fns";
import { FaCircle, FaTrash } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { current } from "@reduxjs/toolkit";

export default function Quizzes() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const dispatch = useDispatch();

  const [quizToDelete, setQuizToDelete] = useState<string | null>(null);

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
      dispatch(deleteQuiz(quizToDelete));
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

              <ul className="wd-quiz-list list-group list-group-flush">
                {quizzes.map((quiz: any) => (
                  <li
                    key={quiz._id}
                    className="wd-quiz-list-item list-group-item p-4 border-bottom"
                  >
                    <div className="d-flex align-items-center">
                      <div className="d-flex align-items-center flex-nowrap me-3">
                        <BsGripVertical className="fs-4 text-secondary" />
                        <MdOutlineAssignment style={{ color: "green" }} />
                      </div>
                      <div className="flex-grow-1">
                        <a
                          className="wd-quiz-link text-dark"
                          // href={`#/Kanbas/Courses/${cid}/Assignments/${assign._id}`}
                        >
                          <b>{quiz.title}</b>
                        </a>
                        <div className="text-muted mt-1">
                          <span style={{ color: "red" }}>Multiple Modules</span>{" "}
                          | <b>Not available until</b>{" "}
                          {format(new Date(quiz.availableDate), "MMM d")} at
                          12:00am | <b>Due</b>{" "}
                          {format(new Date(quiz.dueDate), "MMM d")} at 11:59pm |{" "}
                          {quiz.points} pts
                        </div>
                      </div>
                      <div className="d-flex align-items-center flex-nowrap">
                        {currentUser.role === "FACULTY" ? (
                          <FaTrash
                            onClick={() => handleDeleteClick(quiz._id)}
                            className="text-danger fs-5 me-2"
                          />
                        ) : (
                          ""
                        )}
                        {quizToDelete === quiz._id && (
                          <div className="confirm-dialog-overlay">
                            <div className="confirm-dialog">
                              <p>Are you sure you want to remove this quiz?</p>
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
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
