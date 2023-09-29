import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
  Dropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import Cookies from "js-cookie";
import axios from "axios";
import { useAuth } from "../components/authContext";


const MyNavbar = () => {
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const { setCurrentUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupErrors, setSignupErrors] = useState({});

  const refreshToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3002/api/refresh-token"
      );
      const newToken = response.data.token;

      Cookies.set("authToken", newToken);

      console.log("Token refreshed successfully.");
    } catch (error) {
      console.error("Token refresh failed:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!username.trim()) {
      validationErrors.username = "Username is required";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3002/api/login", {
        username,
        password,
      });

      if (response.status === 200) {
        // Successfully logged in
        const user = response.data.user;
        setCurrentUser(user);
        Cookies.set("authToken", response.data.token);
        setAlert({
          show: true,
          type: "success",
          message: "Logged in successfully!",
        });
        setUsername("");
        setPassword("");

        const token = Cookies.get("authToken");

        if (decodedToken.exp - currentTime < 300) {
          await refreshToken();
        }
        setTimeout(() => setAlert({ ...alert, show: false }), 5000);
      } else {
        // Handle other response statuses here
        setAlert({ show: true, type: "danger", message: "Login failed!" });
      }
    } catch (error) {
      // Handle network errors and other unexpected errors
      console.error("Login error:", error);
      setAlert({ show: true, type: "danger", message: "Login failed!" });
    }
  };

  const handleLogout = () => {
    Cookies.remove("authToken");
    navigate("/");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!signupUsername.trim()) {
      validationErrors.username = "Username is required";
    }

    if (!signupEmail.trim() || !signupEmail.includes("@")) {
      validationErrors.email = "Valid email is required";
    }

    if (!signupPassword.trim()) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setSignupErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3002/api/user", {
        username: signupUsername,
        email: signupEmail,
        password: signupPassword,
      });
      setAlert({
        show: true,
        type: "success",
        message: "Signed up successfully!",
      });

      setSignupUsername("");
      setSignupEmail("");
      setSignupPassword("");

      setTimeout(() => setAlert({ ...alert, show: false }), 5000);
    } catch (error) {
      console.error("Signup error:", error);
      setAlert({ show: true, type: "danger", message: "Signup failed!" });
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {alert.show && (
          <div
            className={`alert alert-${alert.type} alert-dismissible fade show`}
            role="alert"
          >
            {alert.message}
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => setAlert({ ...alert, show: false })}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        <Navbar.Brand as={Link} to="/">
          The Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={classNames("m2-auto")}>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {Cookies.get("authToken") ? (
              <>
                <Nav.Link as={Link} to="/account">
                  Account
                </Nav.Link>
                <Nav.Link as={Link} to="/cart">
                  Cart
                </Nav.Link>
                <Nav.Link as={Link} onClick={handleLogout}>
                  Logout
                </Nav.Link>{" "}
              </>
            ) : (
              <>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Login / Signup
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="right">
                    <Form className="px-4 py-3" onSubmit={handleLogin}>
                      <Form.Group controlId="exampleDropdownFormEmail1">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="John Doe"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                        {errors.username && <p>{errors.username}</p>}
                      </Form.Group>
                      <Form.Group controlId="exampleDropdownFormPassword1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        {errors.password && <p>{errors.password}</p>}
                      </Form.Group>
                      <Form.Check
                        type="checkbox"
                        label="Remember me"
                        id="dropdownCheck"
                      />
                      <Button type="submit" className="btn btn-primary">
                        Sign in
                      </Button>
                    </Form>
                    <Dropdown.Divider />
                    <Form className="px-4 py-3" onSubmit={handleSignup}>
                      <Form.Group controlId="exampleDropdownFormSignupUsername">
                        <Form.Label>Signup Username</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="John Doe"
                          value={signupUsername}
                          onChange={(e) => setSignupUsername(e.target.value)}
                          required
                        />
                        {signupErrors.username && (
                          <p>{signupErrors.username}</p>
                        )}
                      </Form.Group>
                      <Form.Group controlId="exampleDropdownFormSignupEmail">
                        <Form.Label>Signup Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="johndoe@example.com"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          required
                        />
                        {signupErrors.email && <p>{signupErrors.email}</p>}
                      </Form.Group>
                      <Form.Group controlId="exampleDropdownFormSignupPassword">
                        <Form.Label>Signup Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          required
                        />
                        {signupErrors.password && (
                          <p>{signupErrors.password}</p>
                        )}
                      </Form.Group>
                      <Button type="submit" className="btn btn-secondary">
                        Sign up
                      </Button>
                    </Form>

                    <Dropdown.Divider />
                    <Dropdown.Item href="#">Forgot password?</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
