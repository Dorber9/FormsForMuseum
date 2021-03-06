/* eslint-disable */
import React from "react";
import { TextField, InputLabel, makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import { Container, Card } from "react-bootstrap";


const cardShadow={boxShadow:"inset rgb(0 0 0) -2px -1px 14px 2px" , background:"#ffee9db3"};


 const styles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      boxShadow: " 1px 2px 5px rgb(255 203 43)",
      '&.Mui-focused fieldset': {
        borderColor: 'yellow',
      },
    },
    '& label.Mui-focused': {
      color: 'white',
    },
    '& label': {
      color: "rgb(255 225 132)",
	  marginLeft: "32%",
    },
    "& .MuiOutlinedInput-notchedOutline":{
    background: "rgb(3 3 1 / 83%)"
    },
    "& .MuiOutlinedInput-input": {
    zIndex:"1",
    color: "white"
    }
  
  }

}));

const AddMuseum = (props) => {
  const [name, setName] = useState("");
  const [museumList, setMuseumList] = useState([]);

  useEffect(() => {
    {
      setName(props.object != null ? props.object.name : "");
    }

    // eslint-disable-next-line
  }, [props.object != null ? props.object : ""]);

  const postMuseum = () => {
    Axios.post("http://34.140.118.51:3001/addMuseum", {
      name: name,
    }).then(() => {
      setMuseumList([
        ...museumList,
        {
          name: name,
        },
      ]);
    });
  };

  const updateMuseum = () => {
    Axios.put("http://34.140.118.51:3001/updateMuseum", {
      id: props.object.id,
      name: name,
    }).then(() => {
      setMuseumList([
        ...museumList,
        {
          name: name,
        },
      ]);
    });
  };

  const deleteMuseum = () => {
    Axios.delete(
      `http://34.140.118.51:3001/deleteMuseum/${props.object.id}`,
      {}
    ).then(() => {
      window.location.reload(false);
    });
  };

  const getMuseum = () => {
    Axios.get("http://34.140.118.51:3001/museum").then((response) => {
      setMuseumList(response.data);
    });
  };

  const classes = styles();


  return (
    <Container>
      <Card
        style={cardShadow}
      >
        <Card.Body>
          <Card.Text>
            {museumList.map((val, key) => {
              return (
                <div className="museum">
                  <div>
                    <h3>id: {val.id}</h3>
                    <h3>name: {val.name}</h3>
                  </div>
                </div>
              );
            })}

            <div className="txtF">
              {/* <InputLabel>Museum Name</InputLabel> <br /> */}

              <TextField
              className={classes.root}
                disabled
                value={name}
                required
                style={{ borderBottomColor: "red" }}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                variant="outlined"
                placeholder="Museum's Name"
                type="text"
                name="name"
              />
              <br></br>
              <br></br>
              <Button
                              className="bn30"

                variant="contained"
                color="primary"
                type="submit"
                onClick={props.object == null ? postMuseum : updateMuseum}
              >
                Submit
              </Button>
              {props.object == null ? (
                ""
              ) : (
                <Button
                
                  variant="contained"
                  style={{
                    color: "white",
                    background: "red",
                    marginLeft: "10px",
                  }}
                  type="submit"
                  onClick={deleteMuseum}
                >
                  Delete Museum
                </Button>
              )}
              {/* <button id="check" onClick={getMuseum}>
          Show Museums
        </button> */}
            </div>
            <br></br>
            <br></br>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddMuseum;
