import { API } from "../api/utils";

export const uploadImages = async (formData) => {
  try {
    const response = await API.post("api/uploadImages", formData);
    return response;
  } catch (error) {
    return error;
  }
};
