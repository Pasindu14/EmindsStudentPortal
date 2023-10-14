import { API } from "../redux/api/utils";

export const signInAction = async (formData) => {
  try {
    const repo = await API.post("api/users/signIn", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return repo;
  } catch (error) {
    console.error("There was an error fetching data", error);
  }
};
