import { create } from "zustand";
import {
  addCourse,
  getCourses,
  removeCourse,
  updateCourse,
} from "../actions/master-actions";
import { ERROR_MESSAGE } from "../../core/constants/messages";

const useCourseStore = create((set, get) => ({
  courseData: [],
  filteredCourseData: [],
  loading: false,
  hasErrors: false,
  statusMessage: "",
  selectedCourse: null,
  setSelectedCourse: (course) => {
    set(() => ({
      selectedCourse: course,
    }));
  },
  getCourses: async () => {
    set(() => ({
      loading: true,
    }));
    try {
      const response = await getCourses();
      const { status, data } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          courseData: data,
          filteredCourseData: data,
          statusMessage: "",
        }));
      } else {
        setError(set);
      }
    } catch (error) {
      setError(set);
    }
  },
  addCourse: async (formData) => {
    setInitial(set);
    try {
      const response = await addCourse(formData);
      const { status, data, error } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getCourses();
      } else {
        setError(set, error);
      }
    } catch (_) {
      setError(set);
    }
  },
  updateCourse: async (formData) => {
    setInitial(set);
    try {
      const response = await updateCourse(formData);

      const { status, data } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getCourses();
      } else {
        setError(set);
      }
    } catch (_) {
      setError(set);
    }
  },
  removeCourse: async (id) => {
    setInitial(set);
    try {
      const response = await removeCourse(id);
      const { status, data } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getCourses();
      } else {
        setError(set);
      }
    } catch (error) {
      setError(set);
    }
  },
  filter: (searchTerm) => {
    const filteredCourseData = get().courseData.filter(
      (course) =>
        course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.course_code.includes(searchTerm)
    );
    set({ filteredCourseData: filteredCourseData });
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

export { useCourseStore };
