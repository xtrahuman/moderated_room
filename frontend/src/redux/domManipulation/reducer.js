import {
    TOGGLEMESSAGEFEATURE,
  } from "./action";
  
  const INITIAL_STATE = {
    messageOpen: false,
  };
  
  const domStatus = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case TOGGLEMESSAGEFEATURE:
        return {
          ...state,
          messageOpen: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default domStatus;
  