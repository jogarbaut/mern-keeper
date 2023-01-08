import { useState } from "react";
import { useNoteContext } from "../hooks/useNoteContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button, Card, Form } from "react-bootstrap";
import unfilledPin from "../assets/icons/push_pin_FILL0.png";
import filledPin from "../assets/icons/push_pin_FILL1.png";
import TesseractInput from "./TesseractInput";

const NoteBar = (props) => {
  const { dispatch } = useNoteContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [pinned, setPinned] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const note = { title, body, backgroundColor, pinned };
    const response = await fetch("http://localhost:8000/api/note", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      setTitle("");
      setBody("");
      setBackgroundColor("transparent");
      setPinned(false);
      console.log("New note added", json);
      dispatch({ type: "CREATE_NOTE", payload: json });
    }
  };

  const handleTogglePin = () => {
    !pinned ? setPinned(true) : setPinned(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
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
              </div>
              <Button className="save" type="submit">
                Save
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Form>
    </>
  );
};

export default NoteBar;
