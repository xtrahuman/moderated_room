import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formatDateAndTime } from "../../utility";
import handleMessageInterface from "../../redux/domManipulation/action";
import { FaPen } from "react-icons/fa";
const Navigation = () => {
  const dispatch = useDispatch();
  const { messageOpen } = useSelector((state) => state.domStatus);
  const { rooms } = useSelector((state) => state.roomReducer);
 
  const getFirstLetter = (roomName) => {
    return roomName.charAt(0).toUpperCase()
  }

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
        {rooms?.group?.length === 0 ? (
          <p className="text-center pt-5">you have no messages</p>
        ) : (
          rooms?.groups?.map(
            ({ id, name, description, created_at, uuid}) => (
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
                      fontSize: '30px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    className="bg-homegreen text-white"
                  >
                    <span>{getFirstLetter(name)}</span>
                  </div>
                </div>
                <Link
                  className="flex flex-col chat-card w-full"
                  to={`/messages/${uuid}`}
                  onClick={() => dispatch(handleMessageInterface(true))}
                >
                  <h2 className="crop-text font-bold">{name}</h2>

                  <div className="flex w-full text-sm justify-between">
                    <p className="crop-text">{description}</p>
                    <p className="ml-2">
                      {formatDateAndTime(created_at, "chatNav")}
                    </p>
                  </div>
                </Link>
              </div>
            )
          )
        )}
      </div>
      <div className="pt-2 px-3 h-[6%]">
        <h2 className="text-xl font-bold">Pending Room</h2>
      </div>
      <div className="p-3 h-[35%] last:border-b-[red] last:pb-0 last:mb-0 overflow-y-auto">
        {rooms?.groups?.length === 0 ? (
          <p className="text-center pt-5">you have no ai messages</p>
        ) : (
          rooms?.groups?.map(
            ({ id, name, description,uuid, updated_at }) => (
              <div
                key={id}
                className="flex mb-3 border-b-2 pb-2 !border-[#f3f7f0] w-full"
              >
                <Link
                  role="link"
                  to={`/messages/${uuid}`}
                  style={{
                    width: "max-content",
                    display: "flex",
                    height: "100%",
                  }}
                >
                  <img
                    src={
                      process.env.PUBLIC_URL + `/project_avatar/avatar1`
                    }
                    alt={name}
                    style={{
                      width: "40px",
                      height: "40px",
                      maxWidth: "40px",
                      borderRadius: "50%",
                      marginRight: "12px",
                    }}
                  />
                </Link>
                <div
                  className="flex flex-col chat-card w-full"
                >
                  <h2 className="crop-text font-bold">{name}</h2>

                  <div className="flex w-full text-sm justify-between">
                    <p className="crop-text lg:max-w-[7.5rem] md:max-w-[5.3rem]">
                      {description}
                    </p>
                    <p className="ml-2">
                      {formatDateAndTime(updated_at, "chatNav")}
                    </p>
                  </div>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default Navigation;
