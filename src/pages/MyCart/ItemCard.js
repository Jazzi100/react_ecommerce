import React from "react";
import { Card, Button } from "react-bootstrap";
import { useCart } from "react-use-cart";
 
const ItemCard = (props) => {  
    const {addItem} = useCart();
    {console.log("Props : ", props)}
    return(
        <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
            <Card style={{ width: '18rem', margin: '50px' }} className="card p-0 overflow-hidden shadow">
                <Card.Img variant="top" src={props.img} className="img-fluid  h-80 " />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Title>Rs <b>{props.price}</b></Card.Title>
                    <Card.Text>
                    {props.desc}
                    </Card.Text>
                    <Button variant="primary" onClick={() => addItem(props.item)}>Add To Cart</Button>
                </Card.Body>
            </Card>           
        </div>

    );
}

export default ItemCard;