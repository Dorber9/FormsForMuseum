// import React from "react";

// import "../App.css";

// const Footer = () => {
//   return (
//     <div className="footer">
//       <div className="footItem">
//         <Link to="/Add">Add Data</Link>
//         <div className="row-col-4">
//           <Link to="/DemoPage">Demo Page</Link>

//           <Link to="/CourseWizard">Course Wizard</Link>

//           <Link to="/">Home Page</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;
import { Link } from "react-router-dom";
import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";

const Footer = () => {
  return (
    <Box>
      <h1
        style={{ color: "green", textAlign: "center", marginTop: "-50px" }}
      ></h1>
      <Container>
        <Row>
          <Column>
            <Heading>Adding Data</Heading>
            <br></br>
            <FooterLink href="/Add">Add</FooterLink>
          </Column>
          <Column>
            <Heading>Example</Heading>
            <br></br>
            <FooterLink href="/DemoPage">Demo Page</FooterLink>
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <br></br>
            <FooterLink href="/CourseWizard">Hi</FooterLink>
          </Column>
          <Column>
            <Heading>Home Page</Heading>
            <br></br>
            
            <FooterLink href="/">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>Home</span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;
