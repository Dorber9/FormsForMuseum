import React from 'react';
import AddBuilding from './AddBuilding';
import AddMuseum from './AddMuseum';
import AddSection from './AddSection';
import {
  Container,
  CardGroup,
  Card,
} from "react-bootstrap";
import "../../App.css";


const AddMuseumBuildingSection = props => {
    return (
        <div>
           <Container>
        <CardGroup style={{ padding: "10px" , backgroundColor: "#cadbf573" }}>
          <Card className="addCard" border="secondary" >
             <Card.Title>Add Museum</Card.Title>

            <Card.Body>
             
              <Card.Text>
                <AddMuseum></AddMuseum>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="addCard" border="secondary">
            <Card.Title>Add Building</Card.Title>
            <Card.Body>
              <Card.Text><AddBuilding></AddBuilding></Card.Text>
            </Card.Body>
          </Card>
          <Card className="addCard" border="secondary">
           <Card.Title>Add Section</Card.Title>
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