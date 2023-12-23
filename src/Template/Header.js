import React, { useContext } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { CurrentUserContext } from "../context/CurrentUserState";

function Header() {
  const navigate = useNavigate();
  const u = useContext(CurrentUserContext);

  const userObject = localStorage.getItem("current-user");

  let currentUser = {};
  if(userObject !== undefined) {
     currentUser = JSON.parse(userObject);
  }

  const handleLogout = async () => {
    try {
      const logout = localStorage.removeItem("current-user");
      if(logout === undefined){
        u.logout();
        navigate("/login");
      }
      console.info('rrrrrrr', logout);
      
      
      // Call the logout function, which should clear local storage or cookies
      //await logout();

      // Redirect to the login page
      //history.push('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  // const [show, setShow] = useState(false);
  // //const [flag, setFlag] = useState();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  // const loginHandle = async (e) => {
  //   e.preventDefault();
  //   let result = await fetch("http://localhost:5000/login", {
  //     method: "POST",
  //     body: JSON.stringify({ email, password }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   result = await result.json();
  //   console.log(result);
  //   if (result) {
  //     localStorage.setItem("user", JSON.stringify(result));
  //   }
  //   if (result.roleType) {
  //     handleClosee();
  //     navigate("/dashboard");
  //   }
  // };

  return (
    <>
      <Navbar bg="danger" variant="dark" expand="lg" className="Headercss">
        <Container fluid>
          <Navbar.Brand href="#">Ecommerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/products">
                Products
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                SignUp
              </Nav.Link>
              <Nav.Link as={Link} to="/side-menu">
                Side Menu
              </Nav.Link>

              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {/* <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-light">Search</Button>
            </Form> */}
            <Nav>
              <Nav.Link as={Link} to="/cart">
                Cart <sup>{"3"}</sup>
              </Nav.Link>
              {u?.currentUser?.firstName ? (
                <NavDropdown
                  title={`Welcome, ${u?.currentUser?.firstName}!`}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item href="#action3">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Account</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Setting</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">My Orders</NavDropdown.Item>
                  <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item  onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
