import axios from "axios";
import { localBackendUrl } from "../../utility";
import { get_all_room_membership } from "../room_membership/action";
export const GETROOMSUCCESS = "room/get/success";
export const GETROOMDETAILSUCCESS = "roomdetail/get/success";
export const MAKEROOMSTART = "room/start";
export const MAKEROOMSUCCESS = "room/send/success";
export const MAKEROOMFAILURE = "room/failure";

const makeroomStart = () => ({
  type: MAKEROOMSTART,
});

export const getRoom = (rooms) => {
  return {
    type: GETROOMSUCCESS,
    payload: rooms,
  };
};


export const roomDetail = (room) => {
  return {
    type: GETROOMDETAILSUCCESS,
    payload: room,
  };
};

const makeroomSuccess = (message) => {
  return {
    type: MAKEROOMSUCCESS,
    payload: message,
  };
};

const makeroomFailure = (error) => ({
  type: MAKEROOMFAILURE,
  payload: error,
});

export const getRoomDetail = (room_uuid, userprofile) => (dispatch) => {
  dispatch(makeroomStart());
  axios
    .get(`${localBackendUrl}/groups/${room_uuid}`, {
      headers: {
        "x-access-token": `${userprofile?.token}`,
        "Content-Type": "application/json",
      },
    })
    .then(async (response) => {
      try {
        const room = response.data;
        dispatch(roomDetail(room));
      } catch (userError) {
        dispatch(makeroomFailure(userError));
      }
    })
    .catch((err) => {
      dispatch(makeroomFailure(err.response?.data?.error));
    });
};

export const getAllRoom = (loggedInUser) => async (dispatch) => {
  try {
    dispatch(makeroomStart());
    let headers = {};
    if (loggedInUser?.token) {
      headers = {
        "x-access-token": `${loggedInUser?.token}`,
      };
    }

    // Fetch rooms
    const response = await axios.get(`${localBackendUrl}/groups`, { headers });
    const rooms = response.data;


    dispatch(getRoom(rooms));
    dispatch(get_all_room_membership(loggedInUser?.token))
  } catch (err) {
    dispatch(makeroomFailure(err.response?.data?.error));
  }
};


export const makeRoom = (room, resetRoomForm, loggedInUser) => (dispatch) => {
  dispatch(makeroomStart());
  axios
    .post(`${localBackendUrl}/groups`, room, {
      headers: {
        "x-access-token": `${loggedInUser?.token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      makeroomSuccess(response.data);
      dispatch(getAllRoom(loggedInUser));
      resetRoomForm();
    })
    .catch((err) => {
      dispatch(makeroomFailure(err.response?.data?.error));
    });
};

export default makeRoom;
