import * as types from "../constants/authConstants";

const initialState = {
  userData: null,
  accessToken: null,
  signInError: null,
  signUpError: [],
  successMessage: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.SIGNIN_FAIL:
      return {
        ...state,
        successMessage: null,
        signUpError: [],
        signInError: payload ? payload : null,
      };
    case types.SIGNIN_SUCCESS:
      return {
        ...state,
        userData: payload ? payload.user : null,
        accessToken: payload ? payload.accessToken : null,
        refreshToken: payload ? payload.refreshToken : null,
        signInError: null,
        successMessage: payload ? payload : null,
      };

    default:
      return state;
  }
};

export default authReducer;
