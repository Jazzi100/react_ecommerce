import React, { useState, useEffect } from "react";
import {Row,Col,Container } from "react-bootstrap";
import axios from "axios";
import { useParams } from 'react-router-dom';

import Categories from "./Categories";

function ProductDetail (){
    const [product, setProduct] = useState([]);
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
            setProduct(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
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
            <Row>
              
            </Row>
          </Col>
        </Row>
      </Container>
      );
}

export default ProductDetail;