import React, { useState, useEffect } from "react";
import {Row,Col,Container, Card, Button, Modal, } from "react-bootstrap";
import axios from "axios";
import { useParams } from 'react-router-dom';

import Categories from "./Categories";
import "./productDetails.css";

function ProductDetail (){
    const [product, setProduct] = useState([]);
    const [show, setShow] = useState(false);
    const { id } = useParams();

    
    
    useEffect(() => {
        axios({
          method: "get",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          url: `http://localhost:5000/api/product/${id}`,
        })
          .then((response) => {
            console.log(response.data);
            setProduct(response.data.product);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

      const divStyle = {
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
        margin: '10px'
      };

      

    return (
        <Container>
        <Row>
          <h3>Products</h3>
        </Row>
        <Row>
          <Col sm={2}>
            <Categories />
          </Col>
          <Col sm={10}>
            <Row style={divStyle}>
              <Col sm={6}>
                <p>
                  <Card.Img
                    variant="top"
                    height="400px"
                    width="50%"
                    src={`http://localhost:5000/${product.productImage}`}
                  />
                </p>
              
              </Col>
              <Col sm={6}>
              <div class="details">
						<h3 class="product-title">{product.title}</h3>
						<div class="rating">
							<div class="stars">
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star"></span>
								<span class="fa fa-star"></span>
							</div>
							<span class="review-no">41 reviews</span>
						</div>
						<h4 class="price">current price: <span>AED {product.price}</span></h4>
            <p class="product-description">{product.description}</p>
						
						
						<div class="action">
            <Button variant="danger" className="w-100 addToCart" size="lg">
            ADD TO CART
          </Button>
							
						</div>
					</div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Button variant="primary" onClick={() => setShow(true)}>
        Custom Width Modal
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="right"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
            commodi aspernatur enim, consectetur. Cumque deleniti temporibus
            ipsam atque a dolores quisquam quisquam adipisci possimus
            laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
            accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
            reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
            deleniti rem!
          </p>
        </Modal.Body>
      </Modal>
      </Container>

      );
}

export default ProductDetail;