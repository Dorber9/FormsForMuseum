import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Container,
} from "react-bootstrap";

const Header = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Museum</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Data" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Add">Add</NavDropdown.Item>
              <NavDropdown.Item href="/ModifyData">Modify</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="/CourseWizard">
                Course Wizard
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
