import React, { useState } from "react";
import makeRoom from "../redux/room/action";
import { userprofile } from "../utility";
import { useDispatch } from "react-redux";
const RoomForm = () => {
  const [roomDescription, setRoomDescription] = useState("");
  const [roomContent, setRoomContent] = useState("");
  const [roomName, setRoomName] = useState("");
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setRoomContent(e.target.value);
  };

  const resetRoomForm = () => {
    setRoomContent("");
    setRoomDescription("");
    setRoomDescription("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const roomObj = {
      content: roomContent,
      name: roomName,
      description: roomDescription,
    };

    dispatch(makeRoom(roomObj, resetRoomForm, userprofile()));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white flex flex-col rounded-lg mb-2 p-2">
      <label>
        <input
          id="roomName"
          type="text"
          onChange={(e) => setRoomName(e.target.value)}
          value={roomName}
          placeholder="roomname"
          required
          className="border-2 mb-2"
        />
      </label>
      <label>
        <input
          id="roomDescription"
          type="text"
          onChange={(e) => setRoomDescription(e.target.value)}
          value={roomDescription}
          placeholder="roomDescription"
          className="border-2 mb-2"
          required
        />
      </label>
      <label>
        <textarea
          type="text"
          placeholder="add the content to be available for group members here"
          className="text-black w-full h-[auto] border-2 outline-0 outline-homegreen"
          value={roomContent}
          maxLength={500}
          minLength={1}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="bg-homegreen text-white px-3 py-1 rounded-lg"
        >
          create room
        </button>
      </div>
    </form>
  );
};

export default RoomForm;
