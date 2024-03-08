import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import userReducer from "./authentication/reducer";
import roomReducer from "./room/reducer";
import likeReducer from "./room_membership/reducer";
import commentReducer from "./comment/reducer";
import commentLikeReducer from "./comment_like/reducer";
import messageReducer from "./message/reducer";
import aiMessageReducer from "./ai_message/reducer";
import domStatus from "./domManipulation/reducer";
const reducer = combineReducers({
  userDetails: userReducer,
  roomReducer,
  likeReducer,
  commentReducer,
  commentLikeReducer,
  messageReducer,
  aiMessageReducer,
  domStatus,
});

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;
