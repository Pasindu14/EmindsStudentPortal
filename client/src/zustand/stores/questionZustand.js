import { create } from "zustand";
import {
  addQuestion,
  getQuestions,
  removeQuestion,
  updateQuestion,
  getBatches,
  getCourses,
  getExams,
} from "../actions/masterActions"; // Make sure you have questionActions similar to masterActions

const useQuestionStore = create((set, get) => ({
  questionData: [],
  batchData: [],
  courseData: [],
  examData: [],
  filteredQuestionData: [],
  loading: false,
  hasErrors: false,
  statusMessage: "",
  selectedQuestion: null,
  loadCourseAndBatchAndExamData: async () => {
    try {
      const [courseResponse, batchResponse, examResponse] = await Promise.all([
        getCourses(),
        getBatches(),
        getExams(),
      ]);
      if (
        courseResponse.data.status === "success" &&
        batchResponse.data.status === "success" &&
        examResponse.data.status === "success"
      ) {
        set(() => ({
          courseData: courseResponse.data.data,
          batchData: batchResponse.data.data,
          examData: examResponse.data.data,
        }));
      } else {
        setError(
          set,
          courseResponse.data.error ||
            batchResponse.data.error ||
            examResponse.data.error
        );
      }
    } catch (error) {
      setError(set, error);
    }
  },
  setSelectedQuestion: (question) => {
    set(() => ({
      selectedQuestion: question,
    }));
  },
  getQuestions: async () => {
    set(() => ({
      loading: true,
    }));
    try {
      const response = await getQuestions();
      const { status, data, error } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          questionData: data,
          filteredQuestionData: data,
          statusMessage: "",
        }));
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  addQuestion: async (formData) => {
    setInitial(set);
    try {
      const response = await addQuestion(formData);
      const { status, data, error } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getQuestions();
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  updateQuestion: async (formData) => {
    setInitial(set);
    try {
      const response = await updateQuestion(formData);
      const { status, data, error } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getQuestions();
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  removeQuestion: async (id) => {
    setInitial(set);
    try {
      const response = await removeQuestion(id);
      const { status, data, error } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getQuestions();
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  filter: (searchTerm) => {
    const filteredQuestionData = get().questionData.filter(
      (question) =>
        question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.course_name.toString().includes(searchTerm) ||
        question.batch_name.toString().includes(searchTerm)
    );
    set({ filteredQuestionData: filteredQuestionData });
  },
}));

function setInitial(set) {
  set(() => ({ loading: true, statusMessage: "", hasErrors: false }));
}

function setError(set, error) {
  set(() => ({
    hasErrors: true,
    loading: false,
    statusMessage: error,
  }));
}

export { useQuestionStore };
