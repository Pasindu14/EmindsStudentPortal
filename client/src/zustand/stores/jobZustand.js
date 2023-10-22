import { create } from "zustand";
import {
  addJob,
  getJobs,
  removeJob,
  updateJob,
} from "../actions/masterActions";

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
      const { status, data, error } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          jobData: data,
          filteredJobData: data,
          statusMessage: "",
        }));
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  addJob: async (formData) => {
    setInitial(set);
    try {
      const response = await addJob(formData);
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
  updateJob: async (formData) => {
    setInitial(set);
    try {
      const response = await updateJob(formData);
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
    const filteredJobData = get().jobData.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.job_auto_id.toString().includes(searchTerm)
    );
    set({ filteredJobData: filteredJobData });
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

export { useJobStore };
