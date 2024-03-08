import {
  MAKEROOMSTART,
  GETROOMSUCCESS,
  GETUSERLIKEDPOSTSUCCESS,
  MAKEROOMFAILURE,
  MAKEROOMSUCCESS,
  GETPOSTDETAILSUCCESS,
} from "./action";

const INITIAL_STATE = {
  post: {},
  rooms: [],
  error: null,
  loading: false,
  message: null,
};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAKEROOMSTART:
      return {
        ...state,
        loading: true,
      };
    case GETROOMSUCCESS:
      return {
        ...state,
        loading: false,
        rooms: action.payload,
      };
    case GETUSERLIKEDPOSTSUCCESS:
      return {
        ...state,
        loading: false,
        // likedrooms: action.payload,
      };
    case GETPOSTDETAILSUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload,
      };
    case MAKEROOMSUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case MAKEROOMFAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: null
      };
    default:
      return state;
  }
};

export default postReducer;
