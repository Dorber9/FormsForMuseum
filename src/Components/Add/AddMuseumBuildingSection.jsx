import React from "react";
import AddBuilding from "./AddBuilding";
import AddMuseum from "./AddMuseum";
import AddSection from "./AddSection";
import { Container, CardGroup, Card } from "react-bootstrap";
import "../../App.css";

const cardShadow={boxShadow:"0px 0 2px rgb(255 225 140)"};
const headStyle= {color: "white"}


const AddMuseumBuildingSection = (props) => {
  return (
    <div>
      <Container>
        <CardGroup>
          <Card
            className="card"
            style={cardShadow}
            // border="secondary"
            // style={{ padding: "10px", background: "#dbdbdbad" }}
          >
            <Card.Title style={headStyle}>Add Museum</Card.Title>

            <Card.Body>
              <Card.Text>
                <AddMuseum></AddMuseum>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            className="card"
            style={cardShadow}
          >
            <Card.Title style={headStyle}>Add Building</Card.Title>
            <Card.Body>
              <Card.Text>
                <AddBuilding></AddBuilding>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
             className="card"
            style={cardShadow}
          >
            <Card.Title style={headStyle}>Add Section</Card.Title>
            <Card.Body>
              <Card.Text>
                <AddSection></AddSection>
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </Container>
    </div>
  );
};

export default AddMuseumBuildingSection;
