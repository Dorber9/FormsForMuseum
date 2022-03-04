/* eslint-disable */
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Container,
} from "react-bootstrap";
import { FaHome, FaArchway, FaWpforms } from "react-icons/fa";

const Header = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            Museum <FaArchway />{" "}
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">
              Home <FaHome />
            </Nav.Link>

            <NavDropdown title="Data" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Add">Add</NavDropdown.Item>
              <NavDropdown.Item href="/ModifyData">Modify</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="/CourseWizard">
                Quest Wizard
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="Reports">
              Reports <FaWpforms />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
