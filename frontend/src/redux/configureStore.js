import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import userReducer from "./authentication/reducer";
import roomReducer from "./room/reducer";
import roomMemberReducer from "./room_membership/reducer";
import domStatus from "./domManipulation/reducer";
const reducer = combineReducers({
  userDetails: userReducer,
  roomReducer,
  roomMemberReducer,
  domStatus,
});

const store = createStore(reducer, applyMiddleware(
  // logger, 
  thunk));

export default store;
