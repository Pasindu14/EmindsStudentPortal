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
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};
