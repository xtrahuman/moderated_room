import axios from "axios";
import { localBackendUrl } from "../../utility";
export const GETROOMMEMBERSHIPSUCCESS = "room_member/get/success";
export const GETALLROOMMEMBERSHIPSUCCESS = "room_member/get/all/success";
export const ROOMMEMBERSHIPSTART = "room_member/start";
export const JOINROOMMEMBERSUCCESS = "room_member/create/success";
export const ROOMMEMBERSHIPFAILURE = "room_member/create/failure";
const get_roomMembers_url = (post_id) =>
  `${localBackendUrl}/post_roomMembers/posts/${post_id}`;

const RoomMemberStart = () => ({
  type: ROOMMEMBERSHIPSTART,
});

const getRoomMembership = (roomMember) => {
  return {
    type: GETROOMMEMBERSHIPSUCCESS,
    payload: roomMember,
  };
};

const getAllRoomMembership  = (roomMembers) => {
  return {
    type: GETALLROOMMEMBERSHIPSUCCESS,
    payload: roomMembers,
  };
};

const createRoomMembershipSuccess = (message) => {
  return {
    type: JOINROOMMEMBERSUCCESS,
    payload: message,
  };
};

const LikeFailure = (error) => ({
  type: ROOMMEMBERSHIPFAILURE,
  payload: error,
});

export const get_room_membership = (room_uuid) => async (dispatch) => {
  try {
    dispatch(RoomMemberStart());

    // Fetch posts
    const response = await axios.get(get_roomMembers_url(room_uuid));

    dispatch(getRoomMembership(response.data));
  } catch (err) {
    dispatch(LikeFailure(err.response?.data?.error));
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
      dispatch(getAllRoomMembership (response.data)); // Pass navigate as the onSuccess callback later
    })
    .catch((err) => {
      dispatch(LikeFailure(err.response?.data?.error));
    });
};

export const create_room_membersip = (group_id, callback, token) => (dispatch) => {
  dispatch(RoomMemberStart());
  const data = {
    group_id: group_id,
  };
  axios
    .post(`${localBackendUrl}/group-memberships`, data, {
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
      dispatch(LikeFailure(err.response?.data?.error));
    });
};

export default create_room_membersip;
