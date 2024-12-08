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

export const createAttempt = async (attempt: any) => {
  console.log("Attempt payload", attempt.data);
  try {
    const response = await axiosWithCredentials.post(
      `${REMOTE_SERVER}/api/attempts`,
      attempt
    );
    console.log("Saved attempt:", response.data);
    alert("Attempt saved successfully!");
  } catch (error) {
    console.error("Error creating attempt:", error);
    alert("An error occurred while creating an attempt. Please try again.");
  }
};

export const findAttemptsByQuizAndCourse = async (
  userId: string,
  courseId: string
) => {
  try {
    const attempts = await axiosWithCredentials.get(
      `${REMOTE_SERVER}/api/users/${userId}/attempts`
    );
    const filteredAttempts = attempts.data.filter(
      (attempt: any) => attempt.courseId === courseId
    );
    return filteredAttempts;
  } catch (error) {
    console.error("Error finding attempts:", error);
    alert("An error occurred while fetching attempts. Please try again.");
    return [];
  }
};

// export const findAttemptByQuizAndUser = async (
//   quizId: string,
//   userId: string
// ) => {
//   try {
//     const attempts = await axiosWithCredentials.get(
//       `${REMOTE_SERVER}/api/users/${userId}/attempts/${quizId}`
//     );
//     // const filteredAttempts = attempts.data.filter(
//     //   (attempt: any) => attempt.courseId === courseId
//     // );
//     return attempts;
//   } catch (error) {
//     console.error("Error finding attempts:", error);
//     alert("An error occurred while fetching attempts. Please try again.");
//     return [];
//   }
// };

interface Answer {
  questionId: string;
  selectedChoices?: string[];
  textAnswer?: string;
  trueFalseAnswer?: boolean;
  isCorrect?: boolean;
}

interface Attempt {
  quizId: string;
  userId: string;
  courseId: string;
  attemptNumber: number;
  score: number;
  answers: Answer[];
}
export const findAttemptByQuizAndUser = async (
  quizId: string,
  userId: string
): Promise<{ data: Attempt | null }> => {
  try {
    const response = await axiosWithCredentials.get(
      `${REMOTE_SERVER}/api/users/${userId}/attempts/${quizId}`
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error fetching attempt by quiz and user:", error);
    return { data: null }; // Return null if there's an error
  }
};
