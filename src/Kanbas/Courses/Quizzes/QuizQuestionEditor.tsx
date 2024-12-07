import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function QuiznQuestionEditor() {
  const [activeTab, setActiveTab] = useState("multipleChoice");
  const [choices, setChoices] = useState([""]);

  const addChoice = () => {
    setChoices([...choices, ""]);
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
            onClick={() => setActiveTab("multipleChoice")}
          >
            Multiple Choice
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "fillInTheBlank" ? "active" : ""
            }`}
            onClick={() => setActiveTab("fillInTheBlank")}
          >
            Fill in the Blank
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
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Points</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter points for the question"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Question</label>
              <textarea
                className="form-control"
                placeholder="Enter the question content"
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
                  />
                  <textarea
                    className="form-control me-2"
                    placeholder={`Choice ${index + 1}`}
                  ></textarea>
                </div>
              ))}
              <button
                className="btn btn-outline-primary mt-2"
                onClick={addChoice}
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
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Points</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter points for the question"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Question</label>
              <textarea
                className="form-control"
                placeholder="Enter the question content with blanks (e.g., 'The capital of France is ____.')"
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Correct Answers</label>
              <textarea
                className="form-control"
                placeholder="Enter the correct answers, one per line"
              ></textarea>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AddQuizQuestion() {
  const [forms, setForms] = useState([<QuiznQuestionEditor key={0} />]);

  const addNewForm = () => {
    setForms([...forms, <QuiznQuestionEditor key={forms.length} />]);
  };

  return (
    <div className="mb-4">
      {forms}
      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-danger" onClick={addNewForm}>
          Add Another Question
        </button>
      </div>
    </div>
  );
}

export default function QuizBuilder() {
  const [quizSections, setQuizSections] = useState([
    <AddQuizQuestion key={0} />,
  ]);

  const addNewQuizSection = () => {
    setQuizSections([
      ...quizSections,
      <AddQuizQuestion key={quizSections.length} />,
    ]);
  };

  return <div>{quizSections}</div>;
}
