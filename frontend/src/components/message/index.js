import { useEffect } from "react";
import UserInteraction from "./interaction"
import { userprofile } from "../../utility";
import Navigation from "./navigation"
import { useDispatch } from "react-redux";
import { getAllRoom } from "../../redux/room/action";
const MessageHome = () => {
    const dispatch = useDispatch()
    let userProfile = userprofile()
    useEffect(() => {
         // eslint-disable-next-line react-hooks/exhaustive-deps
        userProfile = userprofile();
        dispatch(getAllRoom(userProfile))
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