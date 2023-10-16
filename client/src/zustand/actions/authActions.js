import { API } from "../api/utils";

export const signInAction = async (formData) => {
  try {
    const response = await API.post("api/users/signIn", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("There was an error fetching data", error);
    return error;
  }
};

export const signOut = (async) => {};
