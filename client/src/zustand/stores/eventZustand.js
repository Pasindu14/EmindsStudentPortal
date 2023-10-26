import { create } from "zustand";
import {
  addEvent,
  getEvents,
  removeEvent,
  updateEvent,
} from "../actions/masterActions";

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
      const { status, data, error } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          eventData: data,
          filteredEventData: data,
          statusMessage: "",
        }));
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  addEvent: async (formData) => {
    setInitial(set);
    try {
      const response = await addEvent(formData);
      const { status, data, error } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getEvents();
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  updateEvent: async (formData) => {
    setInitial(set);
    try {
      const response = await updateEvent(formData);
      const { status, data, error } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getEvents();
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  removeEvent: async (id) => {
    setInitial(set);
    try {
      const response = await removeEvent(id);
      const { status, data, error } = response.data;
      if (status === "success") {
        set(() => ({
          hasErrors: false,
          loading: false,
          statusMessage: data,
        }));
        await get().getEvents();
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  filter: (searchTerm) => {
    const filteredEventData = get().eventData.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.event_auto_id.toString().includes(searchTerm)
    );
    set({ filteredEventData: filteredEventData });
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
    filteredEventData: [],
    eventData: [],
  }));
}

export { useEventStore };
