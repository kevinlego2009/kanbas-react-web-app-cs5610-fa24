import { useSelector } from "react-redux";
import AddQuizQuestion from "./AddQuizQuestion";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as quizClient from "./client";
import * as coursesClient from "../client";

export default function TakingQuiz() {
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

  interface Answer {
    questionId: string;
    selectedChoices?: string[]; // For Multiple Choice
    textAnswer?: string; // For Fill in the Blank
    trueFalseAnswer?: boolean; // For True/False
    isCorrect?: boolean;
  }

  const attempt: {
    quizId: string;
    userId: string;
    courseId: string;
    attemptNumber: number;
    score: number;
    answers: Answer[];
  } = {
    quizId: qid!,
    userId: currentUser._id,
    courseId: cid || "", // Use a comma here
    attemptNumber: 1, // Adjust for multiple attempts
    score: 0,
    answers: [],
  };

  const defaultQuizState = {
    courseId: "",
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
    dueDate: new Date(),
    availableDate: new Date(),
    untilDate: new Date(),
    isPublished: false,
    questions: [],
  };

  const [questions, setQuestions] = useState<Question[]>([]);
  const [quiz, setQuiz] = useState(defaultQuizState);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [submitted, setSubmitted] = useState(false);

  // Fetch questions and quiz details
  useEffect(() => {
    const fetchQuestionsForQuiz = async () => {
      if (!qid) return;
      try {
        const questions = await quizClient.findQuestionsForQuiz(qid);
        setQuestions(questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    const fetchQuiz = async () => {
      if (!qid) return;
      try {
        const quiz = await coursesClient.findQuizById(qid);
        setQuiz(quiz);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuestionsForQuiz();
    fetchQuiz();
  }, [qid]);

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // const handleSubmit = () => {
  //   setSubmitted(true);
  //   alert("Quiz submitted! (Static preview)");
  // };
  const handleSubmit = async () => {
    if (!qid || !currentUser) {
      alert("Quiz or user information is missing.");
      return;
    }

    const attempt: {
      quizId: string;
      userId: string;
      courseId: string;
      attemptNumber: number;
      score: number;
      answers: Answer[];
    } = {
      quizId: qid,
      userId: currentUser._id,
      courseId: cid || "",
      attemptNumber: 1,
      score: 0,
      answers: [],
    };

    let totalScore = 0;

    questions.forEach((question) => {
      const userAnswer = answers[question._id];
      const isCorrect =
        question.type === "Multiple Choice"
          ? question.choices?.some(
              (choice) => choice.isCorrect && choice.choiceText === userAnswer
            )
          : question.type === "True/False"
          ? userAnswer === "true" && question.trueFalseAnswer
          : question.type === "Fill in the Blank"
          ? userAnswer?.trim().toLowerCase() ===
            question.correctAnswers?.[0]?.trim().toLowerCase()
          : false;

      attempt.answers.push({
        questionId: question._id,
        selectedChoices:
          question.type === "Multiple Choice" ? [userAnswer] : undefined,
        textAnswer:
          question.type === "Fill in the Blank" ? userAnswer : undefined,
        trueFalseAnswer:
          question.type === "True/False" ? userAnswer === "true" : undefined,
        isCorrect,
      });

      if (isCorrect) {
        totalScore += question.points;
      }
    });

    attempt.score = totalScore;

    try {
      await quizClient.createAttempt(attempt);
      alert(`Quiz submitted! Your score: ${totalScore}`);
      navigate(`/Kanbas/Courses/${cid}/Quizzes`); // Replace with your desired navigation route
    } catch (error) {
      console.error("Error submitting attempt:", error);
      alert("An error occurred while submitting your quiz.");
    }
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Render only the current question
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      {currentQuestion && (
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            maxWidth: "800px",
            margin: "20px auto",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "20px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h1 style={{ fontSize: "20px", marginBottom: "10px" }}>
            {quiz.title}
          </h1>
          <p
            style={{
              color: "#e74c3c",
              fontSize: "14px",
              marginBottom: "20px",
            }}
          >
            {quiz.description}
          </p>
          <div
            style={{
              marginBottom: "20px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              backgroundColor: "#ffffff",
            }}
          >
            <div style={{ marginBottom: "15px" }}>
              <span style={{ fontWeight: "bold" }}>
                Question {currentQuestionIndex + 1}
              </span>
              <span style={{ float: "right" }}>
                {currentQuestion.points} pts
              </span>
            </div>
            <p style={{ fontSize: "14px", marginBottom: "15px" }}>
              {currentQuestion.title}
            </p>
            {currentQuestion.type === "Multiple Choice" &&
              currentQuestion.choices?.map((choice, idx) => (
                <label
                  key={idx}
                  style={{ display: "block", marginBottom: "10px" }}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion._id}`}
                    value={choice.choiceText}
                    checked={answers[currentQuestion._id] === choice.choiceText}
                    onChange={() =>
                      handleAnswerChange(currentQuestion._id, choice.choiceText)
                    }
                    style={{ marginRight: "8px" }}
                  />
                  {choice.choiceText}
                </label>
              ))}
            {currentQuestion.type === "Fill in the Blank" && (
              <input
                type="text"
                placeholder="Type your answer here"
                value={answers[currentQuestion._id] || ""}
                onChange={(e) =>
                  handleAnswerChange(currentQuestion._id, e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              />
            )}
            {currentQuestion.type === "True/False" && (
              <>
                <label style={{ display: "block", marginBottom: "10px" }}>
                  <input
                    type="radio"
                    name={`question-${currentQuestion._id}`}
                    value="true"
                    checked={answers[currentQuestion._id] === "true"}
                    onChange={() =>
                      handleAnswerChange(currentQuestion._id, "true")
                    }
                    style={{ marginRight: "8px" }}
                  />
                  True
                </label>
                <label style={{ display: "block", marginBottom: "10px" }}>
                  <input
                    type="radio"
                    name={`question-${currentQuestion._id}`}
                    value="false"
                    checked={answers[currentQuestion._id] === "false"}
                    onChange={() =>
                      handleAnswerChange(currentQuestion._id, "false")
                    }
                    style={{ marginRight: "8px" }}
                  />
                  False
                </label>
              </>
            )}
          </div>
          <div style={{ textAlign: "right", marginTop: "20px" }}>
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePrevious}
                style={{
                  backgroundColor: "#f1f1f1",
                  color: "black",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  cursor: "pointer",
                  fontSize: "14px",
                  marginRight: "10px",
                }}
              >
                ◀ Previous
              </button>
            )}
            {currentQuestionIndex < questions.length - 1 && (
              <button
                onClick={handleNext}
                style={{
                  backgroundColor: "#f1f1f1",
                  color: "black",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  cursor: "pointer",
                  fontSize: "14px",
                  marginRight: "10px",
                }}
              >
                Next ▶
              </button>
            )}
            {currentQuestionIndex === questions.length - 1 && (
              <button
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#f1f1f1",
                  color: "black",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
