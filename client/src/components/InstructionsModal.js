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
        <Modal.Header closeButton className="border-0">
          <Modal.Title>
            <div className="instructions-title">MERN Keeper</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="instructions-body">
          <div className="instructions-subtitle">
            Web application inspired by Google Keep with bonus text recognition
            feature.
          </div>
          <div className="subsection">Demo Login</div>
          <ul>
            <li>
              Login to the Demo Account by clicking the 'Demo Login' button.
            </li>
          </ul>
          <div className="subsection">Notes</div>
          <ul>
            <li>Create a note with the note form.</li>
            <li>
              Add a title, body, background color, and choose to pin the note.
            </li>
            <li>Click 'Save' to save the note to the Demo Account.</li>
            <li>Saved notes can be editted, deleted, and pinned/unpinned.</li>
          </ul>
          <div className="subsection">
            Optical Character Recognition with Tesseract.js
          </div>
          <ul>
            <li>
              Select the 'Book' icon to upload an image to automatically add the
              text from an image to a note.
            </li>
            <li>
              Visit the{" "}
              <a href="https://github.com/naptha/tesseract.js#tesseractjs">
                Tesseract.js Github
              </a>{" "}
              to learn more about the library.
            </li>
          </ul>
          <div className="subsection">Search</div>
          <ul>
            <li>
              Use the search bar to query specific text in either the note title
              or body.
            </li>
          </ul>
          <div className="credits">
            <hr />
            <div className="credits-text">
              Project created by Jomel Bautista
            </div>
            <div className="credits-text">
              <small>If you would like to connect, please contact me at
              jomelgbautista@gmail.com</small>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default InstructionsModal;
