import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}`
  );
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz
  );
  return data;
};

export const findQuestionsForQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/questions`
  );
  return response.data;
};

export const updateQuestionsForQuiz = async (question: any) => {
  const response = await axiosWithCredentials.put(
    `${REMOTE_SERVER}/api/questions/${question._id}`,
    question
  );
  return response.data;
};

export const createQuestionForQuiz = async (question: any) => {
  console.log("Question payload", question.data);
  try {
    const response = await axiosWithCredentials.post(
      `${REMOTE_SERVER}/api/questions`,
      question
    );
    console.log("Saved question:", response.data);

    alert("Question added successfully!");
  } catch (error) {
    console.error("Error creating question:", error);
    alert("An error occurred while creating the question. Please try again.");
  }
};
