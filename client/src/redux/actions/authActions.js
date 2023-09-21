import * as api from "../api/authAPI";
import * as types from "../constants/authConstants";

export const signInAction = (formData, navigate) => async (dispatch) => {
  try {
    const response = await api.signIn(formData);

    const { error, data } = response;
    if (error) {
      dispatch({
        type: types.SIGNIN_FAIL,
        payload: error,
      });
    } else {
      const profile = {
        sadsd: "asdasd",
      };
      localStorage.setItem("profile", JSON.stringify(profile));
      dispatch({
        type: types.SIGNIN_SUCCESS,
        payload: profile,
      });
      navigate("/asdsad");
    }
  } catch (error) {
    await dispatch({
      type: types.SIGNIN_FAIL,
      payload: types.ERROR_MESSAGE,
    });
    navigate("/signin");
  }
};
