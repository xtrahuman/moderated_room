import { useSelector, useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  delete_room_membership,
  getAwaitingRoomMember,
  get_awaiting_room_membership,
  updateRoomMembershipSuccess,
  update_room_membership,
} from "../redux/room_membership/action";
import { userprofile } from "../utility";
import { useEffect } from "react";
import { getAllRoom, getRoom } from "../redux/room/action";
import {
  getOtherUserDetails,
  getOtherUsersProfile,
} from "../redux/authentication/action";

const Notifications = () => {
  const { awaitingRoomMember } = useSelector(
    (state) => state.roomMemberReducer
  );
  const { rooms } = useSelector((state) => state.roomReducer);
  const { user, loggedin, otherUsers } = useSelector(
    (state) => state.userDetails
  );
  const dispatch = useDispatch();

  let userProfile = userprofile();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    userProfile = userprofile();
    dispatch(get_awaiting_room_membership(userProfile?.token));
    dispatch(getAllRoom(userProfile));
    dispatch(getOtherUserDetails(userProfile?.token));
    return () => {
      dispatch(getAwaitingRoomMember([]));
      dispatch(getRoom([]));
      dispatch(getOtherUsersProfile([]));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const memberRoom = (group_id) => {
    const memberRoom = rooms?.groups?.find((room) => room.id === group_id);
    return memberRoom;
  };

  const roomUser = (user_id) => {
    const roomMember = otherUsers?.users?.find((user) => user.id === user_id);
    return roomMember;
  };

  //   const acceptUser = (group_uuid, callback, token, status) => {

  //     dispatch(updateRoomMembershipSuccess(group_uuid, callback, token, status));

  // };

  //   const rejectUser = () => {
  //     dispatch();
  //   };

  return (
    <div className="flex w-full md:flex-row flex-col">
      <div className="flex md:w-[70%] w-[100%] flex-col">
        <div className="flex mb-2 justify-center py-6 bg-white border-b-2 border-[#f3f7f0]">
          <h1 className="text-homegreen text-xl font-bold">Notifications</h1>
        </div>
        {awaitingRoomMember?.length === 0 ? (
          <p className="text-center pt-5">you have no notification</p>
        ) : (
          <div className="[&>*:nth-child(1)]:rounded-t-lg w-full">
    
            {awaitingRoomMember?.map(({ id, groupId, userId, uuid }) => (
              <div
                className="flex p-4 bg-white border-t-2 flex-col border-[#f3f7f0] first:border-t-0 shadow-xs shadow-[#3AAFA9] z-1 w-full"
                key={id}
              >
                <p>
                  <span className="font-bold">
                    {roomUser(userId)?.username}
                  </span>{" "}
                  is requesting to join{" "}
                  <span className="font-bold">{memberRoom(groupId)?.name}</span>
                </p>

                <div className="flex mt-2 gap-2">
                  <MyModal
                    name="accept"
                    group_uuid={uuid}
                    token={userProfile?.token}
                    status="verified"
                    content="Are you sure you want to accept this user request?"
                    btnStyle="bg-[#28a745]"
                    callback={update_room_membership}
                  />
                  <MyModal
                    name="reject"
                    group_uuid={uuid}
                    token={userProfile?.token}
                    content="Are you sure you want to reject this user request?"
                    btnStyle="bg-[#dc3545]"
                    callback={delete_room_membership}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;

function MyModal({
  name,
  group_uuid,
  token,
  status,
  callback,
  btnStyle,
  content,
}) {
  let [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleAction = () => {
    if (status === "verified") {
      dispatch(
        callback(
          group_uuid,
          () => {
            setIsOpen(false);
          },
          token,
          status
        )
      );
    } else {
      dispatch(
        callback(
          group_uuid,
          () => {
            setIsOpen(false);
          },
          token
        )
      );
    }
  };

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className={`rounded-md ${btnStyle} px-4 py-2 text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
        >
          {name}
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{content}</p>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-300 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleAction}
                    >
                      {name}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
