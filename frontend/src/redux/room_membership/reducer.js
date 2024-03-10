import {
  ROOMMEMBERSHIPSTART,
  GETALLROOMMEMBERSHIPSUCCESS,
  GETAWAITINROOMMEMBERSHIPSUCCESS,
  ROOMMEMBERSHIPFAILURE,
  UPDATEROOMMEMBERSUCCESS,
  DELETEROOMMEMBERSUCCESS,
  JOINROOMMEMBERSUCCESS,
} from "./action";

const INITIAL_STATE = {
  awaitingRoomMember: [],
  roomMembers: [],
  error: null,
  roomMemberLoading: false,
  message: null,
};

const roomMemberReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ROOMMEMBERSHIPSTART:
      return {
        ...state,
        roomMemberLoading: true,
      };
    case GETALLROOMMEMBERSHIPSUCCESS:
      return {
        ...state,
        roomMemberLoading: false,
        roomMembers: action.payload,
      };
    case GETAWAITINROOMMEMBERSHIPSUCCESS:
      return {
        ...state,
        roomMemberLoading: false,
        awaitingRoomMember: action.payload,
      };
    case UPDATEROOMMEMBERSUCCESS:
      return {
        ...state,
        roomMemberLoading: false,
        message: action.payload,
      };
    case DELETEROOMMEMBERSUCCESS:
      return {
        ...state,
        roomMemberLoading: false,
        message: action.payload,
      };
    case JOINROOMMEMBERSUCCESS:
      return {
        ...state,
        roomMemberLoading: false,
        message: action.payload,
      };
    case ROOMMEMBERSHIPFAILURE:
      return {
        ...state,
        roomMemberLoading: false,
        error: action.payload,
        message: null
      };
    default:
      return state;
  }
};

export default roomMemberReducer;
