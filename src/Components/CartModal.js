import React, {useState} from 'react';
import { Offcanvas, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function CartModal({ show, onHide, item, placement }) {
    const [products, setProducts] = useState([]);

    const fetchProduct = () => {

        let url = "http://localhost:5000/api/product/get-active-products";
        axios({
        method: "get",
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        url: url,
        })
        .then((response) => {
            console.log(response.data);
            setProducts(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }
  return (
    <Offcanvas show={show} onHide={onHide} placement={placement}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {/* {console.log("Itemmmmm : "+item._id)}
        {item && (
          <div>

            <p>Item added to cart:</p>
            <p>ID: {item._id}</p>
            <p>Name: {item.name}</p>
          </div>
        )} */}

        <Row>
            <Col sm={3}>1</Col>
            <Col sm={9}>2</Col>
        </Row>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default CartModal;
