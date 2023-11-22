import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

import axios from "axios";
import Swal from "sweetalert2";

import LeftSideBar from "./LeftSideBar";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productImage, setProductImage] = useState("");

  const onChangeImage = (e) => {
    setProductImage(e.target.files[0]);
  };

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
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // ADD PRODUCT API
  const collectData = async (e) => {
    e.preventDefault();
    console.log(
      title,
      description,
      price,
      category,
      quantity,
      productImage,
      40
    );

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("price", price);
    data.append("category", category);
    data.append("quantity", quantity);
    data.append("productImage", productImage);

    let result = await axios.post(
      "http://localhost:5000/api/product/add-product",
      data
    );
    if (result) {
      Swal.fire({
        icon: "success",
        text: result.data.message,
      });

      setTitle("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setProductImage("");
    }
  };

  return (
    <Row>
      <Col>
        <LeftSideBar />
      </Col>
      <Col sm={9}>
        <h3 className="p-3">Add New Product</h3>
        <Form className="p-3" encType="multipart/form-data">
          <Form.Group as={Row} className="mb-3" controlId="title">
            <Form.Label column sm="2">
              Title
            </Form.Label>
            <Col sm="8">
              <Form.Control
                input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Description
            </Form.Label>
            <Col sm="8">
              <Form.Group className="mb-3" controlId="description">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="price">
            <Form.Label column sm="2">
              Price
            </Form.Label>
            <Col sm="8">
              <Form.Control
                input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="category">
            <Form.Label column sm="2">
              Category
            </Form.Label>
            <Col sm="8">
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setCategory(e.target.value)}
                value={category._id}
              >
                <option disabled selected>
                  --SELECT ANY ONE--
                </option>
                {categories.length &&
                  categories.map(({ _id, name }) => (
                    <option key={_id} value={_id}>
                      {name}
                    </option>
                  ))}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="Quantity">
            <Form.Label column sm="2">
              Quantity
            </Form.Label>
            <Col sm="8">
              <Form.Control
                input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="image">
            <Form.Label column sm="2">
              Images
            </Form.Label>
            <Col sm="8">
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Control
                  fileName="productImage"
                  type="file"
                  multiple
                  onChange={onChangeImage}
                />
              </Form.Group>
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
                  Add Product
                </Button>
              </Form.Group>
            </Col>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
}

export default AddProduct;
