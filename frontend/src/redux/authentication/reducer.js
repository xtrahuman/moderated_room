import {
  GETLOGINSTART,
  GETLOGINSUCCESS,
  GETLOGINFAILURE,
  LOGOUT,
  AUTHENTICATED,
  GETOTHERUSER,
  GETUSERSTART,
  GETUSERFAILURE,
} from "./action";

const INITIAL_STATE = {
  user: {},
  otherUser: {},
  error: null,
  otherUserError: null,
  userLoading: false,
  otherUserLoading: false,
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
        otherUserLoading: true,
        otherUserError: null,
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
    case GETOTHERUSER:
      return {
        ...state,
        otherUserLoading: false,
        otherUser: action.payload,
        otherUserError: null,
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
        otherUserLoading: false,
        otherUserError: action.payload,
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
