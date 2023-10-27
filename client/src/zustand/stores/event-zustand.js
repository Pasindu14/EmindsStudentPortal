import { create } from "zustand";
import {
  addEvent,
  getEvents,
  removeEvent,
  updateEvent,
} from "../actions/master-actions";
import { ERROR_MESSAGE } from "../../core/constants/messages";

const useEventStore = create((set, get) => ({
  eventData: [],
  filteredEventData: [],
  loading: false,
  hasErrors: false,
  statusMessage: "",
  selectedEvent: null,
  setSelectedEvent: (event) => {
    set(() => ({
      selectedEvent: event,
    }));
  },
  getEvents: async () => {
    set(() => ({
      loading: true,
    }));
    try {
      const response = await getEvents();
      const { status, data } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          eventData: data,
          filteredEventData: data,
          statusMessage: "",
        }));
      } else {
        setError(set);
      }
    } catch (_) {
      setError(set);
    }
  },
  addEvent: async (formData) => {
    setInitial(set);
    try {
      const response = await addEvent(formData);
      const { status, data } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getEvents();
      } else {
        setError(set);
      }
    } catch (_) {
      setError(set);
    }
  },
  updateEvent: async (formData) => {
    setInitial(set);
    try {
      const response = await updateEvent(formData);
      const { status, data } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getEvents();
      } else {
        setError(set);
      }
    } catch (_) {
      setError(set);
    }
  },
  removeEvent: async (id) => {
    setInitial(set);
    try {
      const response = await removeEvent(id);
      const { status, data } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getEvents();
      } else {
        setError(set);
      }
    } catch (_) {
      setError(set);
    }
  },
  filter: (searchTerm) => {
    const filteredEventData = get().eventData.filter((event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    set({ filteredEventData: filteredEventData });
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
    filteredEventData: [],
    eventData: [],
  }));
}

export { useEventStore };
