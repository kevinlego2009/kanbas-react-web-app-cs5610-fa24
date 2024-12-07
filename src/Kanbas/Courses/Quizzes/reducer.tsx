import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { quizzes } from "../../Database";

const initialState = {
  quizzes: quizzes,
};
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: any = {
        _id: new Date().getTime().toString(),
        ...quiz,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },
    deleteQuiz: (state, { payload: quizID }) => {
      state.quizzes = state.quizzes.filter((a: any) => a._id !== quizID);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((a: any) =>
        a._id === quiz._id ? quiz : a
      ) as any;
    },
    editQuiz: (state, { payload: quizID }) => {
      state.quizzes = state.quizzes.map((a: any) =>
        a._id === quizID ? { ...a, editing: true } : a
      ) as any;
    },
  },
});
export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz, editQuiz } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;
