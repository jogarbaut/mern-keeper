import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const InstructionsModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="warning" onClick={handleShow} className="ms-2">
        Demo Instructions
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>MERN Keeper Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This is a web application inspired by Google Keep with an additional text dectection feature. To explore the functionality of the web application, click the 'Demo.
            Login' button and login with the provided credentials.
          </p>
          <p>
            After logging in, add a note or edit an existing note.
          </p>
          <p>
            Click the color palette icon to change the background color of the note.
          </p>
          <p>
            Click the book icon to upload an image and have the text automatically detected using the Tesseract.js API.
          </p>
          <p>
            Use the search bar to query existing notes.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InstructionsModal;
