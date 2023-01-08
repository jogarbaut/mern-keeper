import { useEffect, useState } from 'react'
import { useLogout } from "../hooks/useLogout";
import { useNoteContext } from "../hooks/useNoteContext";
import { useAuthContext } from "../hooks/useAuthContext";
import InstructionsModal from './InstructionsModal';

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

import brandIcon from "../assets/images/brand-icon.png";

const HeaderBar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { notes, dispatch } = useNoteContext();

  const [query, setQuery] = useState("")

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch('http://localhost:8000/api/note', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        dispatch({ type: 'SET_NOTES', payload: json})
        dispatch({ type: 'FILTER_NOTES', payload: query})
      }
    }
    if (user) {
      fetchNotes()
    }
  }, [query])

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Navbar expand="md" className="header-bar">
        <Container>
          <Navbar.Brand href="/">
            <img src={brandIcon} alt="Brand Icon" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="header-bar-nav" id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">MERN Keeper</Nav.Link>
              {/* <Nav.Link href="/about">About</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
          {user ? (
            <Navbar.Collapse className="justify-content-between">
              <Form className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="search-bar"
                  aria-label="Search"
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                />
              </Form>
              <div>
              <Button
                className="logout-btn"
                variant="danger"
                onClick={handleLogout}
              >
                Log Out
              </Button>
              <InstructionsModal />
              </div>

            </Navbar.Collapse>
          ) : (
            <>
              <Navbar.Collapse className="justify-content-end">
                <Nav.Link href="/login">
                  <Button className="login-btn" variant="primary">
                    Demo Login
                  </Button>
                </Nav.Link>
                <Nav.Link href="/signup">
                  <Button className="signup-btn" variant="secondary">
                    Sign Up
                  </Button>
                </Nav.Link>
                <InstructionsModal />
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderBar;
