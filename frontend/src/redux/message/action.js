import axios from "axios";
import { localBackendUrl } from "../../utility";
export const MESSAGESUCCESS = "user/message/success";
export const USERRECIEPIENTMESSAGESUCCESS = "user/recipient/message/success";
export const MESSAGELOADINGSTART = "message/loading/start";
export const CREATEMESSAGESUCCESS = "message/send/success";
export const MESSAGEFAILURE = "user/message/failure";
const get_sender_message_summary_url = () =>
  `${localBackendUrl}/sender_messages_summary`;

const get_user_recipient_messages_url = (recipient_id,pageNo) =>
  `${localBackendUrl}/user_messages/${recipient_id}?page=${pageNo}`;
const messageStart = () => ({
  type: MESSAGELOADINGSTART,
});

const get_message_summary = (data) => {
  return {
    type: MESSAGESUCCESS,
    payload: data,
  };
};

export const user_recipient_messages = (data) => {
  return {
    type: USERRECIEPIENTMESSAGESUCCESS,
    payload: data,
  };
};

const createMessageSuccess = (message) => {
  return {
    type: CREATEMESSAGESUCCESS,
    payload: message,
  };
};

const messageFailure = (error) => ({
  type: MESSAGEFAILURE,
  payload: error,
});

export const getMessageSummary = (userprofile) => (dispatch) => {
  dispatch(messageStart());

  axios
    .get(get_sender_message_summary_url(),
    {
      headers: {
        Authorization: `Bearer ${userprofile?.token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      dispatch(get_message_summary(response.data)); // Pass navigate as the onSuccess callback later
    })
    .catch((err) => {
      dispatch(messageFailure(err.response?.data?.error));
    });
};

export const getUserRecipientMessages = (recipient_id,pageNo,userprofile) => (dispatch) => {
  dispatch(messageStart());
  axios
    .get(get_user_recipient_messages_url(recipient_id,pageNo),
    {
      headers: {
        Authorization: `Bearer ${userprofile?.token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      dispatch(user_recipient_messages(response.data)); 
    })
    .catch((err) => {
      dispatch(messageFailure(err.response?.data?.error));
    });
};

export const createMessage = (data, userProfile,callback) => (dispatch) => {
  dispatch(messageStart());
  let recipient_id = data['recipient_id']
  axios
    .post(`${localBackendUrl}/messages`, data, {
      headers: {
        Authorization: `Bearer ${userProfile?.token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      dispatch(createMessageSuccess(response?.data));
      dispatch(getUserRecipientMessages(recipient_id, 1, userProfile));
      dispatch(getMessageSummary(userProfile));
      callback()
    })
    .catch((err) => {
      dispatch(messageFailure(err.response?.data?.error));
    });
};

export default createMessage;
