import { useEffect } from "react";
import UserInteraction from "./interaction"
import { userprofile } from "../../utility";
import Navigation from "./navigation"
import { useDispatch } from "react-redux";
import { getAllRoom } from "../../redux/room/action";
import { get_all_room_membership } from "../../redux/room_membership/action";
const MessageHome = () => {
    const dispatch = useDispatch()
    let userProfile = userprofile()
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
            <UserInteraction/>
        </div>
    )
}

export default MessageHome;