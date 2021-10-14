import React, { useState } from "react";
import ChatRoomitem from "./ChatRoomitem";
import CreateRoomModal from "./CreateRoomModal";
import roomStore from "../roomStore";
import { observer } from "mobx-react";

function ChatRoomsList(props) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  const openModal = () => setIsOpen(true);

  const roomsList = roomStore.room.map((room) => {
    return (
      <ChatRoomitem
        room={room}
        key={room.id}
        deleteRoom={roomStore.deleteRoom}
        updateRoom={roomStore.updateRoom}
      />
    );
  });
  return (
    <div className="main__chatlist">
      <button className="btn">
        <i className="fa fa-plus"></i>
        <span onClick={openModal}>New room</span>
        <CreateRoomModal
          isOpen={isOpen}
          closeModal={closeModal}
          createRoom={roomStore.createRoom}
        />
      </button>
      <center>
        <div className="chatlist__heading">
          <h2>Chat rooms</h2>
        </div>
      </center>

      <div className="chatlist__items">{roomsList}</div>
    </div>
  );
}
export default observer(ChatRoomsList);
