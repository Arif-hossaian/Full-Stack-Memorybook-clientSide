import { AUTH } from "../Constants/actionTypes";
import * as API from "../Api";

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await API.signIn(formData);
    dispatch({
      type: AUTH,
      data,
    });
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await API.signUp(formData);
    dispatch({
      type: AUTH,
      data,
    });
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
