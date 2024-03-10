import {
  GETLOGINSTART,
  GETLOGINSUCCESS,
  GETLOGINFAILURE,
  LOGOUT,
  AUTHENTICATED,
  GETOTHERUSERS,
  GETUSERSTART,
  GETUSERFAILURE,
} from "./action";

const INITIAL_STATE = {
  user: {},
  otherUsers: [],
  error: null,
  otherUsersError: null,
  userLoading: true,
  otherUsersLoading: false,
  loggedin: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GETLOGINSTART:
      return {
        ...state,
        userLoading: true,
        message: null,
        loggedin: false,
        error: null,
      };
    case GETUSERSTART:
      return {
        ...state,
        otherUsersLoading: true,
        otherUsersError: null,
      };
    case GETLOGINSUCCESS:
    case AUTHENTICATED:
      return {
        ...state,
        userLoading: false,
        user: action.payload,
        loggedin: true,
        error: null,
      };
    case GETOTHERUSERS:
      return {
        ...state,
        otherUsersLoading: false,
        otherUsers: action.payload,
        otherUsersError: null,
      };
    case GETLOGINFAILURE:
      return {
        ...state,
        userLoading: false,
        error: action.payload,
        message: null,
        loggedin: false,
      };
    case GETUSERFAILURE:
      return {
        ...state,
        otherUsersLoading: false,
        otherUsersError: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        userLoading: false,
        loggedin: false,
        error: null,
        user: {},
      };
    default:
      return state;
  }
};

export default userReducer;
