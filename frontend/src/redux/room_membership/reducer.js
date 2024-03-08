import {
  ROOMMEMBERSHIPSTART,
  GETALLROOMMEMBERSHIPSUCCESS,
  GETROOMMEMBERSHIPSUCCESS,
  ROOMMEMBERSHIPFAILURE,
  JOINROOMMEMBERSUCCESS,
} from "./action";

const INITIAL_STATE = {
  like: {},
  likes: [],
  error: null,
  likeLoading: false,
  message: null,
};

const likeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ROOMMEMBERSHIPSTART:
      return {
        ...state,
        likeLoading: true,
      };
    case GETALLROOMMEMBERSHIPSUCCESS:
      return {
        ...state,
        likeLoading: false,
        likes: action.payload,
      };
    case GETROOMMEMBERSHIPSUCCESS:
      return {
        ...state,
        likeLoading: false,
        like: action.payload,
      };
    case JOINROOMMEMBERSUCCESS:
      return {
        ...state,
        likeLoading: false,
        message: action.payload,
      };
    case ROOMMEMBERSHIPFAILURE:
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

export default likeReducer;
