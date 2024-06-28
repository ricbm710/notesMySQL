//bootstrap
import { Container, Nav, Navbar } from "react-bootstrap";
//rrd
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Notas R
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/new">
              New Note
            </Nav.Link>
            <Nav.Link as={Link} to="/notes">
              See Notes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
