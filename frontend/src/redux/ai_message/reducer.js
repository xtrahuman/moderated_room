import {
  AIMESSAGELOADINGSTART,
  AICONVERSATION,
  MESSAGEFAILURE,
  CREATEAIMESSAGESUCCESS,
  AIMESSAGESUCCESS,
} from "./action";

const INITIAL_STATE = {
  userAiMessages: [],
  conversations: [],
  error: null,
  AimessageLoading: false,
  messageSuccess: null,
};

const aiMessageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AIMESSAGELOADINGSTART:
      return {
        ...state,
        AimessageLoading: true,
      };
    case AICONVERSATION:
      return {
        ...state,
        AimessageLoading: false,
        conversations: action.payload,
      };
    case AIMESSAGESUCCESS:
      return {
        ...state,
        AimessageLoading: false,
        userAiMessages: action.payload,
      };
    case CREATEAIMESSAGESUCCESS:
      return {
        ...state,
        AimessageLoading: false,
        messageSuccess: action.payload,
      };
    case MESSAGEFAILURE:
      return {
        ...state,
        AimessageLoading: false,
        error: action.payload,
        messageSuccess: null
      };
    default:
      return state;
  }
};

export default aiMessageReducer;
