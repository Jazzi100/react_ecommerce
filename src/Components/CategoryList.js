import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";

const CategoryList = ({onSelectCategory}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      url: "http://localhost:5000/api/category/get-all-categories",
    })
      .then((response) => {
        console.log("Categories List: ", response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Empty dependency array to run only once on component mount

  return (
    <>
      <Card style={{ width: "11rem", margin: "10px" }}>
        <ListGroup>
            {categories.map((category) => (
                <ListGroup.Item
                key={category._id}
                action
                onClick={() => onSelectCategory(category._id)}
                >
                {category.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
      </Card>
    </>
  );
}

export default CategoryList;