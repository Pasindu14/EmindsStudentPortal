import { create } from "zustand";
import {
  addQuestion,
  getQuestions,
  removeQuestion,
  updateQuestion,
  getBatches,
  getCourses,
  getExams,
} from "../actions/master-actions";
import { ERROR_MESSAGE } from "../../core/constants/messages";

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
        setError(set);
      }
    } catch (_) {
      setError(set);
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
        setError(set);
      }
    } catch (_) {
      setError(set);
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
        setError(set);
      }
    } catch (_) {
      setError(set);
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
    } catch (_) {
      setError(set);
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
        setError(set);
      }
    } catch (_) {
      setError(set);
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

function setError(set) {
  set(() => ({
    hasErrors: true,
    loading: false,
    statusMessage: ERROR_MESSAGE,
  }));
}

export { useQuestionStore };
