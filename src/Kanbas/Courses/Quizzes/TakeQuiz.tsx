import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import * as quizClient from "./client";
import * as coursesClient from "../client";

export default function TakeQuiz() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { qid } = useParams();
  const { cid } = useParams();
  const navigate = useNavigate();
  interface Question {
    _id: string; // Example ID field
    quizId: string; // ID of the associated quiz
    type: "Multiple Choice" | "True/False" | "Fill in the Blank"; // Restrict type to valid enum values
    title: string; // Question title
    text?: string; // Optional question text
    points: number; // Points for the question
    choices?: { choiceText: string; isCorrect: boolean }[] | [];
    correctAnswers?: string[]; // Array of correct answers for "Fill in the Blank"
    trueFalseAnswer?: boolean; // Boolean answer for "True/False" questions
    createdAt?: Date; // Timestamp for creation
    updatedAt?: Date; // Timestamp for last update
  }

  const defaultQuizState = {
    courseId: "", // or null, depending on how you'll handle the ObjectId
    title: "",
    description: "",
    type: "Graded Quiz",
    assignmentGroup: "Quizzes",
    points: 0,
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    maxAttempts: 1,
    showCorrectAnswers: false,
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: new Date(), // Set this to the desired default due date
    availableDate: new Date(), // Set this to the desired default available date
    untilDate: new Date(), // Set this to the desired default until date
    isPublished: false,
    questions: [],
  };

  const [questions, setQuestions] = useState<Question[]>([]);
  const [quiz, setQuiz] = useState(defaultQuizState);

  const fetchQuestionsForQuiz = async () => {
    if (!qid) return;
    try {
      const questions = await quizClient.findQuestionsForQuiz(qid);
      setQuestions(questions);
    } catch (error) {}
  };

  const fetchQuiz = async () => {
    if (!qid) return;
    try {
      const quiz = await coursesClient.findQuizById(qid);
      setQuiz(quiz);
    } catch (error) {}
  };

  useEffect(() => {
    fetchQuestionsForQuiz();
    fetchQuiz();
  }, [qid]);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Buttons - Centered */}
      {currentUser.role === "FACULTY" ? (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <button
            style={{
              backgroundColor: "#f1f1f1",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px 20px",
              cursor: "pointer",
              fontSize: "14px",
              marginRight: "10px",
            }}
          >
            Preview
          </button>
          <button
            style={{
              backgroundColor: "#f1f1f1",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px 20px",
              cursor: "pointer",
              fontSize: "14px",
            }}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
            }}
          >
            📎 Edit
          </button>
        </div>
      ) : (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <button className="btn btn-danger">Take Quiz</button>
        </div>
      )}
      <hr />
      {/* Title */}
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>{quiz.title}</h1>

      {/* Quiz Details */}
      <div style={{ textAlign: "center" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <div>
            <tbody>
              <tr>
                <td
                  className="float-end"
                  style={{ fontWeight: "bold", padding: "8px 10px" }}
                >
                  Quiz Type
                </td>
                <td style={{ padding: "8px 10px" }}>{quiz.type}</td>
              </tr>
              <tr>
                <td
                  className="float-end"
                  style={{ fontWeight: "bold", padding: "8px 10px" }}
                >
                  Points
                </td>
                <td style={{ padding: "8px 10px" }}>{quiz.points}</td>
              </tr>
              <tr>
                <td
                  className="float-end"
                  style={{ fontWeight: "bold", padding: "8px 10px" }}
                >
                  Assignment Group
                </td>
                <td style={{ padding: "8px 10px" }}>{quiz.assignmentGroup}</td>
              </tr>
              <tr>
                <td
                  className="float-end"
                  style={{ fontWeight: "bold", padding: "8px 10px" }}
                >
                  Shuffle Answers
                </td>
                <td style={{ padding: "8px 10px" }}>
                  {JSON.stringify(quiz.shuffleAnswers)}
                </td>
              </tr>
              <tr>
                <td
                  className="float-end"
                  style={{ fontWeight: "bold", padding: "8px 10px" }}
                >
                  Time Limit
                </td>
                <td style={{ padding: "8px 10px" }}>
                  {quiz.timeLimit} Minutes
                </td>
              </tr>
              <tr>
                <td
                  className="float-end"
                  style={{ fontWeight: "bold", padding: "8px 10px" }}
                >
                  Multiple Attempts
                </td>
                <td style={{ padding: "8px 10px" }}>
                  {JSON.stringify(quiz.multipleAttempts)}
                </td>
              </tr>
              <tr>
                <td
                  className="float-end"
                  style={{ fontWeight: "bold", padding: "8px 10px" }}
                >
                  View Responses
                </td>
                <td style={{ padding: "8px 10px" }}>Always</td>
              </tr>
              <tr>
                <td
                  className="float-end"
                  style={{ fontWeight: "bold", padding: "8px 10px" }}
                >
                  Show Correct Answers
                </td>
                <td style={{ padding: "8px 10px" }}>
                  {JSON.stringify(quiz.showCorrectAnswers)}
                </td>
              </tr>
              <tr>
                <td
                  className="float-end"
                  style={{ fontWeight: "bold", padding: "8px 10px" }}
                >
                  One Question at a Time
                </td>
                <td style={{ padding: "8px 10px" }}>
                  {" "}
                  {JSON.stringify(quiz.oneQuestionAtATime)}
                </td>
              </tr>
              <tr>
                <td
                  className="float-end"
                  style={{ fontWeight: "bold", padding: "8px 10px" }}
                >
                  Require Respondus LockDown Browser
                </td>
                <td style={{ padding: "8px 10px" }}>No</td>
              </tr>
              <tr>
                <td
                  className="float-end"
                  style={{ fontWeight: "bold", padding: "8px 10px" }}
                >
                  Required to View Quiz Results
                </td>
                <td style={{ padding: "8px 10px" }}>No</td>
              </tr>
              <tr>
                <td
                  className="float-end"
                  style={{ fontWeight: "bold", padding: "8px 10px" }}
                >
                  Webcam Required
                </td>
                <td style={{ padding: "8px 10px" }}>
                  {" "}
                  {JSON.stringify(quiz.webcamRequired)}
                </td>
              </tr>
              <tr>
                <td
                  className="float-end"
                  style={{ fontWeight: "bold", padding: "8px 10px" }}
                >
                  Lock Questions After Answering
                </td>
                <td style={{ padding: "8px 10px" }}>
                  {" "}
                  {JSON.stringify(quiz.lockQuestionsAfterAnswering)}
                </td>
              </tr>
            </tbody>
          </div>
        </table>
        <hr />
      </div>

      {/* Availability Details */}
      <div
        style={{
          borderRadius: "8px",
          backgroundColor: "#ffffff",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  padding: "8px 10px",
                  fontWeight: "bold",
                }}
              >
                Due
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "8px 10px",
                  fontWeight: "bold",
                }}
              >
                For
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "8px 10px",
                  fontWeight: "bold",
                }}
              >
                Available from
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "8px 10px",
                  fontWeight: "bold",
                }}
              >
                Until
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "8px 10px" }}>
                {new Date(quiz.dueDate).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </td>
              <td style={{ padding: "8px 10px" }}>Everyone</td>
              <td style={{ padding: "8px 10px" }}>
                {new Date(quiz.availableDate).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </td>
              <td style={{ padding: "8px 10px" }}>
                {new Date(quiz.untilDate).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
      </div>
    </div>
  );
}
