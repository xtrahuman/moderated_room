import {
  LIKESTART,
  GETLIKESUCCESS,
  LIKEFAILURE,
  CREATELIKESUCCESS,
} from "./action";

const INITIAL_STATE = {
  commentLikes: [],
  error: null,
  likeLoading: false,
  message: null,
};

const commentLikeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIKESTART:
      return {
        ...state,
        likeLoading: true,
      };
    case GETLIKESUCCESS:
      return {
        ...state,
        likeLoading: false,
        commentLikes: action.payload,
      };
    case CREATELIKESUCCESS:
      return {
        ...state,
        likeLoading: false,
        message: action.payload,
      };
    case LIKEFAILURE:
      return {
        ...state,
        likeLoading: false,
        error: action.payload,
        message: null
      };
    default:
      return state;
  }
};

export default commentLikeReducer;
