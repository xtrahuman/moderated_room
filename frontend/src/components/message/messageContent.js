import { useEffect } from "react";
import Navigation from "./navigation";
import UserChatApp from "./chat";
import { userprofile } from "../../utility";
import UserInteraction from "./interaction";
import { useSelector, useDispatch } from "react-redux";
import { getAllRoom } from "../../redux/room/action";
import { get_all_room_membership } from "../../redux/room_membership/action";
import { useParams } from "react-router-dom";

const MessageContent = ({page}) => {
  const { messageOpen } = useSelector((state) => state.domStatus);
  const dispatch = useDispatch()
  // const {room_uuid} = useParams()
  let userProfile = userprofile();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
   userProfile = userprofile();
   dispatch(getAllRoom(userProfile))
   dispatch(get_all_room_membership(userProfile?.token))
 //   // eslint-disable-next-line react-hooks/exhaustive-deps
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
