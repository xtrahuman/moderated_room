import { useEffect } from "react";
import UserInteraction from "./interaction"
import { userprofile } from "../../utility";
import Navigation from "./navigation"
import { getMessageSummary } from "../../redux/message/action";
import { getConversations } from "../../redux/ai_message/action";
import { useDispatch } from "react-redux";
const MessageHome = () => {
    const dispatch = useDispatch()
    let userProfile = userprofile()
    useEffect(() => {
         // eslint-disable-next-line react-hooks/exhaustive-deps
        userProfile = userprofile();
        dispatch(getMessageSummary(userProfile))
        dispatch(getConversations(userProfile))
      //   // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    return (
        <div className="flex w-full">
            <Navigation />
            <UserInteraction/>
        </div>
    )
}

export default MessageHome;