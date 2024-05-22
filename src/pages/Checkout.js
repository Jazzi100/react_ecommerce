import React from "react";
import { Col, Container, Row, Button, Form, Accordion } from "react-bootstrap";

function Checkout () {

    // Style

    const cartdiv = {
        padding: "20px",
        fontFamily: "Arial",
        border: "1px solid #c6ccdd80",
        boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.1)",
        marginBottom: "10px"
    };

    const checkout_price = {
        float: "right",
        color: "black",
    };
    
    const qtyInput = {
        width: "50px",    
    };

    // Style

    return(
        <>
            <Container>
                <Row>
                    <h1 style={{ textAlign:"center", padding: "30px" }}>Checkout</h1>
                </Row>
                <Row>
                    <Col sm={8}>Left Side
                        <div style={cartdiv}>
                        <Form className="p-3" encType="multipart/form-data" >
                        <Row className="mb-3">
                            <Col>
                                <Form.Label >
                                First Name
                                </Form.Label>
                                <Form.Control  />
                            </Col>
                            <Col>
                                <Form.Label >
                                Last Name
                                </Form.Label>
                                <Form.Control  />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <Form.Label >
                                Company Name (optional)
                                </Form.Label>
                                <Form.Control  />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Country / Region</Form.Label>
                                <Form.Select defaultValue="Choose...">
                                    <option>Choose...</option>
                                    <option>...</option>
                                </Form.Select>
                            </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <Form.Label >
                                Street Address
                                </Form.Label>
                                <Form.Control placeholder="House number and street name" />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <Form.Control placeholder="Appartment, suite, unit, etc. (optional)" />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <Form.Label >
                                Town / City
                                </Form.Label>
                                <Form.Control />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Select defaultValue="Choose...">
                                    <option>Choose...</option>
                                    <option>...</option>
                                </Form.Select>
                            </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <Form.Label >
                                Town / City
                                </Form.Label>
                                <Form.Control />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <Form.Label >
                                ZIP Code
                                </Form.Label>
                                <Form.Control />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <Form.Label >
                                Phone
                                </Form.Label>
                                <Form.Control />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <Form.Label >
                                Email Address
                                </Form.Label>
                                <Form.Control />
                            </Col>
                        </Row>
                        <h4>Additional Address</h4>
                        <hr/>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Order Note (optional)</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <Form.Check
                                        label="Same as shipping address"
                                        type="radio"
                                        name = "billing_address"
                                    />
                                </Accordion.Header>
                                
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>
                                    <Form.Check
                                        label="Use a different billing address"
                                        type="radio"
                                        name = "billing_address"
                                    />
                                    </Accordion.Header>
                                <Accordion.Body>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Control placeholder="First Name"  />
                                    </Col>
                                    <Col>
                                        <Form.Control  placeholder="Last Name"/>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                    <Form.Group as={Col} controlId="formGridState">
                                        
                                        <Form.Select defaultValue="Choose..."  placeholder="State">
                                            <option>Choose...</option>
                                            <option>...</option>
                                        </Form.Select>
                                    </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Control  placeholder="City"/>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Control  placeholder="Address"/>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Control placeholder="Phone (optional)" />
                                    </Col>
                                </Row>
                                </Accordion.Body>
                            </Accordion.Item>
                            </Accordion>   

                        </Form>

                        </div>
                    </Col>
                    <Col sm={4}>Right Side
                    <div style={cartdiv}>
                        <b style={{ fontSize: "25px" }}>Order Summary</b>
                        <p style={{ color: "#7e859b" }}>
                            SubTotal (items)
                            <span style={checkout_price}>AED </span>
                        </p>
                        <p style={{ color: "#7e859b" }}>
                            Shipping Detail
                            <span style={{ float: "right", color: "#dc3545" }}>
                            <b>Free </b>
                            </span>
                        </p>
                        <hr />
                        <p>
                            <b style={{ fontSize: "25px" }}>Total</b>{" "}
                            <span style={{ color: "#7e859b" }}>(Inclusive of VAT)</span>
                            <span style={checkout_price}>AED </span>
                        </p>
                        <Button variant="danger" className="w-100" size="lg" >
                            CHECKOUT
                        </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Checkout;