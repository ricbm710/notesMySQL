//bootstrap
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
//rrd
import { useOutletContext } from "react-router-dom";
//datatypes
import { OutletContextDb } from "../datatypes/datatypesDb";
//utils
import { setUser } from "../utils/utilsDB";
//hooks
import { useState } from "react";

const HomeScreen = () => {
  //outlet context
  const { currentUser, setCurrentUser } = useOutletContext<OutletContextDb>();
  //component state
  const [newUser, setNewUser] = useState<string>("");
  return (
    <Container>
      <Row>
        <Col>
          <h2>
            Welcome,{" "}
            <span>
              {currentUser.name === ""
                ? "please set your username"
                : `${currentUser.name}`}
            </span>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form>
            <FormGroup controlId="formUser">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your name"
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
              ></Form.Control>
            </FormGroup>
            <Button
              type="submit"
              onClick={() => {
                setUser(newUser);
                setCurrentUser({ name: newUser });
              }}
            >
              Set Username
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
