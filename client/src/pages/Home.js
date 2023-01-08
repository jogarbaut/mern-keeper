// Components
import Note from "../components/Note";

// CSS
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import NoteBar from "../components/NoteBar";
import { useNoteContext } from "../hooks/useNoteContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const [colsPerRow, setColsPerRow] = useState(0);
  const [gridPrefferred, setGridPreferred] = useState(true);

  const { notes, dispatch } = useNoteContext();
  const { user } = useAuthContext();

  useEffect(() => {
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
    if (user) {
      fetchNotes();
    }
  }, [dispatch, user]);

  useEffect(() => {
    gridPrefferred ? setColsPerRow(4) : setColsPerRow(1);
  }, [gridPrefferred]);

  return (
    <>
      <Container>
        <NoteBar />
        <div className="subsection">
          <div className="title">PINNED</div>
          <Row xs={1} md={colsPerRow}>
            {notes &&
              notes.map((note) =>
                note.pinned ? (
                  <>
                    <Col>
                      <Note key={note._id} note={note} />
                    </Col>
                  </>
                ) : (
                  <></>
                )
              )}
          </Row>
        </div>
        <div className="subsection">
          <div className="title">OTHER</div>
          <Row xs={1} md={colsPerRow}>
            {notes &&
              notes.map((note) =>
                !note.pinned ? (
                  <>
                    <Col>
                      <Note key={note._id} note={note} />
                    </Col>
                  </>
                ) : (
                  <></>
                )
              )}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Home;
