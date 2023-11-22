import React, { useState, useEffect } from "react";

import {
  Row,
  Col,
  Table,
  Container,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";

const Cart = () => {
  const [carts, setCarts] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      url: "http://localhost:5000/api/cart/get-cart",
    })
      .then((response) => {
        console.log(response.data);
        setCarts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const cartdiv = {
    padding: "30px",
    fontFamily: "Arial",
    border: "1px solid #c6ccdd80",
    boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.1)",
  };
  const checkout_price = {
    float: "right",
    color: "black",
  };
  const qtyInput = {
    width: "50px",
  };
  return (
    <>
      <Container fluid className="p-3">
        <Row>
          <h3>Cart</h3>
          {/* <Col sm={8}>
            {carts.length > 0 ? (
              carts.map(({ product_id, quantity }) => (
                <Card className="m-3">
                  <Card.Body>
                    <Table variant="light">
                      <tbody>
                        <tr>
                          <td>{product_id.title}</td>
                          <td>{quantity}</td>
                          <td>AED {quantity * product_id.price} </td>
                          <td>
                            <RiDeleteBin6Line />
                            Remove
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <tbody>
                <tr>
                  <td colSpan={5}>
                    <h4 align="center">Your Cart is Empty</h4>
                  </td>
                </tr>
              </tbody>
            )}

            <Button className="text-center" variant="outline-danger">
              Continoue Shopping
            </Button>
          </Col> */}
          <Col>
            <div style={cartdiv}>
              <Row>
                <Col sm={2}> image</Col>
                <Col sm={8}>
                  <p>
                    Men's Waterproof Analog Wristwatch 8322 - 45 mm - Silver
                  </p>
                  <a
                    style={{
                      fontSize: "15px",
                      color: "black",
                      textDecoration: "none",
                    }}
                    href="https://www.example.com"
                  >
                    <RiDeleteBin6Line />
                    Remove
                  </a>
                </Col>
                <Col sm={2}>
                  <span style={{ float: "right" }}>
                    AED <b style={{ fontSize: "25px" }}>35</b>
                  </span>
                  <span style={{ float: "right", paddingTop: "30px" }}>
                    <input type="number" min="1" style={qtyInput} />
                  </span>
                </Col>
              </Row>
            </div>
          </Col>

          <Col sm={4}>
            <div style={cartdiv}>
              <b style={{ fontSize: "25px" }}>Order Summary</b>
              <p style={{ color: "#7e859b" }}>
                SubTotal (items)
                <span style={checkout_price}>AED </span>
              </p>
              <p style={{ color: "#7e859b" }}>
                Shipping Detail
                <span style={{ float: "right", color: "#dc3545" }}>
                  <b>Free</b>
                </span>
              </p>
              <hr />
              <p>
                <b style={{ fontSize: "25px" }}>Total</b>{" "}
                <span style={{ color: "#7e859b" }}>(Inclusive of VAT)</span>
                <span style={checkout_price}>AED </span>
              </p>
              <Button variant="danger" className="w-100" size="lg">
                CHECKOUT
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cart;
