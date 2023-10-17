import { create } from "zustand";
import {
  addCourse,
  getCourses,
  removeCourse,
  updateCourse,
} from "../actions/masterActions";

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
      const { status, data, error } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          courseData: data,
          filteredCourseData: data,
          statusMessage: "",
        }));
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
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
    } catch (error) {
      setError(set, error);
    }
  },
  updateCourse: async (formData) => {
    setInitial(set);
    try {
      const response = await updateCourse(formData);

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
    } catch (error) {
      setError(set, error);
    }
  },
  removeCourse: async (id) => {
    setInitial(set);
    try {
      const response = await removeCourse(id);
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
    } catch (error) {
      setError(set, error);
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

function setError(set, error) {
  set(() => ({
    hasErrors: true,
    loading: false,
    statusMessage: error,
  }));
}

export { useCourseStore };
