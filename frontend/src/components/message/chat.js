import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import handleMessageInterface from "../../redux/domManipulation/action";
import { v4 as uuidv4 } from 'uuid';

import { getOtherUserDetails, getOtherUsersProfile } from "../../redux/authentication/action";
import { userprofile, formatDateAndTime } from "../../utility";
import { FaAngleLeft } from "react-icons/fa6";
import {
  faCamera,
  faLaughBeam,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import "./chat.css";
import { getRoomDetail, roomDetail } from "../../redux/room/action";

const Message = ({ message, loggedin, user, page }) => {
  const { content, created_at } = message;

  let messageClass;

if (page ==='messageUserDetail') {
    messageClass = loggedin && message.role === "user" ? "parker" : "stark";
  } else {
    messageClass = "";
  }

  return (
    <div
      className={`${messageClass === "parker" ? "right" : ""} message-margin`}
    >
      <div className={`message ${messageClass}`}>
        <p className="break-words w-full">{content}</p>
        {/* {status === "recieved" && <div className="status">Received</div>} */}
      </div>
      <div className="time">{formatDateAndTime(created_at, "chat")}</div>
    </div>
  );
};


export const UserChatApp = ({ page }) => {

  const [inputMessage, setInputMessage] = useState("");
  const [latestMessage, setlatestMessage] = useState([]);
  const { user } = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  let userProfile = userprofile();
  const {room_uuid} = useParams()

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e && e.key === "Enter" && inputMessage.trim() !== "") {
      const data = {
        content: inputMessage,
      };

      const dataInfo = {
        id: uuidv4(),
        role: "user",
        conversation_id: uuidv4(),
        content: inputMessage,
        created_at: new Date(),
        updated_at: new Date(),
        bot: {
            username: "AI Assistant",
            avatarUrl: "bot.png"
        },
        user: {
            username: user.username,
            avatarUrl: user.avatarUrl
        }
    }
      const cloneArray = [...latestMessage,dataInfo]
      
      setlatestMessage(cloneArray)
      setInputMessage("")
      // scrollToBottom();
    }
  };

  useEffect(() => {
     // eslint-disable-next-line react-hooks/exhaustive-deps
    userProfile = userprofile();
    dispatch(getOtherUserDetails(userProfile?.token, userProfile?.userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // scrollToBottom();

    return () => {
      dispatch(getOtherUsersProfile({}))
    }
  }, []);

  return (
    <ChatApp
      latestMessage={latestMessage}
      inputMessage={inputMessage}
      handleKeyPress={handleKeyPress}
      page={page}
      handleInputChange={handleInputChange}
    />
  );
};

const ChatApp = ({
  latestMessage,
  inputMessage,
  handleKeyPress,
  page,
  handleInputChange,
}) => {
  let { user, loggedin } = useSelector(
    (state) => state.userDetails
  );
  const {room_uuid} = useParams()
  const { room } = useSelector((state) => state.roomReducer);
  const dispatch = useDispatch()

  let userProfile = userprofile();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
   userProfile = userprofile();
   dispatch(getOtherUserDetails(userProfile?.token, userProfile?.userId));
   // eslint-disable-next-line react-hooks/exhaustive-deps
   // scrollToBottom();
   dispatch(getRoomDetail(room_uuid,userProfile))
   return () => {
     dispatch(getOtherUsersProfile({}))
     dispatch(roomDetail)
   }
 }, [room_uuid]);
  // const roomsContainerRef = useRef(null);

  const getFirstLetter = (roomName) => {
    return roomName?.charAt(0).toUpperCase();
  };

  return (
    <div className="center">
      <div className="chat">
        <div className="contact bar">
          
          <div className="pic stark">
          <FaAngleLeft 
          onClick={() => dispatch(handleMessageInterface(false))}
          className="md:hidden cursor-pointer text-lg text-homegreen angle-left mobile-flex text-left" />
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    maxWidth: "40px",
                    borderRadius: "50%",
                    // marginRight: "12px",
                    fontSize: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="bg-homegreen md:top-5 text-white"
                >
                  <span>{getFirstLetter(room?.name)}</span>
                </div>
          </div>
          <div className="name">{room?.name}</div>
          <div className="font-light text-md">{room?.description}</div>
          <div className="seen">created at {formatDateAndTime(room.createdAt, "chat")}</div>
        </div>
        <div
          className="rooms"
          id="chat"
          // ref={roomsContainerRef}
        >
          <div>
          <p className="text-center pt-5 mb-[40vh]">{room?.content}</p>
            {latestMessage?.map((message) => (
              <Message
                key={message.id}
                message={message}
                loggedin={loggedin}
                user={user}
                page={page}
              />
            ))}
          </div>
        </div>
        <div className="input">
          <FontAwesomeIcon icon={faCamera} />
          <FontAwesomeIcon icon={faLaughBeam} />
          <input
            placeholder="Type your message here!"
            type="text"
            value={inputMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <FontAwesomeIcon icon={faMicrophone} />
        </div>
      </div>
    </div>
  );
};

export default UserChatApp;
