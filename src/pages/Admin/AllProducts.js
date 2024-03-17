import React, { useState, useEffect } from "react";
import { Row, Col, Table, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import axios from "axios";

import LeftSideBar from "./LeftSideBar";
function AllProducts() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      url: "http://localhost:5000/products",
    })
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Change Status

  const setChangeStatus = async (status, id) => {
    console.log("working Change Status = " + status + " ID = " + id);
    if (status === 1) {
      status = 0;
      let result = await fetch(`http://localhost:5000/product-status/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          status,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);
      if (result) {
        //localStorage.setItem("user", JSON.stringify(result));
        axios({
          method: "get",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          url: "http://localhost:5000/products",
        })
          .then((response) => {
            console.log(response.data);
            setProducts(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        navigate("/dashboard");
      }
    } else {
      status = 1;
      let result = await fetch(`http://localhost:5000/product-status/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          status,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);
      if (result) {
        axios({
          method: "get",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          url: "http://localhost:5000/products",
        })
          .then((response) => {
            console.log(response.data);
            setProducts(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        navigate("/dashboard");
      }
    }
  };

  //Delete Product
  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/api/product/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();

    if (result) {
      Swal.fire({
        icon: "success",
        text: result.message,
      });
      axios({
        method: "get",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        url: "http://localhost:5000/products",
      })
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <Row className="w-100">
      <Col>
        <LeftSideBar />
      </Col>
      <Col sm={9}>
        <h3 className="p-3">All Products</h3>
        <p align="right">
          <Button variant="danger" href="/add-product" align="right">
            Add Product
          </Button>
        </p>
        <Table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Image</th>
              <th>Name</th>
              <th>description</th>
              <th>price</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map(
                (
                  {
                    _id,
                    title,
                    description,
                    price,
                    catagory_id,
                    quantity,
                    productImage,
                    status,
                  },
                  index
                ) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={`http://localhost:5000/${productImage}`}
                        width={80}
                        height={80}
                        alt="..."
                      />
                    </td>
                    <td>{title}</td>
                    <td>{description}</td>
                    <td>{price}</td>
                    <td>{catagory_id?.name}</td>
                    <td>{quantity}</td>
                    <td>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        onChange={(e) => setChangeStatus(status, _id)}
                        checked={status ? "checked" : ""}
                      />
                    </td>
                    <td>
                      <Button href={"/edit-product/" + _id}>Edit</Button>
                      &nbsp;
                      <Button
                        variant="danger"
                        onClick={(e) => deleteProduct(_id)}
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
  );
}

export default AllProducts;
