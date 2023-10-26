import { create } from "zustand";
import {
  addMapping,
  getMappings,
  removeMapping,
  updateMapping,
  updateBlockingStatus,
  getCourses,
  getBatches,
  getStudents,
} from "../../actions/masterActions";
const useMappingStore = create((set, get) => ({
  mappingData: [],
  filteredMappingData: [],
  studentsData: [],
  loading: false,
  hasErrors: false,
  statusMessage: "",
  selectedMapping: null,
  loadCourseBatchAndStudentData: async () => {
    try {
      const [courseResponse, batchResponse, studentResponse] =
        await Promise.all([getCourses(), getBatches(), getStudents()]);
      if (
        courseResponse.data.status === "success" &&
        batchResponse.data.status === "success" &&
        studentResponse.data.status === "success"
      ) {
        set(() => ({
          courseData: courseResponse.data.data,
          batchData: batchResponse.data.data,
          studentData: studentResponse.data.data,
        }));
      } else {
        setError(
          set,
          courseResponse.data.error ||
            batchResponse.data.error ||
            studentResponse.data.error
        );
      }
    } catch (error) {
      setError(set, error);
    }
  },
  getMappings: async () => {
    set({ loading: true });
    try {
      const response = await getMappings();
      const { status, data, error } = response.data;
      if (status === "success") {
        set({
          hasErrors: false,
          loading: false,
          mappingData: data,
          filteredMappingData: data,
        });
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  addMapping: async (course, batch, students) => {
    try {
      set({ loading: true });

      const insertOperations = students.map(async (student) => {
        const formData = new FormData();
        formData.append("batch_auto_id", batch);
        formData.append("student_auto_id", student.value);
        formData.append("block_status", "0");

        const response = await addMapping(formData);
        const { status, error } = response.data;

        if (status === "success") {
          return true;
        } else {
          setError(set, error);
          return false;
        }
      });

      const results = await Promise.all(insertOperations);
      console.log("results", results);
      if (results.every((result) => result === true)) {
        set({
          hasErrors: false,
          loading: false,
          statusMessage: "All mappings added successfully",
        });
        await get().getMappings();
      } else {
        set({
          hasErrors: true,
          loading: false,
          statusMessage: "Some mappings could not be added",
        });
      }
    } catch (error) {
      setError(set, error);
      set({ loading: false });
    }
  },
  updateMapping: async (formData) => {
    try {
      const response = await updateMapping(formData);
      const { status, data, error } = response.data;
      if (status === "success") {
        set({ hasErrors: false, loading: false, statusMessage: data });
        await get().getMappings();
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  updateBlockingStatus: async (formData) => {
    try {
      const response = await updateBlockingStatus(formData);
      const { status, data, error } = response.data;
      if (status === "success") {
        set({ hasErrors: false, loading: false, statusMessage: data });
        await get().getMappings();
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  removeMapping: async (id) => {
    try {
      const response = await removeMapping(id);
      const { status, data, error } = response.data;
      if (status === "success") {
        set({ hasErrors: false, loading: false, statusMessage: data });
        await get().getMappings();
      } else {
        setError(set, error);
      }
    } catch (error) {
      setError(set, error);
    }
  },
  filter: (searchTerm) => {
    const filteredMappingData = get().mappingData.filter(
      (mappedData) =>
        mappedData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mappedData.course_code.toString().includes(searchTerm) ||
        mappedData.nic.toString().includes(searchTerm)
    );
    set({ filteredMappingData: filteredMappingData });
  },

  setSelectedMapping: (mapping) => {
    set({ selectedMapping: mapping });
  },
}));

function setError(set, error) {
  set({ hasErrors: true, loading: false, statusMessage: error });
}

export { useMappingStore };
