import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formatDateAndTime } from "../../utility";
import handleMessageInterface from "../../redux/domManipulation/action";
import { FaPen } from "react-icons/fa";
const Navigation = () => {
  const dispatch = useDispatch();
  const { messageOpen } = useSelector((state) => state.domStatus);
  const { messageSummary } = useSelector((state) => state.messageReducer);
  const { conversations } = useSelector((state) => state.aiMessageReducer);

  return (
    <div
      className={`md:w-[40%] bg-white message-nav-height md:block overflow-hidden ${
        messageOpen ? "w-[0%] mobile-hidden" : "w-[100%] mobile-block"
      }`}
    >
      <h1 className="text-xl pt-6 md:px-3 md:text-left text-center font-bold h-[9%]">
        Messages
      </h1>
      <div className="p-3 h-[50%] last:border-b-[red] last:pb-0 last:mb-0 overflow-y-auto">
        {messageSummary?.length === 0 ? (
          <p className="text-center pt-5">you have no messages</p>
        ) : (
          messageSummary?.map(
            ({
              username,
              avatarUrl,
              last_message,
              recipient_id,
              created_at,
            }) => (
              <div
                key={username}
                className="flex mb-3 border-b-2 pb-2 !border-[#f3f7f0] w-full"
              >
                <Link
                  role="link"
                  to={`/profile/${recipient_id}`}
                  style={{
                    width: "max-content",
                    display: "flex",
                    height: "100%",
                  }}
                >
                  <img
                    src={
                      process.env.PUBLIC_URL + `/project_avatar/${avatarUrl}`
                    }
                    alt={username}
                    style={{
                      width: "40px",
                      height: "40px",
                      maxWidth: "40px",
                      borderRadius: "50%",
                      marginRight: "12px",
                    }}
                  />
                </Link>
                <Link
                  className="flex flex-col chat-card w-full"
                  to={`/messages/${recipient_id}`}
                  onClick={() => dispatch(handleMessageInterface(true))}
                >
                  <h2 className="crop-text font-bold">{username}</h2>

                  <div className="flex w-full text-sm justify-between">
                    <p className="crop-text">{last_message}</p>
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
      <div className="flex pt-2 justify-between px-3 h-[6%]">
        <h2 className="text-xl font-bold">Chat Assistant</h2>
        <Link
          to="/messages/ai"
          onClick={() => dispatch(handleMessageInterface(true))}
          className="text-homegreen flex pointer-cursor"
        >
          <span>new</span>
          <FaPen />
        </Link>
      </div>
      <div className="p-3 h-[35%] last:border-b-[red] last:pb-0 last:mb-0 overflow-y-auto">
        {conversations?.length === 0 ? (
          <p className="text-center pt-5">you have no ai messages</p>
        ) : (
          conversations?.map(
            ({ username, avatarUrl, content, id, updated_at }) => (
              <div
                key={id}
                className="flex mb-3 border-b-2 pb-2 !border-[#f3f7f0] w-full"
              >
                <Link
                  role="link"
                  to={`/messages/ai/${id}`}
                  style={{
                    width: "max-content",
                    display: "flex",
                    height: "100%",
                  }}
                >
                  <img
                    src={
                      process.env.PUBLIC_URL + `/project_avatar/${avatarUrl}`
                    }
                    alt={username}
                    style={{
                      width: "40px",
                      height: "40px",
                      maxWidth: "40px",
                      borderRadius: "50%",
                      marginRight: "12px",
                    }}
                  />
                </Link>
                <Link
                  className="flex flex-col chat-card w-full"
                  to={`/messages/ai/${id}`}
                  onClick={() => dispatch(handleMessageInterface(true))}
                >
                  <h2 className="crop-text font-bold">{username}</h2>

                  <div className="flex w-full text-sm justify-between">
                    <p className="crop-text lg:max-w-[7.5rem] md:max-w-[5.3rem]">
                      {content}
                    </p>
                    <p className="ml-2">
                      {formatDateAndTime(updated_at, "chatNav")}
                    </p>
                  </div>
                </Link>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default Navigation;
