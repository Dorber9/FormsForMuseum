import styled from "styled-components";

export const Box = styled.div`
  padding: 20px 60px;
  background: #00001a;
  position: abosulute;
  bottom: 0;

  width: 100%;

  @media (max-width: 1000px) {
    padding: 35px 0px;
    align-items: center;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
  /* background: red; */
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-left: 60px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  grid-gap: 20px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  }
`;

export const FooterLink = styled.a`
  padding: 2px;
  color: #fff;
  margin-bottom: 0px;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    color: green;
    transition: 200ms ease-in;
  }
`;

export const Heading = styled.p`
  font-size: 24px;
  color: lightblue;
  margin-bottom: -20px;
  font-weight: bold;
`;
