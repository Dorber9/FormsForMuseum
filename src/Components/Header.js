/* eslint-disable */
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Container,
} from "react-bootstrap";
import { FaHome, FaArchway, FaWpforms, FaTable } from "react-icons/fa";

const navStyle= {color: "white"}


const Header = () => {
  return (
    <>
      <Navbar style={{background:"black",boxShadow: "rgb(210 188 125) 0px 0px 5px"}} variant="dark">
        <Container>
          <Navbar.Brand href="/">
            Museum <FaArchway />{" "}
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link style={navStyle} href="/">
              Home <FaHome />
            </Nav.Link>

            <NavDropdown style={navStyle} title="Data" id="basic-nav-dropdown">
              <NavDropdown.Item  href="/Add">Add</NavDropdown.Item>
              <NavDropdown.Item  href="/ModifyData">Modify</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="/CourseWizard">
                Quest Wizard
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link style={navStyle} href="../Reports">
              Reports <FaWpforms />
            </Nav.Link>

            <Nav.Link style={navStyle} href="../ItemsList">
              Items <FaTable />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
