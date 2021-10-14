import { makeObservable, observable, action } from "mobx";
import axios from "axios";

class Room {
  room = [];

  constructor() {
    makeObservable(this, {
      room: observable,
      fetchRooms: action,
      createRoom: action,
      deleteRoom: action,
      updateRoom: action,
      createMsg: action,
    });
  }
  fetchRooms = async () => {
    try {
      const response = await axios.get(
        "https://coded-task-axios-be.herokuapp.com/rooms"
      );
      this.room = response.data;
    } catch (error) {
      console.log(error);
    }
  };
  createRoom = async (newRoom) => {
    try {
      const response = await axios.post(
        "https://coded-task-axios-be.herokuapp.com/rooms",
        newRoom
      );
      this.room(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  deleteRoom = async (id) => {
    try {
      const response = await axios.delete(
        `https://coded-task-axios-be.herokuapp.com/rooms/${id}`
      );
      this.room = this.room.filter((room) => room.id !== id);
    } catch (error) {
      console.log(error);
    }
  };
  updateRoom = async (updatedRoom) => {
    try {
      const response = await axios.put(
        `https://coded-task-axios-be.herokuapp.com/rooms/${updatedRoom.id}`,
        updatedRoom
      );
      this.room = this.room.map((room) =>
        room.id === updatedRoom.id ? response.data : room
      );
    } catch (error) {
      console.log(error);
    }
  };
  createMsg = async (roomId, msg) => {
    try {
      const response = await axios.post(
        `https://coded-task-axios-be.herokuapp.com/rooms/msg/${roomId}`,
        msg
      );
      const ourRoom = this.room.find((room) => room.id === roomId);
      ourRoom.messages.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };
}
const roomStore = new Room();
roomStore.fetchRooms();
export default roomStore;
