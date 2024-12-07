import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { Navigate, useNavigate, useParams } from "react-router";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";

export default function QuizControls({
  currentUser,
}: {
  currentUser: { role: string };
}) {
  const navigate = useNavigate();

  return (
    <div
      id="wd-quiz-controls"
      className="d-flex justify-content-between align-items-center mb-3"
    >
      <div className="input-group input-group-lg" style={{ maxWidth: "300px" }}>
        <span className="input-group-text bg-white border-end-0">
          <FaSearch />
        </span>
        <input
          id="wd-search-quiz"
          className="form-control form-control-lg border-start-0"
          type="text"
          placeholder="Search for Quiz"
        />
      </div>
      {currentUser.role === "FACULTY" ? (
        <div className="d-flex align-items-center">
          <button
            onClick={() => navigate(`./createQuiz`)}
            id="wd-add-quiz"
            className="btn btn-lg btn-danger me-1"
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Quiz
          </button>

          <button
            className="btn btn-lg border p-2 bg-light d-flex justify-content-center align-items-center"
            style={{ width: "50px", height: "50px" }}
          >
            <IoEllipsisVertical className="fs-4" />
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
