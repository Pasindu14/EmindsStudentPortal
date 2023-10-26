import { create } from "zustand";
import {
  addSession,
  getSessions,
  removeSession,
  updateSession,
  getBatches,
  getCourses,
  uploadSessionSlide,
} from "../actions/masterActions"; // Make sure you have sessionActions similar to masterActions

const useSessionStore = create((set, get) => ({
  sessionData: [],
  batchData: [],
  courseData: [],
  filteredSessionData: [],
  loading: false,
  hasErrors: false,
  statusMessage: "",
  selectedSession: null,
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
        setError(set, courseResponse.data.error || batchResponse.data.error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  setSelectedSession: (session) => {
    set(() => ({
      selectedSession: session,
    }));
  },
  getSessions: async () => {
    set(() => ({
      loading: true,
    }));
    try {
      const response = await getSessions();
      const { status, data, error } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          sessionData: data,
          filteredSessionData: data,
          statusMessage: "",
        }));
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  addSession: async (formData) => {
    setInitial(set);
    try {
      const response = await addSession(formData);
      const { status, data, error } = response.data;
      if (status === "success") {
        const lastInsertedId = response.data.data.insertId;

        const newFormData = new FormData();
        newFormData.append("lastInsertedId", lastInsertedId);
        newFormData.append("type", formData.get("type"));
        newFormData.append("imageFile", formData.get("imageFile"));

        const responseUpload = await uploadSessionSlide(newFormData);
        if (responseUpload.data.status === "success") {
          set(() => ({
            hasErrors: false,
            loading: false,
            statusMessage: data.message,
          }));
          await get().getSessions();
        }
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  updateSession: async (formData) => {
    setInitial(set);
    try {
      const response = await updateSession(formData);
      const { status, data, error } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getSessions();
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  removeSession: async (id) => {
    setInitial(set);
    try {
      const response = await removeSession(id);
      const { status, data, error } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getSessions();
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  filter: (searchTerm) => {
    const filteredSessionData = get().sessionData.filter(
      (session) =>
        session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.course_code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    set({ filteredSessionData: filteredSessionData });
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

export { useSessionStore };
