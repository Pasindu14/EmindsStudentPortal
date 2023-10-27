import { create } from "zustand";
import {
  addExam,
  getExams,
  removeExam,
  updateExam,
  getBatches,
  getCourses,
} from "../actions/master-actions";
import { ERROR_MESSAGE } from "../../core/constants/messages";

const useExamStore = create((set, get) => ({
  examData: [],
  batchData: [],
  courseData: [],
  filteredExamData: [],
  loading: false,
  hasErrors: false,
  statusMessage: "",
  selectedExam: null,
  loadCourseAndBatchData: async () => {
    try {
      const [courseResponse, batchResponse] = await Promise.all([
        getCourses(),
        getBatches(),
      ]);
      if (
        courseResponse.data.status === "success" &&
        batchResponse.data.status === "success"
      ) {
        set(() => ({
          courseData: courseResponse.data.data,
          batchData: batchResponse.data.data,
        }));
      } else {
        setError(setInitial);
      }
    } catch (_) {
      setError(set);
    }
  },
  setSelectedExam: (exam) => {
    set(() => ({
      selectedExam: exam,
    }));
  },
  getExams: async () => {
    set(() => ({
      loading: true,
    }));
    try {
      const response = await getExams();
      const { status, data, error } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          examData: data,
          filteredExamData: data,
          statusMessage: "",
        }));
      } else {
        setError(set, error);
      }
    } catch (_) {
      setError(set);
    }
  },
  addExam: async (formData) => {
    setInitial(set);
    try {
      const response = await addExam(formData);
      const { status, data, error } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getExams();
      } else {
        setError(set, error);
      }
    } catch (_) {
      setError(set);
    }
  },
  updateExam: async (formData) => {
    setInitial(set);
    try {
      const response = await updateExam(formData);
      const { status, data } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getExams();
      } else {
        setError(set);
      }
    } catch (_) {
      setError(set);
    }
  },
  removeExam: async (id) => {
    setInitial(set);
    try {
      const response = await removeExam(id);
      const { status, data } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getExams();
      } else {
        setError(set);
      }
    } catch (_) {
      setError(set);
    }
  },
  filter: (searchTerm) => {
    const filteredExamData = get().examData.filter(
      (exam) =>
        exam.exam_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.course_code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    set({ filteredExamData: filteredExamData });
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

export { useExamStore };
