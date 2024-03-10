import {
  MAKEROOMSTART,
  GETROOMSUCCESS,
  MAKEROOMFAILURE,
  MAKEROOMSUCCESS,
  GETROOMDETAILSUCCESS,
} from "./action";

const INITIAL_STATE = {
  room: {},
  rooms: [],
  error: null,
  loading: false,
  message: null,
};

const roomReducer = (state = INITIAL_STATE, action) => {
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
    case GETROOMDETAILSUCCESS:
      return {
        ...state,
        loading: false,
        room: action.payload,
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

export default roomReducer;
