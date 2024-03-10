import axios from "axios";
import { localBackendUrl } from "../../utility";
export const GETAWAITINROOMMEMBERSHIPSUCCESS = "awaiting_room_member/get/success";
export const GETALLROOMMEMBERSHIPSUCCESS = "room_member/get/all/success";
export const ROOMMEMBERSHIPSTART = "room_member/start";
export const JOINROOMMEMBERSUCCESS = "room_member/create/success";
export const UPDATEROOMMEMBERSUCCESS = "room_member/update/success";
export const DELETEROOMMEMBERSUCCESS = "room_member/delete/success";
export const ROOMMEMBERSHIPFAILURE = "room_member/failure";

const get_room_members_awaiting = () =>
  `${localBackendUrl}/group-memberships/awaiting`;

export const RoomMemberStart = () => ({
  type: ROOMMEMBERSHIPSTART,
});

export const getAwaitingRoomMember = (awaitinRoomMember) => {
  return {
    type: GETAWAITINROOMMEMBERSHIPSUCCESS,
    payload: awaitinRoomMember,
  };
};

export const getAllRoomMembership  = (roomMembers) => {
  return {
    type: GETALLROOMMEMBERSHIPSUCCESS,
    payload: roomMembers,
  };
};

export const createRoomMembershipSuccess = (message) => {
  return {
    type: JOINROOMMEMBERSUCCESS,
    payload: message,
  };
};

export const updateRoomMembershipSuccess = (message) => {
  return {
    type: UPDATEROOMMEMBERSUCCESS,
    payload: message,
  };
};

export const deleteRoomMembershipSuccess = (message) => {
  return {
    type: DELETEROOMMEMBERSUCCESS,
    payload: message,
  };
};

export const roomMembershipFailure = (error) => ({
  type: ROOMMEMBERSHIPFAILURE,
  payload: error,
});

export const get_awaiting_room_membership = (token) => async (dispatch) => {
  try {
    dispatch(RoomMemberStart());
    let headers = {
      "x-access-token": `${token}`,
    };

    // Fetch posts
    const response = await axios.get(get_room_members_awaiting(), {headers});

    dispatch(getAwaitingRoomMember(response.data));
  } catch (err) {
    dispatch(roomMembershipFailure(err.response?.data?.error));
  }
};

export const get_all_room_membership = (token) => (dispatch) => {
  dispatch(RoomMemberStart());
  let headers = {
    "x-access-token": `${token}`,
  };
  axios
    .get(`${localBackendUrl}/group-memberships`, { headers })
    .then((response) => {
      dispatch(getAllRoomMembership(response.data)); // Pass navigate as the onSuccess callback later
    })
    .catch((err) => {
      dispatch(roomMembershipFailure(err.response?.data?.error));
    });
};

const create_room_membership = (group_id, callback, token) => (dispatch) => {
  dispatch(RoomMemberStart());
  const data = {
    groupId: group_id,
  };
  axios
    .post(`${localBackendUrl}/group-memberships/join`, data, {
      headers: {
        "x-access-token": `${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      createRoomMembershipSuccess(response.data);
      dispatch(callback());
    })
    .catch((err) => {
       // If the server request fails, roll back the UI update
      dispatch(roomMembershipFailure(err.response?.data?.error));
    });
};

export const update_room_membership = (group_uuid, callback, token, status, role='member') => (dispatch) => {
  dispatch(RoomMemberStart());
  const data = {
    role: role,
    verifyStatus: status
  };
  axios
    .put(`${localBackendUrl}/group-memberships/${group_uuid}`, data, {
      headers: {
        "x-access-token": `${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      dispatch(updateRoomMembershipSuccess(response.data));
      dispatch(get_awaiting_room_membership(token));
      callback();
    })
    .catch((err) => {
       // If the server request fails, roll back the UI update
      dispatch(roomMembershipFailure(err.response?.data?.error));
    });
};

export const delete_room_membership = (group_uuid, callback,token) => (dispatch) => {
  dispatch(RoomMemberStart());
  axios
    .delete(`${localBackendUrl}/group-memberships/${group_uuid}`,{
      headers: {
        "x-access-token": `${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      dispatch(deleteRoomMembershipSuccess(response.data));
      dispatch(get_awaiting_room_membership(token));
      callback();
    })
    .catch((err) => {
       // If the server request fails, roll back the UI update
      dispatch(roomMembershipFailure(err.response?.data?.error));
    });
};

export default create_room_membership;
