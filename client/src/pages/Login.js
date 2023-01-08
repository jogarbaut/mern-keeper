import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  // Demo login setup
  useEffect(() => {
    setEmail("demo-user@demo-email.com");
    setPassword("Demo-Password123?");
  }, []);

  return (
    <>
      <Container className="mt-3 login-container">
        <Form className="login" onSubmit={handleSubmit}>
          <div className="login-title">Login</div>
          <Form.Group className="mb-3 login-content">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3 login-content">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              disabled
            />
          </Form.Group>
          <div className="d-grid">
            <Button variant="primary" type="submit" className="login-button">
              Demo Login
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Login;
