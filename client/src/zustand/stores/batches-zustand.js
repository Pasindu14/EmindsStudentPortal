import { create } from "zustand";
import {
  addBatch,
  getBatches,
  getCourses,
  removeBatch,
  updateBatch,
} from "../actions/master-actions";
import { ERROR_MESSAGE } from "../../core/constants/messages";

const useBatchStore = create((set, get) => ({
  courseData: [],
  batchData: [],
  filteredBatchData: [],
  loading: false,
  hasErrors: false,
  statusMessage: "",
  selectedBatch: null,
  loadCourseData: async () => {
    try {
      const [courseResponse] = await Promise.all([getCourses()]);
      if (courseResponse.data.status === "success") {
        set(() => ({
          courseData: courseResponse.data.data,
        }));
      } else {
        setError(set, courseResponse.data.error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  setSelectedBatch: (batch) => {
    console.log(batch);
    set(() => ({
      selectedBatch: batch,
    }));
  },
  getBatches: async () => {
    set(() => ({
      loading: true,
    }));
    try {
      const response = await getBatches();
      const { status, data } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          batchData: data,
          filteredBatchData: data,
          statusMessage: "",
        }));
      } else {
        setError(set);
      }
    } catch (error) {
      setError(set);
    }
  },
  addBatch: async (formData) => {
    setInitial(set);
    try {
      const response = await addBatch(formData);
      const { status, data } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getBatches();
      } else {
        setError(set);
      }
    } catch (_) {
      setError(set);
    }
  },
  updateBatch: async (formData) => {
    setInitial(set);
    try {
      const response = await updateBatch(formData);
      const { status, data } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getBatches();
      } else {
        setError(set);
      }
    } catch (error) {
      setError(set);
    }
  },
  removeBatch: async (id) => {
    setInitial(set);
    try {
      const response = await removeBatch(id);
      const { status, data } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getBatches();
      } else {
        setError(set);
      }
    } catch (_) {
      setError(set);
    }
  },
  filter: (searchTerm) => {
    const filteredBatchData = get().batchData.filter(
      (batch) =>
        batch.batch_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        batch.batch_no.includes(searchTerm)
    );
    set({ filteredBatchData: filteredBatchData });
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

export { useBatchStore };
