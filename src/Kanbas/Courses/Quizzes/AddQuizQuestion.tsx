import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as courseClient from "../client";
import * as quizClient from "./client";
import { Navigate, useNavigate, useParams } from "react-router";

function QuestionForm() {
  const [activeTab, setActiveTab] = useState("multipleChoice");
  const [choices, setChoices] = useState([""]);
  const [trueFalseAnswer, setTrueFalseAnswer] = useState("true");
  const [wysiwygContent, setWysiwygContent] = useState("");
  const { qid } = useParams();

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

  const defaultQuestion: Question = {
    _id: Date.now().toString(),
    quizId: qid ? qid : "", // Set the appropriate quiz ID dynamically
    type: "Multiple Choice", // Default type
    title: "", // Default empty title
    points: 0, // Default points
    choices: [], // Empty choices array for "Multiple Choice" type
    correctAnswers: [], // Empty array for "Fill in the Blank" type
    trueFalseAnswer: false, // Null for "True/False" until set
    createdAt: new Date(), // Default to the current timestamp
    updatedAt: new Date(), // Default to the current timestamp
  };

  const [question, setQuestion] = useState<Question>(defaultQuestion);
  const addChoice = () => {
    setChoices([...choices, ""]);
  };

  const handleCancel = () => {
    setActiveTab("multipleChoice");
    setChoices([""]);
    setTrueFalseAnswer("true");
    setWysiwygContent("");
    alert("Changes discarded!");
  };

  const handleSaveQuestion = () => {
    alert("Question saved!");
  };

  const saveQuestionToDatabase = async () => {
    if (!question) {
      alert("No question data to save!");
      return;
    }

    await quizClient.createQuestionForQuiz(question);
  };

  const updateQuestionField = (field: keyof Question, value: any) => {
    setQuestion((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="p-4 border rounded bg-light mb-4">
      <h4 className="mb-4">Add Question</h4>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "multipleChoice" ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab("multipleChoice");
              updateQuestionField("type", "Multiple Choice");
            }}
          >
            Multiple Choice
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "fillInTheBlank" ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab("fillInTheBlank");
              updateQuestionField("type", "Fill in the Blank");
            }}
          >
            Fill in the Blank
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "trueFalse" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("trueFalse");
              updateQuestionField("type", "True/False");
            }}
          >
            True/False Question
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "multipleChoice" && (
          <div>
            {/* Multiple Choice UI */}
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter question title"
                onChange={(e) => updateQuestionField("text", e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Points</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter points for the question"
                onChange={(e) =>
                  updateQuestionField("points", Number(e.target.value))
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Question</label>
              <textarea
                className="form-control"
                placeholder="Enter the question content"
                onChange={(e) => updateQuestionField("title", e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Choices</label>
              {choices.map((choice, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <input
                    type="radio"
                    name="correctChoice"
                    className="form-check-input me-2"
                    onClick={() =>
                      updateQuestionField(
                        "choices",
                        choices.map((c, i) =>
                          i === index
                            ? { choiceText: c, isCorrect: true }
                            : { choiceText: c, isCorrect: false }
                        )
                      )
                    }
                  />
                  <textarea
                    className="form-control me-2"
                    placeholder={`Choice ${index + 1}`}
                    onChange={(e) =>
                      setChoices(
                        choices.map((c, i) =>
                          i === index ? e.target.value : c
                        )
                      )
                    }
                  ></textarea>
                </div>
              ))}
              <button
                className="btn btn-outline-primary mt-2"
                onClick={() => setChoices([...choices, ""])}
              >
                Add Choice
              </button>
            </div>
          </div>
        )}

        {activeTab === "fillInTheBlank" && (
          <div>
            {/* Fill in the Blank UI */}
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter question title"
                onChange={(e) => updateQuestionField("text", e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Points</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter points for the question"
                onChange={(e) =>
                  updateQuestionField("points", Number(e.target.value))
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Question</label>
              <textarea
                className="form-control"
                placeholder="Enter the question content with blanks (e.g., 'The capital of France is ____.')"
                onChange={(e) => updateQuestionField("title", e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Correct Answer</label>
              <textarea
                className="form-control"
                placeholder="Enter the correct answer"
                onChange={(e) =>
                  updateQuestionField("correctAnswers", e.target.value)
                }
              ></textarea>
            </div>
          </div>
        )}

        {activeTab === "trueFalse" && (
          <div>
            {/* True/False UI */}
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter question title"
                onChange={(e) => updateQuestionField("text", e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Points</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter points for the question"
                onChange={(e) =>
                  updateQuestionField("title", Number(e.target.value))
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Question</label>
              <textarea
                className="form-control"
                onChange={(e) => updateQuestionField("title", e.target.value)}
                placeholder="Enter the question content"
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">True/False</label>
              <div className="form-check">
                <input
                  type="radio"
                  // id="trueOption"
                  name="trueFalseAnswer"
                  className="form-check-input"
                  checked={question.trueFalseAnswer === true}
                  onChange={() => updateQuestionField("trueFalseAnswer", true)}
                />
                {/* <label className="form-check-label" htmlFor="trueOption"> */}
                <label className="form-check-label">True</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  // id="falseOption"
                  name="trueFalseAnswer"
                  className="form-check-input"
                  checked={question.trueFalseAnswer === false}
                  onChange={() => updateQuestionField("trueFalseAnswer", false)}
                />
                {/* <label className="form-check-label" htmlFor="falseOption"> */}
                <label className="form-check-label">False</label>
              </div>
            </div>
          </div>
        )}
      </div>
      <button
        className="btn btn-primary"
        onClick={() => {
          saveQuestionToDatabase();
        }}
      >
        Save Question
      </button>
    </div>
  );
}

export default function AddQuizQuestion() {
  const [forms, setForms] = useState([<QuestionForm key={0} />]);
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

  const [questions, setQuestions] = useState<Question[]>([]); // Use the Question array type
  const { qid } = useParams();
  const [choices, setChoices] = useState([""]);
  const navigate = useNavigate();

  const addChoice = () => {
    setChoices([...choices, ""]);
  };

  const addNewForm = () => {
    setForms([...forms, <QuestionForm key={forms.length} />]);
  };

  const fetchQuestionsForQuiz = async () => {
    if (!qid) return;
    try {
      const questions = await quizClient.findQuestionsForQuiz(qid);
      setQuestions(questions);
    } catch (error) {}
  };

  useEffect(() => {
    fetchQuestionsForQuiz();
  }, [qid]);

  const handleUpdateQuestion = (
    index: number, // Index of the question to update
    field: keyof Question, // Field to update, restricted to keys of the Question interface
    value: any // Value to assign to the specified field
  ) => {
    const updatedQuestions = [...questions]; // Create a shallow copy of the questions array
    updatedQuestions[index] = {
      ...updatedQuestions[index], // Create a copy of the specific question object
      [field]: value, // Update the specified field with the new value
    };
    setQuestions(updatedQuestions); // Update the state with the new questions array
  };

  const saveQuestions = async () => {
    if (!questions || questions.length === 0) {
      alert("No questions to save.");
      return;
    }

    try {
      // Use Promise.all to handle multiple async calls
      await Promise.all(
        questions.map(async (question) => {
          await quizClient.updateQuestionsForQuiz(question);
        })
      );

      alert("Questions saved successfully!");
    } catch (error) {
      console.error("Error saving questions: ", error);
      alert("An error occurred while saving the questions. Please try again.");
    }
  };

  return (
    <div>
      {/* Render existing questions */}
      {questions.map((question, index) =>
        question.type === "Multiple Choice" ? (
          <div key={index} className="p-4 border rounded bg-light mb-4">
            {/* Multiple Choice UI */}
            <div className="mb-3">
              <label className="form-label">
                <b>Question {index + 1}: Multiple Choice</b>
              </label>
              <input
                type="text"
                className="form-control"
                value={question.text || ""}
                placeholder="Enter question title"
                onChange={(e) =>
                  handleUpdateQuestion(index, "text", e.target.value)
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Points</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter points for the question"
                value={question.points}
                onChange={(e) =>
                  handleUpdateQuestion(index, "points", Number(e.target.value))
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Question</label>
              <textarea
                className="form-control"
                placeholder="Enter the question content"
                value={question.title}
                onChange={(e) =>
                  handleUpdateQuestion(index, "title", e.target.value)
                }
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Choices</label>
              {question.choices?.map((choice, choiceIndex) => (
                <div
                  key={choiceIndex}
                  className="d-flex align-items-center mb-2"
                >
                  {/* Radio Button for Correct Choice */}
                  <input
                    type="radio"
                    name={`correctChoice-${index}`} // Unique name per question
                    className="form-check-input me-2"
                    checked={choice.isCorrect}
                    onChange={() => {
                      // Update the `isCorrect` field for the selected choice
                      const updatedChoices = question.choices?.map((c, i) => ({
                        ...c,
                        isCorrect: i === choiceIndex, // Set true only for the selected choice
                      }));
                      handleUpdateQuestion(index, "choices", updatedChoices);
                    }}
                  />
                  {/* Textarea for Choice Text */}
                  <textarea
                    className="form-control me-2"
                    value={choice.choiceText}
                    placeholder={`Choice ${choiceIndex + 1}`}
                    onChange={(e) => {
                      // Update the `choiceText` field for the specific choice
                      const updatedChoices = question.choices?.map((c, i) =>
                        i === choiceIndex
                          ? { ...c, choiceText: e.target.value }
                          : c
                      );
                      handleUpdateQuestion(index, "choices", updatedChoices);
                    }}
                  />
                  {/* Button to Remove Choice */}
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      // Remove the choice at the specific index
                      const updatedChoices = question.choices?.filter(
                        (_, i) => i !== choiceIndex
                      );
                      handleUpdateQuestion(index, "choices", updatedChoices);
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                className="btn btn-outline-primary mt-2"
                onClick={() => {
                  // Add a new choice to the current question
                  const newChoice = { choiceText: "", isCorrect: false };
                  const updatedChoices = [
                    ...(question.choices || []),
                    newChoice,
                  ];
                  handleUpdateQuestion(index, "choices", updatedChoices);
                }}
              >
                Add Choice
              </button>
            </div>
          </div>
        ) : question.type === "True/False" ? (
          <div key={index} className="p-4 border rounded bg-light mb-4">
            {/* True/False UI */}
            <div className="mb-3">
              <label className="form-label">
                <b>Question {index + 1}: True/False</b>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter question title"
                value={question.text}
                onChange={(e) =>
                  handleUpdateQuestion(index, "text", e.target.value)
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Points</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter points for the question"
                value={question.points}
                onChange={(e) =>
                  handleUpdateQuestion(index, "points", e.target.value)
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Question</label>
              <textarea
                className="form-control"
                placeholder="Enter the question content"
                value={question.title}
                onChange={(e) =>
                  handleUpdateQuestion(index, "title", e.target.value)
                }
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">True/False</label>
              <div className="form-check">
                <input
                  type="radio"
                  id="trueOption"
                  name="trueFalseAnswer"
                  value="true"
                  className="form-check-input"
                  checked={question.trueFalseAnswer === true}
                  onChange={() =>
                    handleUpdateQuestion(index, "trueFalseAnswer", true)
                  }
                />
                <label className="form-check-label" htmlFor="trueOption">
                  True
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="falseOption"
                  name="trueFalseAnswer"
                  value="false"
                  className="form-check-input"
                  checked={question.trueFalseAnswer === false}
                  onChange={() =>
                    handleUpdateQuestion(index, "trueFalseAnswer", false)
                  }
                />
                <label className="form-check-label" htmlFor="falseOption">
                  False
                </label>
              </div>
            </div>
          </div>
        ) : question.type === "Fill in the Blank" ? (
          <div key={index} className="p-4 border rounded bg-light mb-4">
            {/* Fill in the Blank UI */}
            <div className="mb-3">
              <label className="form-label">
                <b>Question {index + 1}: Fill in the Blank</b>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter question title"
                value={question.text}
                onChange={(e) =>
                  handleUpdateQuestion(index, "text", e.target.value)
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Points</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter points for the question"
                value={question.points}
                onChange={(e) =>
                  handleUpdateQuestion(index, "points", e.target.value)
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Question</label>
              <textarea
                className="form-control"
                value={question.title}
                placeholder="Enter the question content with blanks (e.g., 'The capital of France is ____.')"
                onChange={(e) =>
                  handleUpdateQuestion(index, "title", e.target.value)
                }
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Correct Answer</label>
              <textarea
                className="form-control"
                placeholder="Enter the correct answer"
                value={question.correctAnswers}
                onChange={(e) =>
                  handleUpdateQuestion(index, "correctAnswers", e.target.value)
                }
              ></textarea>
            </div>
          </div>
        ) : null
      )}

      {forms}
      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-danger" onClick={addNewForm}>
          Add Another Question
        </button>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button
          className="btn btn-secondary me-2"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          Cancel Editing Questions
        </button>
        <button
          className="btn btn-success"
          onClick={(e) => {
            e.preventDefault();
            saveQuestions();
            navigate(-1);
          }}
        >
          Save Edited Questions
        </button>
      </div>
    </div>
  );
}
