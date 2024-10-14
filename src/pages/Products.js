import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Col, Row, Card, Container, Form, Button } from "react-bootstrap";
import {  useNavigate   } from 'react-router-dom';

import Categories from "../Components/Categories";
import AddToCartModal from "../Components/AddToCartModal";
import { CurrentUserContext } from "../context/CurrentUserState";

import "./productPageStyleSheet.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [qty, setQty] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [item, setItem] = useState(null);
  
  const navigate = useNavigate();

  const { currentUser } = useContext(CurrentUserContext);
  let currentUserId;
  if (currentUser && currentUser?.user) {
    currentUserId = currentUser.user._id;
  }
  
//  console.log('current user on product page : ' , currentUser);
//  console.log('current user ID : ' , currentUser.user._id);
  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  

  const fetchProducts = (categoryId) => {
    let url = "http://localhost:5000/api/product/get-active-products";
    if (categoryId) {
      url += `?categoryId=${categoryId}`;
    }
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
  };

  const addToCart = async (item) => {
    if (!currentUser || !currentUser) {
      navigate("/login");
      return;
    }
    let cart = {
      p_id: item._id,
      qty: qty,
      user_id: currentUserId,
    };
    console.log("Add to Cart : ", cart);

    try {
      const result = await axios.post('http://localhost:5000/api/cart/add-cart', cart);
      console.log("cart added : ",result);
      if(result){
        setItem(item); // Set the item for the modal
        setShowModal(true); // Show the modal
      }
  
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const detailPage = (id) =>{
      //alert("working" + id);
      navigate(`/product-detail/${id}`);
      try {
        const result = axios.get('http://localhost:5000/api/',id);
        console.log("single product : ",result);
      
        
      } catch (error) {
        console.error("Error:", error);
      }
  }


  

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
            <Categories onCategoryChange={setSelectedCategory}/>
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
                    catagory_id, 
                    productImage
                  }) => (
                    <Col sm={3}>
                      <div style={div_style}>
                      <Card className="Red" onClick={(e) => {detailPage(_id)}}>
  <div>
    <Card.Img
      variant="top"
      height="150px"
      src={`http://localhost:5000/${productImage}`}
    />
    <Card.Body>
      <Card.Title>AED {price}</Card.Title>
      <Card.Text>{title}</Card.Text>
      <Card.Text>{catagory_id.name}</Card.Text>
      <Form>
        <Form.Group className="mb-2">
          <Form.Control
            type="number"
            min="1"
            size="sm"
            defaultValue={1}
            onChange={(e) => setQty(parseInt(e.target.value))}
            onClick={(e) => e.stopPropagation()}
          />
        </Form.Group>
        <Button
          className="mb-1 w-100"
          size="sm"
          variant="outline-danger"
          id={_id}
          onClick={(e) => {
            e.stopPropagation(); // Stop event propagation
            addToCart({
              _id,
              title,
              description,
              price,
              catagory_id,
              productImage,
            });
          }}
        >
          Add To Cart
        </Button>
        
      </Form>
    </Card.Body>
  </div>
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
      {showModal && <AddToCartModal show={showModal} item={item} qty={qty} userId={currentUserId} onHide={() => setShowModal(false)} />}
    </>
  );
};

export default Products;
