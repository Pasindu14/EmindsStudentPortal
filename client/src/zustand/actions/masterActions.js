import { API } from "../api/utils";

export const getStudents = async () => {
  try {
    const response = await API.get("api/masters/getStudents", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const addStudent = async (formData) => {
  try {
    const response = await API.post("api/masters/addStudent", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const updateStudent = async (formData) => {
  try {
    const response = await API.put("/api/masters/updateStudent", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const removeStudent = async (id) => {
  try {
    const response = await API.delete("/api/masters/removeStudent", {
      headers: {
        "Content-Type": "application/json",
      },
      data: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getCourses = async () => {
  try {
    const response = await API.get("api/courses/getCourses", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Add a new course
export const addCourse = async (formData) => {
  try {
    const response = await API.post("api/courses/addCourse", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Update an existing course
export const updateCourse = async (formData) => {
  try {
    const response = await API.put("api/courses/updateCourse", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Remove a course
export const removeCourse = async (id) => {
  try {
    const response = await API.delete("api/courses/removeCourse", {
      headers: {
        "Content-Type": "application/json",
      },
      data: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Get all batches
export const getBatches = async () => {
  try {
    const response = await API.get("api/batches/getBatches", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Add a new batch
export const addBatch = async (formData) => {
  try {
    const response = await API.post("api/batches/addBatch", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Update an existing batch
export const updateBatch = async (formData) => {
  try {
    const response = await API.put("api/batches/updateBatch", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Remove a batch
export const removeBatch = async (id) => {
  try {
    const response = await API.delete("api/batches/removeBatch", {
      headers: {
        "Content-Type": "application/json",
      },
      data: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Get all exams
export const getExams = async () => {
  try {
    const response = await API.get("api/exams/getExams", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Add a new exam
export const addExam = async (formData) => {
  try {
    const response = await API.post("api/exams/addExam", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Update an existing exam
export const updateExam = async (formData) => {
  try {
    const response = await API.put("api/exams/updateExam", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Remove an exam
export const removeExam = async (id) => {
  try {
    const response = await API.delete("api/exams/removeExam", {
      headers: {
        "Content-Type": "application/json",
      },
      data: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Get all jobs
export const getJobs = async () => {
  try {
    const response = await API.get("api/jobs/getJobs", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Add a new job
export const addJob = async (formData) => {
  try {
    const response = await API.post("api/jobs/addJob", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Update an existing job
export const updateJob = async (formData) => {
  try {
    const response = await API.put("api/jobs/updateJob", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Remove a job
export const removeJob = async (id) => {
  try {
    const response = await API.delete("api/jobs/removeJob", {
      headers: {
        "Content-Type": "application/json",
      },
      data: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Get all questions
export const getQuestions = async () => {
  try {
    const response = await API.get("api/questions/getQuestions", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Add a new question
export const addQuestion = async (formData) => {
  try {
    const response = await API.post("api/questions/addQuestion", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Update an existing question
export const updateQuestion = async (formData) => {
  try {
    const response = await API.put("api/questions/updateQuestion", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Remove a question
export const removeQuestion = async (id) => {
  try {
    const response = await API.delete("api/questions/removeQuestion", {
      headers: {
        "Content-Type": "application/json",
      },
      data: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Get all events
export const getEvents = async () => {
  try {
    const response = await API.get("api/events/getEvents", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Add a new event
export const addEvent = async (formData) => {
  try {
    const response = await API.post("api/events/addEvent", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Update an existing event
export const updateEvent = async (formData) => {
  try {
    const response = await API.put("api/events/updateEvent", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Remove an event
export const removeEvent = async (id) => {
  try {
    const response = await API.delete("api/events/removeEvent", {
      headers: {
        "Content-Type": "application/json",
      },
      data: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};
