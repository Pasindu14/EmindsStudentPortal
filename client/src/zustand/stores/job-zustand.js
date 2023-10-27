import { create } from "zustand";
import {
  addJob,
  getJobs,
  removeJob,
  updateJob,
} from "../actions/master-actions";
import { ERROR_MESSAGE } from "../../core/constants/messages";

const useJobStore = create((set, get) => ({
  jobData: [],
  filteredJobData: [],
  loading: false,
  hasErrors: false,
  statusMessage: "",
  selectedJob: null,
  setSelectedJob: (job) => {
    set(() => ({
      selectedJob: job,
    }));
  },
  getJobs: async () => {
    set(() => ({
      loading: true,
    }));
    try {
      const response = await getJobs();
      const { status, data } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          jobData: data,
          filteredJobData: data,
          statusMessage: "",
        }));
      } else {
        setError(set);
      }
    } catch (_) {
      setError(set);
    }
  },
  addJob: async (formData) => {
    setInitial(set);
    try {
      const response = await addJob(formData);
      const { status, data } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getJobs();
      } else {
        setError(set);
      }
    } catch (_) {
      setError(set);
    }
  },
  updateJob: async (formData) => {
    setInitial(set);
    try {
      const response = await updateJob(formData);
      const { status, data } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getJobs();
      } else {
        setError(set);
      }
    } catch (_) {
      setError(set);
    }
  },
  removeJob: async (id) => {
    setInitial(set);
    try {
      const response = await removeJob(id);
      const { status, data, error } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getJobs();
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  filter: (searchTerm) => {
    const filteredJobData = get().jobData.filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    set({ filteredJobData: filteredJobData });
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

export { useJobStore };
