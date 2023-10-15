import { create } from "zustand";
import { addStudent, getStudents } from "../actions/masterActions";

const useStudentStore = create((set, get) => ({
  studentData: [],
  filteredStudentData: [],
  loading: false,
  hasErrors: false,
  errorMessage: "",
  getStudents: async () => {
    setInitial(set);
    try {
      const response = await getStudents();
      const { status, data, error } = response.data;
      if (status === "success") {
        setSuccess(set, data);
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  addStudent: async (formData) => {
    setInitial(set);
    try {
      const response = await addStudent(formData);
      const { status, data, error } = response.data;
      if (status === "success") {
        setDefaultSuccess(set, data);
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
    }
  },

  filter: async (searchTerm) => {
    const filteredStudentData = get().studentData.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phoneNumber.includes(searchTerm.toLowerCase())
    );

    set({ filteredStudentData: filteredStudentData });
  },
}));

function setInitial(set) {
  set(() => ({ loading: true, errorMessage: "", hasErrors: false }));
}

function setSuccess(set, data) {
  set(() => ({
    hasErrors: false,
    loading: false,
    studentData: data,
    filteredStudentData: data,
  }));
}

function setDefaultSuccess(set, data) {
  set(() => ({
    hasErrors: false,
    loading: false,
  }));
}

function setError(set, error) {
  set(() => ({
    hasErrors: true,
    loading: false,
    errorMessage: error,
  }));
}

export { useStudentStore };
