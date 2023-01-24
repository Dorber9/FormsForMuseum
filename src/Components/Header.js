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
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const navStyle = { color: "white" };
const selectedStyle = { borderBottom: "1px solid white", color: "#e9c363" };

const Header = ({ setToken }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const submit = () => {
    confirmAlert({
      title: "Confirm logout",
      message: "Are you sure you want to logout?",
      buttons: [
        {
          label: "Yes",
          onClick: () => setToken(""),
        },
        {
          label: "No",
        },
      ],
    });
  };

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
          <Nav className="me-auto">
            <Nav.Link
              style={window.location.pathname == "/" ? selectedStyle : navStyle}
              href="/"
            >
              Home <FaHome />
            </Nav.Link>
            <NavDropdown
              title={
                window.location.pathname == "/Add" ||
                window.location.pathname == "/ModifyData"
                  ? "Data"
                  : "Data"
              }
            >
              <NavDropdown.Item href="/Add"> Add </NavDropdown.Item>{" "}
              <NavDropdown.Item href="/ModifyData"> Modify </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/CourseWizard">
                Manage Quests{" "}
              </NavDropdown.Item>{" "}
            </NavDropdown>{" "}
            <Nav.Link
              style={
                window.location.pathname == "/ItemsList"
                  ? selectedStyle
                  : navStyle
              }
              href="../ItemsList"
            >
              Items <FaTable />
            </Nav.Link>{" "}
            <Nav.Link
              style={{
                color: "red",
                position: "absolute",
                right: 0,
              }}
              onClick={() => submit()}
            >
              Log Out
            </Nav.Link>{" "}
          </Nav>{" "}
        </Navbar>
      )}
    </>
  );
};

export default Header;
