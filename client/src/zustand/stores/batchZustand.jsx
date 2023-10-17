import { create } from "zustand";
import {
  addBatch,
  getBatches,
  removeBatch,
  updateBatch,
} from "../actions/masterActions"; // Make sure you have batchActions similar to masterActions

const useBatchStore = create((set, get) => ({
  batchData: [],
  filteredBatchData: [],
  loading: false,
  hasErrors: false,
  statusMessage: "",
  selectedBatch: null,
  setSelectedBatch: (batch) => {
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
      const { status, data, error } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          batchData: data,
          filteredBatchData: data,
          statusMessage: "",
        }));
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  addBatch: async (formData) => {
    setInitial(set);
    try {
      const response = await addBatch(formData);
      const { status, data, error } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getBatches();
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  updateBatch: async (formData) => {
    setInitial(set);
    try {
      const response = await updateBatch(formData);

      const { status, data, error } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getBatches();
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  removeBatch: async (id) => {
    setInitial(set);
    try {
      const response = await removeBatch(id);
      const { status, data, error } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getBatches();
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
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

function setError(set, error) {
  set(() => ({
    hasErrors: true,
    loading: false,
    statusMessage: error,
  }));
}

export { useBatchStore };
