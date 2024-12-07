// actions.js
export const ADD_TEMP_QUESTION = "ADD_TEMP_QUESTION";
export const CLEAR_TEMP_QUESTIONS = "CLEAR_TEMP_QUESTIONS";

export const addTempQuestion = (question) => ({
  type: ADD_TEMP_QUESTION,
  payload: question,
});

export const clearTempQuestions = () => ({
  type: CLEAR_TEMP_QUESTIONS,
});
