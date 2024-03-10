import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formatDateAndTime } from "../../utility";
import handleMessageInterface from "../../redux/domManipulation/action";
const Navigation = () => {
  const dispatch = useDispatch();
  const { messageOpen } = useSelector((state) => state.domStatus);
  const { rooms } = useSelector((state) => state.roomReducer);
  const { roomMembers } = useSelector((state) => state.roomMemberReducer);

  const getFirstLetter = (roomName) => {
    return roomName?.charAt(0).toUpperCase();
  };

  const memberRoom = (group_id) => {
    const memberRoom = rooms?.groups?.find((room) => room.id === group_id);
    return memberRoom;
  };

  const getTheRooms = (status) => {
    return roomMembers
    .filter(
      (roomMember) =>
        roomMember.userId === rooms.user &&
        roomMember.verifyStatus === status && roomMember.groupId
    )
    .map((roomMember) => {
      const theRoom = memberRoom(roomMember.groupId);
      return {
        id: theRoom?.id,
        name: theRoom?.name,
        description: theRoom?.description,
        updatedAt: theRoom?.updatedAt,
        uuid: theRoom?.uuid,
      };
    });
  }

  const joinedRooms = getTheRooms("verified")

  const pendingRooms = getTheRooms("awaiting_verification")

  return (
    <div
      className={`md:w-[40%] bg-white message-nav-height md:block overflow-hidden ${
        messageOpen ? "w-[0%] mobile-hidden" : "w-[100%] mobile-block"
      }`}
    >
      <h1 className="text-xl pt-6 md:px-3 md:text-left text-center font-bold h-[9%]">
        Rooms
      </h1>
      <div className="p-3 h-[50%] last:border-b-[red] last:pb-0 last:mb-0 overflow-y-auto">
        {joinedRooms?.length === 0 ? (
          <p className="text-center pt-5">you belong to no rooms</p>
        ) : (
          joinedRooms?.map(({ id, name, description, updatedAt, uuid }) => (
            <div
              key={id}
              className="flex mb-3 border-b-2 pb-2 !border-[#f3f7f0] w-full"
            >
              <div
                style={{
                  width: "max-content",
                  display: "flex",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    maxWidth: "40px",
                    borderRadius: "50%",
                    marginRight: "12px",
                    fontSize: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="bg-homegreen text-white"
                >
                  <span>{getFirstLetter(name)}</span>
                </div>
              </div>
              <Link
                className="flex flex-col chat-card w-full"
                to={`/rooms/${uuid}`}
                onClick={() => dispatch(handleMessageInterface(true))}
              >
                <h2 className="crop-text font-bold">{name}</h2>

                <div className="flex w-full text-sm justify-between">
                  <p className="crop-text">{description}</p>
                  <p className="ml-2">
                    {formatDateAndTime(updatedAt, "chatNav")}
                  </p>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
      <div className="pt-2 px-3 h-[6%]">
        <h2 className="text-xl font-bold">Pending Rooms</h2>
      </div>
      <div className="p-3 h-[35%] last:border-b-[red] last:pb-0 last:mb-0 overflow-y-auto">
        {pendingRooms?.length === 0 ? (
          <p className="text-center pt-5">you have no pending room</p>
        ) : (
          pendingRooms?.map(({ id, name, description, uuid, updatedAt }) => (
            <div
              key={id}
              className="flex mb-3 border-b-2 pb-2 !border-[#f3f7f0] w-full"
            >
              <Link
                role="link"
                to={`/rooms/${uuid}`}
                style={{
                  width: "max-content",
                  display: "flex",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    maxWidth: "40px",
                    borderRadius: "50%",
                    marginRight: "12px",
                    fontSize: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="bg-homegreen text-white"
                >
                  <span>{getFirstLetter(name)}</span>
                </div>
              </Link>
              <div className="flex flex-col chat-card w-full">
                <h2 className="crop-text font-bold">{name}</h2>

                <div className="flex w-full text-sm justify-between">
                  <p className="crop-text lg:max-w-[7.5rem] md:max-w-[5.3rem]">
                    {description}
                  </p>
                  <p className="ml-2">
                    {formatDateAndTime(updatedAt, "chatNav")}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Navigation;
