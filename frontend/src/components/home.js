import RoomForm from "./roomForm";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllRoom, getRoom } from "../redux/room/action";
import { userprofile } from "../utility";
import RoomList from "./roomList";

const Home = () => {
  const { rooms } = useSelector((state) => state.roomReducer);
  const dispatch = useDispatch();

  let userProfile = userprofile();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    userProfile = userprofile();
    dispatch(getAllRoom(userProfile));
    //   console.log('Current route:', location.pathname);

    return () => {
      dispatch(getRoom([]));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full md:flex-row flex-col">
      <div className="flex md:w-[70%] w-[100%] flex-col ">
        <div className="flex mb-2 justify-center py-6 bg-white border-b-2 border-[#f3f7f0]">
          <NavLink to="/">
            <h1 className="text-homegreen text-xl font-bold">Home</h1>
          </NavLink>
        </div>
        <RoomForm />
        <RoomList rooms={rooms} />
      </div>
    </div>
  );
};

export default Home;
