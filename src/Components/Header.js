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
import { useState, useEffect } from "react";

const navStyle = { color: "white" };
const selectedStyle = { borderBottom: "1px solid white", color: "#e9c363" };

const Header = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <>
      {loading ? (
        ""
      ) : (
        <Navbar
          style={{
            background: "black",
            boxShadow: "rgb(210 188 125) 0px 0px 5px",
            height: "50px",
          }}
          bg="dark"
          variant="dark"
        >
          <Container style={{ marginLeft: "33%" }}>
            <Navbar.Brand href="/">
              Museum <FaArchway />{" "}
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link
                style={
                  window.location.pathname == "/" ? selectedStyle : navStyle
                }
                href="/"
              >
                Home <FaHome />
              </Nav.Link>
              {window.location.pathname == "/Add" ||
              window.location.pathname == "/ModifyData" ? (
                <span
                  style={{
                    borderBottom: "1px solid white",
                    color: "#e9c363",
                    marginTop: "8px",
                    marginLeft: "96px",
                    position: "absolute",
                  }}
                >
                  Data
                </span>
              ) : (
                <span
                  style={{
                    color: "white",
                    marginTop: "8px",
                    marginLeft: "96px",
                    position: "absolute",
                  }}
                >
                  Data
                </span>
              )}
              <NavDropdown
                title={
                  window.location.pathname == "/Add" ||
                  window.location.pathname == "/ModifyData"
                    ? "Data"
                    : "Data"
                }
              >
                <NavDropdown.Item href="/Add">Add</NavDropdown.Item>
                <NavDropdown.Item href="/ModifyData">Modify</NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item href="/CourseWizard">
                  Manage Quests
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                style={
                  window.location.pathname == "/Reports"
                    ? selectedStyle
                    : navStyle
                }
                href="../Reports"
              >
                Reports <FaWpforms />
              </Nav.Link>

              <Nav.Link
                style={
                  window.location.pathname == "/ItemsList"
                    ? selectedStyle
                    : navStyle
                }
                href="../ItemsList"
              >
                Items <FaTable />
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default Header;
