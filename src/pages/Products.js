import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Card, Container, Form, Button } from "react-bootstrap";
import {  useNavigate   } from 'react-router-dom';

import CategoryList from "../Components/CategoryList";
import "./productPageStyleSheet.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState("");

  const [filteredProducts, setFilteredProducts] = useState([]); // State to hold filtered products
  const [selectedCategory, setSelectedCategory] = useState(""); // State to hold selected
  
  // const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      url: "http://localhost:5000/api/product/get-active-products",
      //url:  `http://localhost:5000/api/product/get-active-products?categoryId=${selectedCategory}` 
    })
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  // Function to filter products based on selected category
  // useEffect(() => {
  //   if (selectedCategory === "") {
  //     setFilteredProducts(products); // If no category is selected, show all products
  //   } else {
  //     const filtered = products.filter(product => product.category_id === selectedCategory);
  //     setFilteredProducts(filtered);
  //   }
  // }, [selectedCategory, products]);

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    console.log("set Selected Category : " + selectedCategory);

    
  };


  
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      //url: "http://localhost:5000/api/product/get-active-products",
      url:  `http://localhost:5000/api/product/get-active-products?categoryId=${selectedCategory}` 
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

  

  const addToCart = async (item) => {
    
    let cart = {
      p_id: item._id,
      qty: qty,
    };
    console.log("Add to Cart : ", cart);

    try {
      const result = await axios.post('http://localhost:5000/api/cart/add-cart', cart);
      console.log("cart added : ",result);
    
      
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
            <CategoryList onSelectCategory={handleSelectCategory} />
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
            onChange={(e) => setQty(e.target.value)}
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
    </>
  );
};

export default Products;
