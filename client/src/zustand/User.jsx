import { create } from "zustand";
import { signInAction } from "../zustand/auth_action";

const useUserStore = create((set) => ({
  data: [],
  loading: false,
  hasErrors: false,
  errorMessage: "",
  signIn: async (formData) => {
    setInitial(set);
    try {
      const response = await signInAction(formData);
      const { status, data, error } = response.data;
      if (status === "failure") {
        setError(set, error);
      } else {
        setSuccess(set, data);
      }
    } catch (error) {
      setError(set, error);
    }
  },
}));

function setInitial(set) {
  set(() => ({ loading: true, errorMessage: "", hasErrors: false }));
}

function setSuccess(set, data) {
  set(() => ({
    hasErrors: false,
    loading: false,
    data: data,
  }));
}

function setError(set, error) {
  set(() => ({
    hasErrors: true,
    loading: false,
    errorMessage: error,
  }));
}

export { useUserStore };
