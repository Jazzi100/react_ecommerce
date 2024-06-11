import React, { useContext } from "react";
import { Row, Carousel, Container, Image } from "react-bootstrap";
import { CurrentUserContext } from "../context/CurrentUserState";

import slider1 from "../images/slider1.jpg";
import slider2 from "../images/slider2.jpg";
import slider3 from "../images/slider3.jpg";

function Home() {
  //const a = useContext(CurrentUserContext);
  return (
    <Row> 
      <Container width="80%">
      <Carousel>
        <Carousel.Item interval={1000}>
          <Image src={slider2} width="100%" height="300px"/>
        </Carousel.Item>
        
        <Carousel.Item interval={500}>
          <Image src={slider1} width="100%" height="300px"/>
        </Carousel.Item>
        
        <Carousel.Item>
          <Image src={slider3} width="100%" height="300px"/>
        </Carousel.Item>
      </Carousel>
      </Container> 
    </Row>
  );
}

export default Home;
