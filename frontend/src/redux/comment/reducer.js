import {
  COMMENTSTART,
  GETCOMMENTSUCCESS,
  COMMENTFAILURE,
  CREATECOMMENTSUCCESS,
} from "./action";

const INITIAL_STATE = {
  comments: [],
  commentError: null,
  commentLoading: false,
  commentMessage: null,
};

const commentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COMMENTSTART:
      return {
        ...state,
        commentLoading: true,
      };
    case GETCOMMENTSUCCESS:
      return {
        ...state,
        commentLoading: false,
        comments: action.payload,
      };
    case CREATECOMMENTSUCCESS:
      return {
        ...state,
        commentLoading: false,
        commentMessage: action.payload,
      };
    case COMMENTFAILURE:
      return {
        ...state,
        commentLoading: false,
        commentError: action.payload,
        commentMessage: null
      };
    default:
      return state;
  }
};

export default commentReducer;
