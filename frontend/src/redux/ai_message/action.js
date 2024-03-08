import axios from "axios";
import { localBackendUrl } from "../../utility";
export const AIMESSAGESUCCESS = "user/ai/message/success";
export const AICONVERSATION = "user/ai/conversations/success";
export const AIMESSAGELOADINGSTART = "message/ai/loading/start";
export const CREATEAIMESSAGESUCCESS = "message/user/ai/send/success";
export const MESSAGEFAILURE = "user/ai/message/failure";
const get_conversation_url = () =>
  `${localBackendUrl}/conversations`;

const get_conversation_messages_url = (conversation_id) =>
  `${localBackendUrl}/conversations/${conversation_id}`;

const messageStart = () => ({
  type: AIMESSAGELOADINGSTART,
});

const get_conversation = (data) => {
  return {
    type: AICONVERSATION,
    payload: data,
  };
};

export const user_conversation_messages = (data) => {
  return {
    type: AIMESSAGESUCCESS,
    payload: data,
  };
};

const createMessageSuccess = (message) => {
  return {
    type: CREATEAIMESSAGESUCCESS,
    payload: message,
  };
};

const messageFailure = (error) => ({
  type: MESSAGEFAILURE,
  payload: error,
});

export const getConversations = (userprofile) => (dispatch) => {
  dispatch(messageStart());

  axios
    .get(get_conversation_url(), {
      headers: {
        Authorization: `Bearer ${userprofile?.token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      dispatch(get_conversation(response.data)); // Pass navigate as the onSuccess callback later
    })
    .catch((err) => {
      dispatch(messageFailure(err.response?.data?.error));
    });
};

export const getConversationMessages =
  (conversation_id, userprofile) => (dispatch) => {
    dispatch(messageStart());
    axios
      .get(get_conversation_messages_url(conversation_id), {
        headers: {
          Authorization: `Bearer ${userprofile?.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatch(user_conversation_messages(response.data)); // Pass navigate as the onSuccess callback later
      })
      .catch((err) => {
        dispatch(messageFailure(err.response?.data?.error));
      });
  };

const initialCreateUserAIMessage = (data, userProfile, cloneArray,callback ) => (dispatch) => {
  dispatch(messageStart());
  axios
    .post(get_conversation_url(), data, {
      headers: {
        Authorization: `Bearer ${userProfile?.token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      dispatch(createMessageSuccess(response?.data));
      dispatch(getConversationMessages(response?.data.conversation_id,userProfile));
      dispatch(getConversations(userProfile));
      callback(response?.data.conversation_id)
    })
    .catch((err) => {
      cloneArray.pop()
      dispatch(user_conversation_messages(cloneArray))
      dispatch(messageFailure(err.response?.data?.error));
    });
};

export const createUserAIMessage = ( data,conversation_id, userProfile, cloneArray ) => (dispatch) => {
  dispatch(messageStart());
  axios
    .put(get_conversation_messages_url(conversation_id), data, {
      headers: {
        Authorization: `Bearer ${userProfile?.token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      dispatch(createMessageSuccess(response?.data));
      dispatch(getConversationMessages(conversation_id,userProfile));
      dispatch(getConversations(userProfile));
    })
    .catch((err) => {
      cloneArray.pop()
      dispatch(user_conversation_messages(cloneArray))
      dispatch(messageFailure(err.response?.data?.error));
    });
};

export default initialCreateUserAIMessage;
