import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Card, Container, Form, Button } from "react-bootstrap";

import Categories from "./Categories";
import "./productPageStyleSheet.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState("");
  const [cart, setCart] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      url: "http://localhost:5000/api/product/get-active-products",
    })
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //-----add to cart function-----

  // useEffect(() => {
  //   // Retrieve the cart items from local storage
  //   const storedCartItems = localStorage.getItem("cartItems");
  //   if (storedCartItems) {
  //     setCartItems(JSON.parse(storedCartItems));
  //   }
  // }, []);

  const addToCart = (item) => {
    let data = {
      p_id: item._id,
      qty: qty,
    };
  };
  //   console.log("add to cart line no 44 : " + item._id);
  //   const storedCartItems = localStorage.getItem("cartItems");
  //   console.log("storedCartItems : " + storedCartItems);
  //   if (!storedCartItems) {
  //     localStorage.setItem("cartItems", JSON.stringify(data));
  //   } else {
  //     const storedCartItems = localStorage.getItem("cartItems");
  //     console.log("storedCartItems line no 51 : " + storedCartItems);

  //     console.log("stored Cart Items ID : " + storedCartItems.p_id);
  //     console.log("Item ID : " + item._id);
  //     if (storedCartItems.p_id === item._id) {
  //       console.log("if condition m agya line no 48");
  //       updateCartItem(item);
  //     } else {
  //       setCartItems([...cartItems, data]);
  //       // Save the updated cart items to local storage
  //       localStorage.setItem("cartItems", JSON.stringify([...cartItems, data]));
  //     }
  //   }

  //   const updateCartItem = (item) => {
  //     const elementIndex = data.findIndex((c) => c.p_id === item.p_id);
  //     if (elementIndex > -1) {
  //       data[elementIndex] = item;
  //       //storeCartInLocalStorage();
  //     }
  //   };
  //   // setCartItems([...cartItems, data]);
  //   // // Save the updated cart items to local storage
  //   // localStorage.setItem("cartItems", JSON.stringify([...cartItems, data]));
  // };

  //--------------------------------
  // const addToCart = async (item) => {
  //   let data = {
  //     p_id: item._id,
  //     qty: qty,
  //   };

  //   //-------------------------------------------
  //   // const existingCartItems =
  //   //   JSON.parse(localStorage.getItem("cartItems")) || [];

  //   // //const updatedCartItems = [...existingCartItems, data];

  //   // const updateCartItem = (item) => {
  //   //   const elementIndex = data.findIndex((c) => c.p_id === item.p_id);
  //   //   if (elementIndex > -1) {
  //   //     data[elementIndex] = item;
  //   //     //storeCartInLocalStorage();
  //   //   }
  //   // };

  //   // localStorage.setItem("cartItems", JSON.stringify(data));

  //   // console.log("Item added to cart:", item);
  //   // const getCart = JSON.parse(localStorage.getItem("cartItems"));
  //   // console.log("local stroage ka cart : " + getCart.p_id);
  //   //-------------------------------------------
  //   // try {s
  //   //   let response = await axios.post(
  //   //     "http://localhost:5000/api/cart/add-cart",
  //   //     data
  //   //   );
  //   //   let result = response.data;
  //   //   console.log(result, 66);

  //   //   if (result) {
  //   //     console.log(result, 68);
  //   //   }
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  //   //-----add to cart function-----
  // };

  var div_style = {
    margin: "10px",
  };
  return (
    <>
      <Container>
        <Row>
          <h3>Products</h3>
        </Row>
        <Row>
          <Col sm={2}>
            <Categories />
          </Col>
          <Col sm={10}>
            <Row>
              {products.length > 0 ? (
                products.map(
                  ({
                    _id,
                    title,
                    description,
                    price,
                    category,
                    productImage,
                  }) => (
                    <Col sm={3}>
                      <div style={div_style}>
                        <Card className="Red">
                          <Card.Img
                            variant="top"
                            height="150px"
                            src={`http://localhost:5000/${productImage}`}
                          />
                          <Card.Body>
                            <Card.Title>AED {price}</Card.Title>
                            <Card.Text>{title}</Card.Text>
                            <Form>
                              <Form.Group className="mb-2">
                                <Form.Control
                                  type="number"
                                  min="1"
                                  size="sm"
                                  onChange={(e) => setQty(e.target.value)}
                                />
                              </Form.Group>

                              {/* <Nav.Link as={Link} to="/cart"> */}
                              <Button
                                className="mb-1 w-100"
                                size="sm"
                                variant="outline-danger"
                                id={_id}
                                onClick={() =>
                                  addToCart({
                                    _id,
                                    title,
                                    description,
                                    price,
                                    category,
                                    productImage,
                                  })
                                }
                              >
                                Add To Cart
                              </Button>
                              {/* </Nav.Link> */}
                            </Form>
                          </Card.Body>
                        </Card>
                      </div>
                    </Col>
                  )
                )
              ) : (
                <h3 align="center">Sorry no Product Found</h3>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Products;
