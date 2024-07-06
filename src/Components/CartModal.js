import React, { useState, useEffect } from 'react';
import { Offcanvas, Row, Col, Card, Button } from 'react-bootstrap';
import axios from "axios";
//import useFetchProduct from '../Hooks/useFetchProduct';

function CartModal({ show, onHide, item, placement }) {
   
    console.log("item IDDD   :" ,item);

    const handleDecrement = (cart_id) => {
      console.log("Decrement : " + cart_id);
      // setCart(cart => {
      //     const updatedCart = cart.map((item) => 
      //         cart_id === item._id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
      //     );
      //     updateTotal(updatedCart);
      //     return updatedCart;
      // });
  };
  
    const handleIncrement = (cart_id) => {
      console.log("Increment : " + cart_id);
      // setCart((cart) => {
      //     const updatedCart = cart.map((item) => 
      //         cart_id === item._id ? { ...item, quantity: Math.min(item.quantity + 1, 10) } : item
      //     );
      //     //updateTotal(updatedCart);
      //     return updatedCart;
      // });
  };

    return (
        <Offcanvas show={show} onHide={onHide} placement={placement}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Your Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Row>
                    <Col sm={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Product</span>
                        <span>Total</span>
                    </Col>
                </Row>
                <hr />
               
                <Row>
                  <Col sm={4}>
                  <Card.Img
                      variant="top"
                      height="80px"
                      width="80px"
                      src={`http://localhost:5000/${item.productImage}`}
                    />
                  </Col>
                  <Col sm={5}>
                    {item.title}
                  
                    <span className="w-25">
                      <div className="input-group" style={{ width: '100px', border: '1px solid #dc3545', borderRadius: '10px' }}>
                        <Button style={{ borderRadius: '10px', color:'#dc3545' }} type="button" className="input-group-text" variant="light" onClick={() => handleDecrement(item._id)}>-</Button>
                        <div className="form-control text-center">{item.quantity}</div>
                        <Button style={{ borderRadius: '10px', color:'#dc3545' }} type="button" className="input-group-text" variant="light" onClick={() => handleIncrement(item._id)}>+</Button>
                      </div>
                    </span>
                  </Col>
                  <Col sm={3}>
                    Rs: {item.price}.00
                  </Col>
                </Row>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default CartModal;
