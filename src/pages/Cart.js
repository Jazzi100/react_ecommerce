import React, { useState, useEffect, useContext } from "react";

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
import { CurrentUserContext } from "../context/CurrentUserState";


const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [qty, setQty] = useState();
  const [price, setPrice] = useState(0);


  const { currentUser } = useContext(CurrentUserContext);
  let currentUserId;
  if (currentUser && currentUser?.user) {
    currentUserId = currentUser.user._id;
  }

  console.log("current user id on cart page : ", currentUserId );

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      url: `http://localhost:5000/api/cart/get-cart?userId=${currentUserId}`,
    })
      .then((response) => {
        console.log("API Response : "+ JSON.stringify(response.data.cart));
        setCart(response.data.cart)
      //   // Quantity
      //   const quantities = response.data.cart.map(item => item.quantity);
      //   // console.log("Quantities in response : " + quantities);
      //   setQty(quantities);
      //   // Price
      //   const prices = response.data.cart.map(item => item.product_id.price);
      //   // console.log("Prices in response : " + prices);
      //   // Calculate total price for each item
      //   const itemTotalPrices = prices.map((price, index) => price * quantities[index]);

      // // Calculate total quantity and total price
      // // const totalQuantity = response.data.reduce((acc, item) => acc + item.quantity, 0);
      // // const totalPrice = response.data.cart.reduce(
      // //   (acc, item) => acc + item.quantity * item.product_id.price,
      // //   0
      // // );

      // let totalPrice = 0;
      // let totalQuantity = 0;
      // response.data.cart.forEach(item => {
      //   totalPrice += item.product_id.price * item.quantity;
      //   totalQuantity += item.quantity;
      // });

      // setTotal(totalPrice);
      // console.log("Total Price : " + totalPrice);
      // setQty(totalQuantity);
      
 
      // setQty(quantities);
      // setPrice(prices);

// Calculate total price
let totalPrice = 0;
response.data.cart.forEach(item => {
    totalPrice += item.product_id.price * item.quantity;
});

setTotal(totalPrice);
console.log("Total Price : " + totalPrice);


      
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  

  const handleDecrement = (cart_id) => {
    console.log("Decrement : " + cart_id);
    setCart(cart => {
        const updatedCart = cart.map((item) => 
            cart_id === item._id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
        );
        updateTotal(updatedCart);
        return updatedCart;
    });
};

  const handleIncrement = (cart_id) => {
    console.log("Increment : " + cart_id);
    setCart((cart) => {
        const updatedCart = cart.map((item) => 
            cart_id === item._id ? { ...item, quantity: Math.min(item.quantity + 1, 10) } : item
        );
        updateTotal(updatedCart);
        return updatedCart;
    });
};

const updateTotal = (updatedCart) => {
    let totalPrice = 0;
    updatedCart.forEach(item => {
        totalPrice += item.product_id.price * item.quantity;
    });
    setTotal(totalPrice);
};

  

  const handleContinueShopping = () => {
    navigate(`/products`);
  }

  const handleCheckout = () => {
    navigate(`/checkout`);
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
          setCart(prevCarts => prevCarts.filter(cart => cart._id !== id)); 
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
    
  
  

  const cartdiv = {
    padding: "15px",
    fontFamily: "Arial",
    border: "1px solid #c6ccdd80",
    boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.1)",
    marginBottom: "10px"
  };
  const checkout_price = {
    float: "right",
    color: "black",
  };
  

  let cartView = "";
  if(cart?.length > 0){
    cartView = <Container fluid className="p-3">
    <Row>
      <Col sm={8}>
        {cart.length > 0 ? (
          cart.map((item) => (
            
            <div style={cartdiv}>
          <Row>
            <Col sm={2}>
              
              <Card.Img
                variant="top"
                height="100px"
                width="80px"
                src={`http://localhost:5000/${item.product_id.productImage}`}
              />
            </Col>
            <Col sm={8}>
              <p>
                {item.product_id.title}
              
              </p>
              <a
                style={{
                  fontSize: "15px",
                  color: "black",
                  textDecoration: "none",
                }}
                
              >
                <RiDeleteBin6Line />
                <span onClick={() => removeCart(item._id)} style={{ cursor: "pointer" }}> Remove</span>
              </a>
            </Col>
            <Col sm={2} className="d-flex flex-column justify-content-between align-items-end">
              <div style={{ marginBottom: "auto", textAlign: "right" }}>
                AED <b style={{ fontSize: "25px" }}>{item.product_id.price}</b>
              </div>
              <div style={{ marginTop: "auto" }}>
               

                <div className="input-group">
                  <Button type="button" className="input-group-text" variant="danger" onClick={() => handleDecrement(item._id)}>-</Button>
                  <div className="form-control text-center">{item.quantity}</div>
                  <Button type="button" className="input-group-text" variant="danger" onClick={() => handleIncrement(item._id)}>+</Button>
                </div>
               
              </div>
            </Col>
          </Row>
        </div>
          ))
        ) : (
          <tbody>
         
          </tbody>
        )}

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
              <b>Free</b>
            </span>
          </p>
          <hr />
          <p>
            <b style={{ fontSize: "25px" }}>Total</b>{" "}
            <span style={{ color: "#7e859b" }}>(Inclusive of VAT)</span>
            <span style={checkout_price}>AED {total}</span>
          </p>
          <Button variant="danger" className="w-100" size="lg" onClick={handleCheckout}>
            CHECKOUT
          </Button>
        </div>
      </Col>
    </Row>
  </Container>
  
  }else{
    cartView = <Container>
    <Row className="p-5 d-flex flex-column align-items-center">
      <h4 align="center" className="mb-5" >Your Cart is Empty</h4>
      <div className="col-6">
      <Button variant="outline-danger" onClick={handleContinueShopping} className="w-100">
        Continue Shopping
      </Button>
    </div>
    </Row>
  </Container>
    
  }

  return (
    <>
    <h3>Cart</h3>
      {cartView}
    </>
  );
};

export default Cart;
