import { AUTH, LOGOUT } from "../Constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      //here this action?.data(optional chain operator is used to get exact output without an unnessesary error log) return json obj value which has user email, username, client id..when we log in using any email
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
