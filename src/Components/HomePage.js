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
    <div>
      <Container>
        <CardGroup style={{ padding: "10px" }}>
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
                  <Button variant="primary" href="/ModifyData">Manage Data</Button>
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
                  <Button variant="primary" href="/Add">
                    Reports
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card className="card" border="primary">
            <Card.Img className="cardImage" variant="top" src={Course} />
            <Card.Body>
              <Card.Title>Course Wizard</Card.Title>
              <Card.Text>
                Here you can add, modify or delete courses from treasure hunt's
                games.
              </Card.Text>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  <Button variant="primary" href="/CourseWizard">
                    Course Wizard
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
