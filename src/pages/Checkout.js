import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button, Form, Accordion } from "react-bootstrap";

function Checkout () {
    const [countryData, setCountryData] = useState([]);
    const [error, setError] = useState(null);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [companyName, setCompanyName] = useState();
    const [county, setCounty] = useState();
    const [streetAddress, setStreetAddress] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [zipCode, setZipCode] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [orderNote, setOrderNote] = useState();
    const [billingAddress, setBillingAddress] = useState();
    const [bAFirstName, setBAFirstName] = useState();
    const [bALastName, setBALastName] = useState();
    const [bAState, setBAState] = useState();
    const [bACity, setBACity] = useState();
    const [bAAddress, setBAAddres] = useState();
    const [bAPhone, setBAPhone] = useState();

    const collectData = async (e) => {
        e.preventDefault();
        console.log("First Name :",firstName);
        console.log("Last Name :",lastName);
        console.log("Company Name :",companyName);
        console.log("Street Address :",streetAddress);
        console.log("City :",city);
        console.log("ZIP Code :",zipCode);
        console.log("Phone :",phone);
        console.log("Email :",email);
        console.log("Order Note :",orderNote);
        console.log("Billing Address :",billingAddress);
        console.log("Billing Address First Name :",bAFirstName);
        console.log("Billing Address Last Name :",bALastName);
        console.log("Billing Address 2 :",bAAddress);
        console.log("Billing Address Phone 2 :",bAPhone);
    }


    useEffect(() => {
        // Define the API call
        const fetchCountryData = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all'); // Await the response
                //console.log(" API Response : ",response);
                console.log(" API Response : ", response.data);
                setCountryData(response.data); // Update the countryData state with the data
            } catch (error) {
                setError(error.message); // Update the error state
                console.error("Error fetching country data: ", error);
            }
        };

        fetchCountryData(); // Call the function when the component mounts
    }, []);


    
    console.log("Country Data API : " , countryData);
    //console.log("Country Data API : " , countryData.capital);
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
                    <Col sm={8}>
                        <div style={cartdiv}>
                        <Form className="p-3" encType="multipart/form-data" >
                        <Row className="mb-3">
                            <Col>
                                <Form.Label >
                                First Name
                                </Form.Label>
                                <Form.Control 
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="First name"
                                />
                            </Col>
                            <Col>
                                <Form.Label >
                                Last Name
                                </Form.Label>
                                <Form.Control  
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Last name"
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <Form.Label >
                                Company Name (optional)
                                </Form.Label>
                                <Form.Control  
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    placeholder="company name"
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Country / Region</Form.Label>
                                <Form.Select defaultValue="Choose...">
                                    <option>Choose...</option>
                                    <option>...</option>
                                    {countryData.map((country) => (
                                        <option key={country.cca2} value={country.cca2}>
                                            {country.name.common} {/* Display country name */}
                                        </option>
                                    ))}

                                </Form.Select>
                                
                            </Form.Group>
                            </Col>
                        </Row>
                        

                        <Row className="mb-3">
                            <Col>
                                <Form.Label >
                                Street Address
                                </Form.Label>
                                <Form.Control 
                                    type="text"
                                    value={streetAddress}
                                    onChange={(e) => setStreetAddress(e.target.value)}
                                    placeholder="House number and street name"
                                />
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
                                <Form.Control 
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="City"
                                />
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
                                    ZIP Code
                                </Form.Label>
                                <Form.Control 
                                    type="text"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <Form.Label >
                                Phone
                                </Form.Label>
                                <Form.Control 
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <Form.Label >
                                Email Address
                                </Form.Label>
                                <Form.Control 
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <h4>Additional Address</h4>
                        <hr/>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Order Note (optional)</Form.Label>
                                    <Form.Control as="textarea" rows={3} 
                                        type="text"
                                        value={orderNote}
                                        onChange={(e) => setOrderNote(e.target.value)}
                                        placeholder="write here any instruction"
                                    />
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
                                        value={billingAddress}
                                        onChange={(e) => setBillingAddress(e.target.value)}
                                    />
                                </Accordion.Header>
                                
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>
                                    <Form.Check
                                        label="Use a different billing address"
                                        type="radio"
                                        name = "billing_address"
                                        value={billingAddress}
                                        onChange={(e) => setBillingAddress(e.target.value)}
                                    />
                                    </Accordion.Header>
                                <Accordion.Body>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Control 
                                            placeholder="First Name"  
                                            type="text"
                                            value={bAFirstName}
                                            onChange={(e) => setBAFirstName(e.target.value)}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            placeholder="Last Name"  
                                            type="text"
                                            value={bALastName}
                                            onChange={(e) => setBALastName(e.target.value)}
                                        />
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
                                        <Form.Control placeholder="City"/>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Control 
                                            placeholder="Address"
                                            type="text"
                                            value={bAAddress}
                                            onChange={(e) => setBAAddres(e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Control 
                                            placeholder="Phone (optional)"
                                            type="text"
                                            value={bAPhone}
                                            onChange={(e) => setBAPhone(e.target.value)} 
                                        />
                                    </Col>
                                </Row>
                                </Accordion.Body>
                            </Accordion.Item>
                            </Accordion>   
                            
                            <Button
                                variant="danger"
                                onClick={collectData}
                                type="submit"
                                className="mt-2 form-control"
                                >
                                Sign Up
                            </Button>

                        </Form>

                        </div>
                    </Col>
                    <Col sm={4}>
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