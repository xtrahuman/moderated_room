import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userprofile } from "../utility";
import create_room_membership, { get_all_room_membership } from "../redux/room_membership/action";
// import createRoomMembership, { getRoomMembership } from "../redux/post_roomMember/action";

const styles = {
  roomContainer: {
    display: "flex",
    padding: "16px",
  },
  roomInfo: {
    display: "flex",
    alignItems: "start",
    marginBottom: "12px",
  },
  roomname: {
    fontWeight: "bold",
  },
  roomContent: {
    marginBottom: "12px",
  }
};

const RoomList = ({ rooms }) => {
  const { loggedin } = useSelector((state) => state.userDetails);
  const { roomMembers } = useSelector((state) => state.roomMemberReducer);
  // const dispatch = useDispatch();
  console.log(rooms, "testing login");
  let userProfile = userprofile();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    userProfile = userprofile();
    // dispatch(getRoomMembership());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const room_member = (group_id) => {
    const room_member = roomMembers?.find(
      (roomMember) =>
        roomMember.groupId === group_id &&
        roomMember.userId === userProfile.userId
    );
    return room_member;
  };

  const setDomByStatus = () => {};

  return (
    <div className="[&>*:nth-child(1)]:rounded-t-lg w-full">
      {rooms?.groups?.map(({ id, name, description }) => (
        <div
          style={styles.roomContainer}
          className="flex  bg-white border-t-2 justify-between border-[#f3f7f0] first:border-t-0 shadow-xs shadow-[#3AAFA9] z-1 w-full"
          key={id}
        >
          <div className="flex flex-col w-[90%]">
            <div className="user-info" style={styles.roomInfo}>
              <div className="flex flex-col content-width">
                <div className="w-full flex">
                  <h3
                    className="crop-text post-detailname-width"
                    style={styles.roomname}
                  >
                    {name}
                  </h3>
                </div>
                <div className="flex w-full">
                  <p
                    className="flex break-words w-full"
                    style={styles.roomContent}
                  >
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[80px] block mt-4">
            {ButtonStatus(room_member(id)?.verifyStatus,loggedin,id,userProfile)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomList;

const ButtonStatus = (verifyStatus, loggedin, id,userProfile) => {
  const dispatch = useDispatch()
  switch (verifyStatus) {
    case "verified":
      return (
        <button
          className="bg-[#00cc66] text-lg px-3 py-1 text-white rounded-lg"
        >
          verified
        </button>
      );
    case "awaiting_verification":
      return (
        <button
          className="bg-[#f0ad4e] text-lg px-3 py-1 text-white rounded-lg"
        >
          pending
        </button>
      );
    default:
      return (
        <button
          onClick={() =>
            loggedin
              ? 
              dispatch(
                create_room_membership(
                      id,
                      () => get_all_room_membership(userProfile?.token),
                      userProfile?.token
                    )
                  )
              :
                console.log("not logged in")
          }
          className="bg-blue-500 text-lg px-3 py-1 text-white rounded-lg"
        >
          join
        </button>
      );;
  }
};
