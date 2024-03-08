import {
  MESSAGELOADINGSTART,
  MESSAGESUCCESS,
  MESSAGEFAILURE,
  CREATEMESSAGESUCCESS,
  USERRECIEPIENTMESSAGESUCCESS,
} from "./action";

const INITIAL_STATE = {
  userRecieverMessages: [],
  messageSummary: [],
  error: null,
  messageLoading: false,
  message: null,
};

const messageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MESSAGELOADINGSTART:
      return {
        ...state,
        messageLoading: true,
      };
    case MESSAGESUCCESS:
      return {
        ...state,
        messageLoading: false,
        messageSummary: action.payload,
      };
    case USERRECIEPIENTMESSAGESUCCESS:
      return {
        ...state,
        messageLoading: false,
        userRecieverMessages: action.payload,
      };
    case CREATEMESSAGESUCCESS:
      return {
        ...state,
        messageLoading: false,
        message: action.payload,
      };
    case MESSAGEFAILURE:
      return {
        ...state,
        messageLoading: false,
        error: action.payload,
        message: null
      };
    default:
      return state;
  }
};

export default messageReducer;
