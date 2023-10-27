import { create } from "zustand";
import {
  addStudent,
  getStudents,
  removeStudent,
  updateStudent,
} from "../actions/master-actions";
import { ERROR_MESSAGE } from "../../core/constants/messages";

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
      const { status, data } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          studentData: data,
          filteredStudentData: data,
          statusMessage: "",
        }));
      } else {
        setError(set);
      }
    } catch (_) {
      setError(set);
    }
  },
  addStudent: async (formData) => {
    setInitial(set);
    try {
      const response = await addStudent(formData);
      const { status, data } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getStudents();
      } else {
        setError(set);
      }
    } catch (error) {
      setError(set);
    }
  },
  updateStudent: async (formData) => {
    setInitial(set);
    try {
      const response = await updateStudent(formData);

      const { status, data } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getStudents();
      } else {
        setError(set);
      }
    } catch (error) {
      setError(set);
    }
  },
  removeStudent: async (id) => {
    setInitial(set);
    try {
      const response = await removeStudent(id);
      const { status, data } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getStudents();
      } else {
        setError(set);
      }
    } catch (error) {
      setError(set);
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

function setError(set) {
  set(() => ({
    hasErrors: true,
    loading: false,
    statusMessage: ERROR_MESSAGE,
  }));
}

export { useStudentStore };
