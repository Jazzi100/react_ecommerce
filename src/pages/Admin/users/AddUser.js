import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import LeftSideBar from "../LeftSideBar";

function AddUser() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const collectData = async (e) => {
    e.preventDefault();
    console.log(firstName, lastName, email, 18);

    const data = new FormData();
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("email", email);

    let result = await axios.post(
      "http://localhost:5000/api/product/add-product",
      data
    );
    if (result) {
      Swal.fire({
        icon: "success",
        text: result.data.message,
      });
    }
  };
  return (
    <Row>
      <Col>
        <LeftSideBar />
      </Col>
      <Col sm={9}>
        <h3 className="p-3">Add New User</h3>
        <Form className="p-3" encType="multipart/form-data">
          <Form.Group as={Row} className="mb-3" controlId="firstName">
            <Form.Label column sm="2">
              First Name
            </Form.Label>
            <Col sm="8">
              <Form.Control
                input
                type="text"
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
                autoComplete="off"
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="lastName">
            <Form.Label column sm="2">
              Last Name
            </Form.Label>
            <Col sm="8">
              <Form.Control
                input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="off"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="email">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="8">
              <Form.Control
                input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2"></Form.Label>
            <Col sm="8">
              <Form.Group
                controlId="formFileMultiple"
                className="mb-3"
                align="right"
              >
                <Button variant="danger" type="submit" onClick={collectData}>
                  Add User
                </Button>
              </Form.Group>
            </Col>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
}

export default AddUser;
