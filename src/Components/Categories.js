import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, ListGroup } from "react-bootstrap";

const Categories = ({onCategoryChange}) => {
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
            console.log(response.data);
            setCategories(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

      const handleCategoryChange = (_id) => {
        onCategoryChange(_id)
      }
    return(
        <>
            <Card style={{ width: "11rem", margin: "10px" }}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <b>Categories</b>
                    </ListGroup.Item>
                    {categories.length > 0 && categories.map(({ _id, name, status }) => (
                        <ListGroup.Item key={_id} onClick={() => {handleCategoryChange(_id)}}>
                        {name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
        </>
    )
}

export default Categories;