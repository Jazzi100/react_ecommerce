import React, { useState, useEffect } from "react";

import {
  Row,
  Col,
  Container,
  Button,
  Card
  
} from "react-bootstrap";
import {  useNavigate   } from 'react-router-dom';
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";




const Cart = () => {
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);
  const [total, setTotal] = useState(0);
  const [qty, setQty] = useState();
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
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
        setCarts(response.data)
        // Quantity
        const quantities = response.data.map(item => item.quantity);
        console.log("Quantities in response : " + quantities);
        setQty(quantities);
        // Price
        const prices = response.data.map(item => item.product_id.price);
        console.log("Prices in response : " + prices);
        // Calculate total price for each item
        const itemTotalPrices = prices.map((price, index) => price * quantities[index]);

      // Calculate total quantity and total price
      // const totalQuantity = response.data.reduce((acc, item) => acc + item.quantity, 0);
      const totalPrice = response.data.reduce((acc, item) => acc + item.quantity * item.product_id.price, 0);
      
  
      setQty(quantities);
      setPrice(prices);
      setTotal(totalPrice);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Handle input field change
  const handleQuantityChange = (e) => {
    console.log("gggggg : " + e.target.value);
    const newQuantity = parseInt(e.target.value, 10); 
    setQuantity(newQuantity); 
    console.log("New Quantity :" + newQuantity); // Log the newQuantity directly
  };

  const handleContinueShopping = () => {
    navigate(`/products`);
  }


  const removeCart = (id) => {
    console.log("Product ID want to remove : "+ id);
    
    if (id != null) {
      axios({
        method: "delete",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        url: `http://localhost:5000/api/cart/${id}`,
      })
        .then((response) => {
          console.log(response.data);
          setCarts(prevCarts => prevCarts.filter(cart => cart._id !== id)); 
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
    
  
  

  const cartdiv = {
    padding: "20px",
    fontFamily: "Arial",
    border: "1px solid #c6ccdd80",
    boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.1)",
    marginBottom: "10px"
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
          
          <Col sm={8}>
            {carts.length > 0 ? (
              carts.map(({ _id,product_id, quantity }) => (
                <div style={cartdiv}>
              <Row>
                <Col sm={2}>
                  
                  <Card.Img
                    variant="top"
                    height="150px"
                    src={`http://localhost:5000/${product_id.productImage}`}
                  />
                </Col>
                <Col sm={8}>
                  <p>
                    {product_id.title}
                  </p>
                  <a
                    style={{
                      fontSize: "15px",
                      color: "black",
                      textDecoration: "none",
                    }}
                    
                  >
                    <RiDeleteBin6Line />
                    <span onClick={() => removeCart(_id)} style={{ cursor: "pointer" }}> Remove</span>
                  </a>
                </Col>
                <Col sm={2} className="d-flex flex-column justify-content-between align-items-end">
                  <div style={{ marginBottom: "auto", textAlign: "right" }}>
                    AED <b style={{ fontSize: "25px" }}>{product_id.price}</b>
                  </div>
                  <div style={{ marginTop: "auto" }}>
                    {/* <input type="number" min="1" value={quantity} style={qtyInput} /> */}
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      style={qtyInput}
                      onChange={handleQuantityChange} // Bind onChange event handler
                    />
                  </div>
                </Col>
              </Row>
            </div>
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

            <Button className="text-center" variant="outline-danger" onClick={handleContinueShopping}>
              Continoue Shopping
            </Button>
          </Col>
         

          <Col sm={4}>
            <div style={cartdiv}>
              <b style={{ fontSize: "25px" }}>Order Summary</b>
              <p style={{ color: "#7e859b" }}>
                SubTotal (items)
                <span style={checkout_price}>AED {total}</span>
              </p>
              <p style={{ color: "#7e859b" }}>
                Shipping Detail
                <span style={{ float: "right", color: "#dc3545" }}>
                  <b>Free </b>
                </span>
              </p>
              <hr />
              <p>
                <b style={{ fontSize: "25px" }}>Total</b>{" "}
                <span style={{ color: "#7e859b" }}>(Inclusive of VAT)</span>
                <span style={checkout_price}>AED {total}</span>
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
