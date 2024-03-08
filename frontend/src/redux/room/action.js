import axios from "axios";
import { getUserFunc } from "../authentication/action";
import { localBackendUrl } from "../../utility";
import { getCommentFunc } from "../comment/action";
// import { getRoomLike } from "../room_like/action";
// import { getAllComment } from "../comment/action";
export const GETROOMSUCCESS = "room/get/success";
export const GETUSERLIKEDPOSTSUCCESS = "userlikedroom/get/success";
export const GETPOSTDETAILSUCCESS = "roomdetail/get/success";
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

const getUserLikeRoom = (rooms) => {
  return {
    type: GETUSERLIKEDPOSTSUCCESS,
    payload: rooms,
  };
};

export const roomDetail = (room) => {
  return {
    type: GETPOSTDETAILSUCCESS,
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
        // Fetch user details using the user_id from the room
        // const userData = await getUserFunc(userprofile?.token, room.user_id);

        // Combine room and user data
        // const roomWithUser = {
        //   ...room,
        // username: userData.username,
        // avatarUrl: userData.avatarUrl,
        // };

        dispatch(roomDetail(room));
        // dispatch(getRoomLike(room_uuid));
        // dispatch(getAllComment(userprofile?.token, room_uuid));
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

    // // Fetch additional details for each room
    // const roomsWithDetails = await Promise.all(
    //   rooms.map(async (room) => {
    //     // Fetch user details for the room's user
    //     const room_details = await getCommentFunc(loggedInUser?.token, room.id);
    //     if (room.user_id) {
    //       const userDetails = await getUserFunc(
    //         loggedInUser?.token,
    //         room.user_id
    //       );
    //       // Return a new object combining room and user details
    //       return {
    //         ...room,
    //         username: userDetails.username,
    //         avatarUrl: userDetails.avatarUrl,
    //         comment_count: room_details.count,
    //       };

    //     }
    //   })
    // );

    dispatch(getRoom(rooms));
  } catch (err) {
    dispatch(makeroomFailure(err.response?.data?.error));
  }
};

export const getUserRoomLike = (loggedInUser, user_id) => async (dispatch) => {
  try {
    dispatch(makeroomStart());

    let headers = {};
    if (loggedInUser?.token) {
      headers = {
        "x-access-token": `${loggedInUser?.token}`,
      };
    }
    // Fetch rooms
    const response = await axios.get(
      `${localBackendUrl}/users/${user_id}/liked_rooms`,
      { headers }
    );
    const rooms = response.data;

    // Fetch additional details for each room
    const roomsWithDetails = await Promise.all(
      rooms.map(async (room) => {
        // Fetch user details for the room's user
        const room_details = await getCommentFunc(loggedInUser?.token, room.id);
        if (room.user_id) {
          const userDetails = await getUserFunc(
            loggedInUser?.token,
            room.user_id
          );
          // Return a new object combining room and user details
          return {
            ...room,
            username: userDetails.username,
            avatarUrl: userDetails.avatarUrl,
            comment_count: room_details.count,
          };
        }
      })
    );

    dispatch(getUserLikeRoom(roomsWithDetails));
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
