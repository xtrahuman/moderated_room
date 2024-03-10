import { useEffect } from "react";
import Navigation from "./navigation";
import UserChatApp,{AiChatApp,AiChatAppIndex } from "./chat";
import { userprofile } from "../../utility";
import { getMessageSummary } from "../../redux/message/action";
import { getConversations } from "../../redux/ai_message/action";
import UserInteraction from "./interaction";
import { useSelector, useDispatch } from "react-redux";

const MessageContent = ({page}) => {
  const { messageOpen } = useSelector((state) => state.domStatus);
  const dispatch = useDispatch()
  let userProfile = userprofile();
  useEffect(() => {
     // eslint-disable-next-line react-hooks/exhaustive-deps
    userProfile = userprofile();
    dispatch(getMessageSummary(userProfile ))
    dispatch(getConversations(userProfile))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex w-full">
      <Navigation />
      <div className={`md:w-[60%] md:block min-h-screen ${messageOpen ? 'w-[100%] mobile-block' : 'w-[0%] mobile-hidden'}`}>
      {page === 'messageUserDetail' ? (
        <UserChatApp page='messageUserDetail' />
      ) : <UserInteraction/>
      }
        
    </div>
    </div>
  );
};




export default MessageContent;
