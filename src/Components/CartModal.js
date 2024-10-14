import React, { useState, useEffect } from 'react';
import { Offcanvas, Row, Col, Card, Button } from 'react-bootstrap';
import axios from "axios";
import useFetchProducts from '../Hooks/useFetchProducts';

function CartModal({ show, onHide, item, qty, placement, userId }) {
  const [cartProducts, setCartProducts] = useState([]);
  
  const [cartTotal, setCartTotal] = useState(0);
  
  const [filters, setFilters] = useState({ categoryId: null, userId: userId, productId: null });
  const { products, loading, error } = useFetchProducts(filters);
  
    
  useEffect(() => {
    setCartProducts(products);
  }, [products]);

  useEffect(() => {
    let total = 0;
    cartProducts.forEach(product => {
      total += product.product_id.price * product.quantity;
    });
    setCartTotal(total);
  }, [cartProducts]);
  
  //console.log("setCartProductsssss" , cartProducts);
  console.log("cartTotallllll" , cartTotal);

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

                {/* ///////////////////////////////////////////// */}
                
                
                {/* <Row>
                  <Col sm={3}>
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
                        <div className="form-control text-center">{qty ? qty : 1}</div>
                        <Button style={{ borderRadius: '10px', color:'#dc3545' }} type="button" className="input-group-text" variant="light" onClick={() => handleIncrement(item._id)}>+</Button>
                      </div>
                    </span>
                  </Col>
                  <Col sm={4}>
                    <span style={{ display: 'flex', justifyContent: 'flex-end' }}>AED: {item.price * qty}.00</span>
                  </Col>
                </Row> */}

                {/* {_id, product_id, user_id, quantity, status, created_at, updated_at, __v} */}

               

                {cartProducts.length > 0 ? (
                  cartProducts.map(({ _id, product_id, user_id, quantity }) => (
                    <Row key={_id} className="p-1">
                      <Col sm={3}>
                        <Card.Img
                            variant="top"
                            height="80px"
                            width="80px"
                            src={`http://localhost:5000/${product_id.productImage}`}
                          />
                        </Col>
                        <Col sm={5}>
                          {product_id.title}<br/>
                          AED: {product_id.price}
                          <span className="w-25">
                            <div className="input-group" style={{ width: '100px', border: '1px solid #dc3545', borderRadius: '10px' }}>
                              <Button style={{ borderRadius: '10px', color:'#dc3545' }} type="button" className="input-group-text" variant="light" onClick={() => handleDecrement(_id)}>-</Button>
                              <div className="form-control text-center">{quantity ? quantity : 1}</div>
                              
                              <Button style={{ borderRadius: '10px', color:'#dc3545' }} type="button" className="input-group-text" variant="light" onClick={() => handleIncrement(_id)}>+</Button>
                            </div>
                          </span>
                        </Col>

                        <Col sm={4}>
                          <span style={{ display: 'flex', justifyContent: 'flex-end' }}>AED: {product_id.price * quantity}.00</span>
                          
                        </Col>
                    </Row>
                  ))
                ) : (
                  <div>No products in the cart</div>
                )}

              
                {/* ///////////////////////////////////////////// */}
                <div style={{ position: 'absolute', bottom: 0, left: '10px', right: '10px', margin: '0 auto' }}>
                <hr/>
                <Row>
                    <Col sm={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#dc3545' }}><h4>Total</h4></span>
                        <span>AED: {cartTotal}.00 &nbsp;</span>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <span style={{ fontSize: '14px' }}>Taxes, discounts and shipping calculated at checkout</span>
                    </Col>
                </Row>
                <Row >
                    <Col className='mt-3'>
                      <div >
                      <Button 
                        variant="danger" 
                        className="w-100 size-lg" 
                        size="lg"
                        >
                        Checkout
                      </Button>
                      </div>
                    </Col>
                    
                </Row>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default CartModal;
