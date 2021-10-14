import { Modal, Button, InputGroup, Form } from "react-bootstrap";
import React, { useState } from "react";
import roomStore from "../roomStore";

export default function CreateRoomModal(props) {
  const [room, setRoom] = useState({
    title: "",
    image: "",
    description: "",
    messages: [],
  });
  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    roomStore.createRoom(room);
    props.closeModal(); // this is to close the modal that is shown
  };
  return (
    <Modal centered show={props.isOpen} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create a room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputGroup.Text>Title</InputGroup.Text>
            <Form.Control type="text" name="title" onChange={handleChange} />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroup.Text>Image</InputGroup.Text>
            <Form.Control type="text" name="image" onChange={handleChange} />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroup.Text>Description</InputGroup.Text>
            <Form.Control
              type="text"
              name="description"
              onChange={handleChange}
            />
          </InputGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Create room
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
