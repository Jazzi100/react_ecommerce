import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import { CurrentUserContext } from "../context/CurrentUserState";

function Home() {
  const a = useContext(CurrentUserContext);
  return (
    <Row>
      <h1>Home Page</h1>

      <h3>
        <p>
          My name is {a?.currentUser?.firstName} i am from {a.country}
        </p>
      </h3>
    </Row>
  );
}

export default Home;
