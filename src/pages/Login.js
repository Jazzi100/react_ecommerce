import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import loginImg from "../images/pic2.jpg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


import { CurrentUserContext } from "../context/CurrentUserState";

const Login = () => {
  const { login } = useContext(CurrentUserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const collectData = async (e) => {
    e.preventDefault();

    try {
      let result = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      result = await result.json();
     
      if (result.message) {
        Swal.fire({
          icon: "error",
          title: "Login Error",
          text: result.message,
        });
      }else{
        login(result.data);
        localStorage.setItem("current-user", JSON.stringify(result));
        if (result.data.user.roleType === 1) {
          navigate("/dashboard");
        }
        
        setTimeout(() => {
          // Remove the local storage data
          localStorage.removeItem("current-user");
        
          // Redirect to the login page (adjust the path as needed)
         
          navigate("/login");
        }, 2 * 60 * 1000); // 5 minutes in milliseconds
        
      }
      
      
    } catch (error) {
      console.error("Error:", error);
    }

    // setTimeout(() => {
    //   //localStorage.removeItem("current-user");
    //   alert("OK");
    // }, 1 * 60 * 1000);
  };

  var div_style = {
    width: "500px",
    height: "100%",
    margin: "auto",
    padding: "60px",
  };
  var sign_up = {
    fontFamily: "sans-serif",
  };
  var image_style = {
    margin: "auto",
    padding: "60px",
  };
  var click_here = {
    fontSize: "13px",
  };

  return (
    <Container fluid="md">
      <Row>
        <Col>
          <img
            src={loginImg}
            width="550px"
            height="600px"
            style={image_style}
            alt=""
          />
        </Col>
        <Col>
          <div style={div_style}>
            <h2 className="mb-4" style={sign_up}>
              Login
            </h2>

            <Form>
              <Form.Group className="mb-2" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="abc@gmail.com"
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                />
              </Form.Group>

              <Button
                variant="danger"
                onClick={collectData}
                type="submit"
                className="mt-2 form-control"
              >
                Login
              </Button>
            </Form>
            <p className="mt-3" style={click_here}>
              Already have an account <a href="/login">click here</a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
