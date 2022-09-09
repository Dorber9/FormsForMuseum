import React from "react";
import "../App.css";
import { Container, CardGroup, Card, Button } from "react-bootstrap";
import Data from "../Images/Data.jpg";
import Reports from "../Images/Reports.jpg";
import Course from "../Images/Course.jpg";

const cardShadow = { boxShadow: "0px 0 2px rgb(255 225 140)" };

const HomePage = () => {
  return (
    <div className="tb" style={{ minHeight: `calc(100vh - 80px)` }}>
      <Container>
        <CardGroup
          style={{
            padding: "10px",
            marginTop: "30px",
            boxShadow: "rgb(255 244 244) 0px 0px 1px 0px",
          }}
        >
          <Card className="card" style={cardShadow}>
            <Card.Img className="cardImage" variant="top" src={Data} />
            <Card.Body>
              <Card.Title>Manage Data</Card.Title>

              <Card.Text>
                Here you can add, modify or delete items from the museum
                database.
              </Card.Text>

              <Button className="bn30" href="/Add">
                Add Data
              </Button>

              <Button
                className="bn30"
                style={{ marginLeft: "15px" }}
                variant="primary"
                href="/ModifyData"
              >
                Manage Data
              </Button>
            </Card.Body>
          </Card>
          <Card className="card" style={cardShadow}>
            <Card.Img className="cardImage" variant="top" src={Reports} />
            <Card.Body>
              <Card.Title>Reports</Card.Title>
              <Card.Text>Generate Reports from the museum database</Card.Text>

              <Button className="bn30" href="/Reports">
                Reports
              </Button>
            </Card.Body>
          </Card>
          <Card className="card" style={cardShadow}>
            <Card.Img className="cardImage" variant="top" src={Course} />
            <Card.Body>
              <Card.Title>Manage Quests</Card.Title>
              <Card.Text>
                Here you can add, modify or delete quests from treasure hunt's
                games.
              </Card.Text>

              <Button className="bn30" href="/CourseWizard">
                Manage Quests
              </Button>
            </Card.Body>
          </Card>
        </CardGroup>
      </Container>
    </div>
  );
};

export default HomePage;
