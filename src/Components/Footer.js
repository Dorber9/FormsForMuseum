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
