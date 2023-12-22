import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";

import axios from "axios";
import Swal from "sweetalert2";

import LeftSideBar from "../LeftSideBar";

function AdminCategory() {
  const [title, setTitle] = useState("");


  // Get All categories APIs call
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      url: "http://localhost:5000/api/category/get-all-categories",
    })
      .then((response) => {
        console.log("Categoriesssss",response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // ADD PRODUCT API
  const collectData = async (e) => {
    e.preventDefault();

    const requestData = {
      name: title,
    };

    let result = await fetch("http://localhost:5000/api/category/add-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData), // Use the requestData object directly
    });
 
    const responseData = await result.json(); // Parse the response JSON

    if (responseData.status === 500) {
      Swal.fire({
        icon: "error",
        text: responseData.message,
      });
    //   setTitle("");
    }else{
      Swal.fire({
        icon: "success",
        text: responseData.message,
      });
      axios({
        method: "get",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        url: "http://localhost:5000/api/category/get-all-categories",
      })
        .then((response) => {
          console.log("Categoriesssss",response.data);
          setCategories(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Row>
      <Col>
        <LeftSideBar />
      </Col>
      <Col sm={9}>
        <h3 className="p-3">Add New Category</h3>
        <Form className="p-3" encType="multipart/form-data">
          <Form.Group as={Row} className="mb-3" controlId="title">
            <Form.Label column sm="2">
              Category
            </Form.Label>
            <Col sm="8">
              <Form.Control
                input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>
            <Col sm="2">
              <Form.Group
                controlId="formFileMultiple"
                className="mb-3"
                align="right"
              >
                <Button variant="danger" type="submit" onClick={collectData}>
                  Add Category
                </Button>
              </Form.Group>
            </Col>
          </Form.Group>
        </Form>

        AllCategory
        <Table width={100}><thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map(
                (
                  {
                    _id,
                    name,
                    status,
                  },
                  index
                ) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    
                    <td>{name}</td>
                   
                    <td>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        //onChange={(e) => setChangeStatus(status, _id)}
                        checked={status ? "checked" : ""}
                      />
                    </td>
                    <td>
                      <Button href={"/edit-product/" + _id}>Edit</Button>
                      &nbsp;
                      <Button
                        variant="danger"
                        //onClick={(e) => deleteProduct(_id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={9} align="center">
                  <h4>Sorry Not Product Found</h4>
                </td>
              </tr>
            )}
          </tbody>
          </Table>
      </Col>
    </Row>
    
    </>
  );
}

export default AdminCategory;
