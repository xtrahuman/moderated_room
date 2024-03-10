import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import handleMessageInterface from "../../redux/domManipulation/action";
import { v4 as uuidv4 } from 'uuid';
import initialCreateUserAIMessage, {
  createUserAIMessage,
  getConversationMessages,
  user_conversation_messages,
} from "../../redux/ai_message/action";
import createMessage, {
  getUserRecipientMessages,
  user_recipient_messages,
} from "../../redux/message/action";
import { getOtherUserDetails, getOtherUsersProfile } from "../../redux/authentication/action";
import { userprofile, formatDateAndTime } from "../../utility";
import { FaAngleLeft } from "react-icons/fa6";
import {
  faCamera,
  faLaughBeam,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import "./chat.css";



// const handleInputChange = (e) => {
//   setInputMessage(e.target.value);
// };
// const handleKeyPress = (e) => {
//   if (e && e.key === "Enter" && inputMessage.trim() !== "") {
//     const data = {
//       content: inputMessage,
//     };

//     const dataInfo = {
//       id: uuidv4(),
//       role: "user",
//       conversation_id: message_id,
//       content: inputMessage,
//       created_at: new Date(),
//       updated_at: new Date(),
//       bot: {
//           username: "AI Assistant",
//           avatarUrl: "bot.png"
//       },
//       user: {
//           username: user.username,
//           avatarUrl: user.avatarUrl
//       }
//   }
//     const cloneArray = [...latestMessage,dataInfo]

//     // setlatestMessage(cloneArray)

//     dispatch(user_conversation_messages(cloneArray))
//     setInputMessage("")

//     dispatch(createUserAIMessage(data, message_id, userProfile, cloneArray));
//     // scrollToBottom();
//   }
// };

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

// const UserChatApp = ({ page }) => {
//   const { userRecieverMessages } = useSelector((state) => state.messageReducer);
//   const [inputMessage, setInputMessage] = useState("");
//   const [latestMessage, setlatestMessage] = useState([]);

//   const { user } = useSelector(
//     (state) => state.userDetails
//   );

//   const dispatch = useDispatch();
//   const { message_id } = useParams();
//   let userProfile = userprofile();

//   const handleInputChange = (e) => {
//     setInputMessage(e.target.value);
//   };

//   const handleKeyPress = (e) => {
//     if (e && e.key === "Enter" && inputMessage.trim() !== "") {
//       console.log("Message sent:", inputMessage);
//       const data = {
//         content: inputMessage,
//         recipient_id: message_id,
//         sender_id: user.id,
//       };
//       dispatch(createMessage(data, userProfile, () => setInputMessage("")));
//       // scrollToBottom();
//     }
//   };

//   useEffect(() => {
//      // eslint-disable-next-line react-hooks/exhaustive-deps
//     userProfile = userprofile();
//     dispatch(getOtherUserDetails(userProfile?.token, message_id));
//     dispatch(getUserRecipientMessages(message_id, 1, userProfile));

//     return () => {
//       dispatch(getOtherUsersProfile({}));
//       dispatch(user_recipient_messages([]))
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [message_id]);
//   // const scrollToBottom = () => {
//   //   // Scroll to the bottom of the messages container
//   //   messagesContainerRef.current.scrollTop =
//   //     messagesContainerRef.current.scrollHeight;
//   // };

//   useEffect(() => {
//     console.log("Redux State:", userRecieverMessages);
//     if (userRecieverMessages && userRecieverMessages.messages) {
//       setlatestMessage([...userRecieverMessages.messages].reverse());
//     }
//     return () => {
//       setlatestMessage([])
//     }
//   }, [userRecieverMessages]);

  
//   return (
//     <ChatApp
//       latestMessage={latestMessage}
//       inputMessage={inputMessage}
//       handleKeyPress={handleKeyPress}
//       page={page}
//       handleInputChange={handleInputChange}
//     />
//   );
// };

export const UserChatApp = ({ page }) => {
  // const { userAiMessages } = useSelector((state) => state.aiMessageReducer);
  const navigate = useNavigate();
  const [inputMessage, setInputMessage] = useState("");
  const [latestMessage, setlatestMessage] = useState([]);
  const { user } = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  // const { message_id } = useParams();
  let userProfile = userprofile();

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

      dispatch(
        initialCreateUserAIMessage(data, userProfile, cloneArray, (conversation_id) => navigate(`/messages/ai/${conversation_id}`))
      );
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
// export const AiChatApp = ({ page }) => {
//   const { userAiMessages } = useSelector((state) => state.aiMessageReducer);
//   const [inputMessage, setInputMessage] = useState("");
//   const [latestMessage, setlatestMessage] = useState([]);
//   const { user } = useSelector((state) => state.userDetails);
//   const dispatch = useDispatch();
//   const { message_id } = useParams();
//   let userProfile = userprofile();

  

//   useEffect(() => {
//      // eslint-disable-next-line react-hooks/exhaustive-deps
//     userProfile = userprofile();
//     dispatch(getOtherUserDetails(userProfile?.token, userProfile?.userId));
//     dispatch(getConversationMessages(message_id, userProfile));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     // scrollToBottom();
//     return () => {
//       dispatch(getOtherUsersProfile({}));
//       dispatch(user_conversation_messages([]))
//     }
//   }, [message_id]);
//   // const scrollToBottom = () => {
//   //   // Scroll to the bottom of the messages container
//   //   messagesContainerRef.current.scrollTop =
//   //     messagesContainerRef.current.scrollHeight;
//   // };

//   useEffect(() => {
//     console.log("Redux State:", userAiMessages);
//     if (userAiMessages) {
//       setlatestMessage([...userAiMessages]);
//     }

//     return () => {
//       setlatestMessage([]);
//     }
//   }, [userAiMessages]);
//   console.log(userAiMessages, "latest message");

//   return (
//     <ChatApp
//       latestMessage={latestMessage}
//       inputMessage={inputMessage}
//       handleKeyPress={handleKeyPress}
//       page={page}
//       handleInputChange={handleInputChange}
//     />
//   );
// };

const ChatApp = ({
  latestMessage,
  inputMessage,
  handleKeyPress,
  page,
  handleInputChange,
}) => {
  let { user, otherUser, loggedin } = useSelector(
    (state) => state.userDetails
  );

  const dispatch = useDispatch()

  if (page === 'messageUserDetail'){
    otherUser = {
      username: "Chat Assistant-AI",
      avatarUrl: "bot.png"
    }
  } 



  // const messagesContainerRef = useRef(null);

  return (
    <div className="center">
      <div className="chat">
        <div className="contact bar">
          
          <div className="pic stark">
          <FaAngleLeft 
          onClick={() => dispatch(handleMessageInterface(false))}
          className="md:hidden cursor-pointer text-lg text-homegreen angle-left mobile-flex text-left" />
            <img
              src={
                process.env.PUBLIC_URL +
                `/project_avatar/${otherUser?.avatarUrl}`
              }
              alt={otherUser.username}
              className="md:top-5"
            />
          </div>
          <div className="name">{otherUser.username}</div>
          <div className="seen">Today at {formatDateAndTime(new Date(), "chat")}</div>
        </div>
        <div
          className="messages"
          id="chat"
          // ref={messagesContainerRef}
        >
          <div>
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
