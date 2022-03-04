/* eslint-disable */
import {
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaCopyright,
} from "react-icons/fa";
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

// const Footer = () => {
//   return (
//     <div className="footerStyle">
//     <Box>
//       <Container>
//         <Row style={{ marginLeft: "25%" }}>
//           <Column>
//             <Heading>Social Media</Heading>
//             <br></br>
//             <a target="_blank" href="/">
//               <FaInstagram />
//             </a>
//             <a
//               target="_blank"
//               href="https://www.youtube.com/channel/UCzNgJeC6YbIS-Z5Ezhs2K1w/featured"
//             >
//               <FaYoutube />
//             </a>
//             <a href="https://www.facebook.com/hakadmon/" target="_blank">
//               <FaFacebook />
//             </a>
//           </Column>
//           <Column>
//             <Heading>
//               Created By <FaCopyright />
//             </Heading>
//             <br></br>
//             <FooterLink>Dor Berko</FooterLink>
//             <FooterLink>Yuval Maron</FooterLink>
//             <FooterLink>Eitan Ivchanko</FooterLink>
//             <FooterLink>Liran Segal</FooterLink>
//           </Column>
//         </Row>
//       </Container>
//     </Box>
//     </div>
//   );
// };

const Footer = () => (
  <footer className="footer">
    <FaCopyright />
    <FooterLink>Dor Berko </FooterLink>
    <FooterLink>Yuval Maron </FooterLink>
    <FooterLink>Eitan Ivchanko </FooterLink>
    <FooterLink>Liran Segal</FooterLink>
  </footer>
);
export default Footer;
