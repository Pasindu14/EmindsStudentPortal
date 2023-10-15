import { API } from "../api/utils";

export const getStudents = () => {
  try {
    const response = API.get("api/masters/getStudents", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const addStudent = (formData) => {
  try {
    const response = API.post("api/masters/addStudent", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};
