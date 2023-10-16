import { create } from "zustand";
import {
  addStudent,
  getStudents,
  updateStudent,
} from "../actions/masterActions";

const useStudentStore = create((set, get) => ({
  studentData: [],
  filteredStudentData: [],
  loading: false,
  hasErrors: false,
  statusMessage: "",
  selectedStudent: null,
  setSelectedStudent: (student) => {
    set(() => ({
      selectedStudent: student,
    }));
  },
  getStudents: async () => {
    set(() => ({
      loading: true,
    }));
    try {
      const response = await getStudents();
      const { status, data, error } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          studentData: data,
          filteredStudentData: data,
        }));
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
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getStudents();
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  updateStudent: async (formData) => {
    setInitial(set);
    try {
      const response = await updateStudent(formData);
      const { status, data, error } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getStudents();
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  filter: (searchTerm) => {
    const filteredStudentData = get().studentData.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phoneNumber.includes(searchTerm.toLowerCase())
    );
    set({ filteredStudentData: filteredStudentData });
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

export { useStudentStore };
