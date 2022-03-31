import React from "react";
import "../App.css";
import {
  Container,
  CardGroup,
  Card,
  ListGroupItem,
  ListGroup,
  Button,
} from "react-bootstrap";
import Data from "../Images/Data.jpg";
import Reports from "../Images/Reports.png";
import Course from "../Images/Course.jpg";

const HomePage = () => {
  return (
    <div className="tb" style={{ minHeight: `calc(100vh - 80px)` }}>
      <Container>
        
        <CardGroup style={{ padding: "10px" , marginTop:"10px", boxShadow: "1px 2px 5px rgb(255 244 244)" }}>
          <Card className="card" border="primary">
            <Card.Img className="cardImage" variant="top" src={Data} />
            <Card.Body>
              <Card.Title>Manage Data</Card.Title>
              
              <Card.Text>
                Here you can add, modify or delete items from the museum
                database.
                
              </Card.Text>
              
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  <Button variant="primary" href="/Add">
                    Add Data
                  </Button>
                </ListGroupItem>
                <ListGroupItem>
                  <Button variant="primary" href="/ModifyData">
                    Manage Data
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card className="card" border="primary">
            <Card.Img className="cardImage" variant="top" src={Reports} />
            <Card.Body>
              <Card.Title>Reports</Card.Title>
              <Card.Text>Generate Reports from the museum database</Card.Text>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  <Button variant="primary" href="/Reports">
                    Reports
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card className="card" border="primary">
            <Card.Img className="cardImage" variant="top" src={Course} />
            <Card.Body>
              <Card.Title>Quest Wizard</Card.Title>
              <Card.Text>
                Here you can add, modify or delete quests from treasure hunt's
                games.
              </Card.Text>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  <Button variant="primary" href="/CourseWizard">
                    Quest Wizard
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        </CardGroup>
      
      </Container>
    </div>
  );
};

export default HomePage;
