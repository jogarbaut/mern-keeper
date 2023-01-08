import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNoteContext } from "../hooks/useNoteContext";
import TesseractInput from "./TesseractInput";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import unfilledPin from "../assets/icons/push_pin_FILL0.png";
import filledPin from "../assets/icons/push_pin_FILL1.png";

const Note = ({ note }) => {
  // Context
  const { dispatch } = useNoteContext();
  const { user } = useAuthContext();

  // Local state
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const [backgroundColor, setBackgroundColor] = useState(note.backgroundColor);
  const [pinned, setPinned] = useState(note.pinned);

  // Modal functionality
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Update note functionality
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    const updatedNote = { title, body, backgroundColor, pinned };
    const response = await fetch(`http://localhost:8000/api/note/${note._id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedNote),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    const fetchNotes = async () => {
      const response = await fetch("http://localhost:8000/api/note", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_NOTES", payload: json });
      }
    };
    if (response.ok) {
      dispatch({ type: "UPDATE_NOTE", payload: json });
      fetchNotes()
      handleClose();
    }
  };

  // Delete note functionality
  const handleDelete = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(`http://localhost:8000/api/note/${note._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_NOTE", payload: json });
    }
  };

  // Update pin functionality
  const handleTogglePin = () => {
    !pinned ? setPinned(true) : setPinned(false);
  };

  return (
    <>
      {!show ? (
        <>
          <Card
            className="note"
            style={{ backgroundColor: backgroundColor }}
            onClick={handleShow}
          >
            <Card.Body className="body">
              {title ? (
                <>
                  <Card.Title>
                    <div className="title">{title}</div>
                  </Card.Title>
                </>
              ) : (
                <></>
              )}

              {note.body ? (
                <>
                  <Card.Text>
                    <div className="body">{body}</div>
                  </Card.Text>
                </>
              ) : (
                <></>
              )}
            </Card.Body>
          </Card>
        </>
      ) : (
        <>
          <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleUpdate}>
              <Card
                className="note-form"
                style={{ backgroundColor: backgroundColor }}
              >
                <div className="pin">
                  {!pinned ? (
                    <span onClick={handleTogglePin}>
                      <img src={unfilledPin} alt="unfilled pin" />
                    </span>
                  ) : (
                    <span onClick={handleTogglePin}>
                      <img src={filledPin} alt="filled pin" />
                    </span>
                  )}
                </div>
                <Card.Body>
                  <Form.Control
                    className="title"
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  ></Form.Control>
                  <Form.Control
                    className="body"
                    as="textarea"
                    placeholder="Take a note..."
                    onChange={(e) => setBody(e.target.value)}
                    value={body}
                  ></Form.Control>
                  <div className="card-icons">
                    <div className="card-options">
                      <label className="colorInput">
                        <input
                          type="color"
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          value={backgroundColor}
                        />
                        <span className="material-symbols-outlined">
                          palette
                        </span>
                      </label>
                      <TesseractInput body={body} setBody={setBody} />
                      <label className="delete">
                        <span
                          className="material-symbols-outlined"
                          onClick={handleDelete}
                        >
                          delete
                        </span>
                        </label>
                    </div>
                    <Button className="save" type="submit">
                      Save
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Form>
          </Modal>
        </>
      )}
    </>
  );
};

export default Note;
