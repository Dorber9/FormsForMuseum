/* eslint-disable */
import React from "react";
import { TextField, makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Container, Card } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const server_ip = "127.0.01"

const contentContainerStyle = {
    display: "block",
    marginLeft: "5%",
    marginTop: "15px",
    marginBottom: "15px",
    justifyContent: "center", //Centered vertically
    alignItems: "center", // Centered horizontally
    flex: 1,
};

const cardShadow = {
    boxShadow: "inset rgb(0 0 0) -2px -1px 14px 2px",
    background: "#ffee9db3",
};

const styles = makeStyles((theme) => ({
    root: {
        "& .MuiOutlinedInput-root": {
            boxShadow: " 1px 2px 5px rgb(255 203 43)",
            "&.Mui-focused fieldset": {
                borderColor: "yellow",
            },
        },
        "& label.Mui-focused": {
            color: "white",
        },
        "& label": {
            color: "rgb(255 225 132)",
            marginLeft: "32%",
        },
        "& .MuiOutlinedInput-notchedOutline": {
            background: "rgb(3 3 1 / 83%)",
        },
        "& .MuiOutlinedInput-input": {
            zIndex: "1",
            color: "white",
        },
    },
}));

const AddBuilding = (props) => {
    const [address, setAddress] = useState("1222000");
    const [city, setCity] = useState("מעיין ברוך");
    const [name, setName] = useState("");
    const [selectedValue, setSelectedValue] = useState(1);
    const [buildingList, setBuildingList] = useState([]);
    const [museumList, setMuseumList] = useState([]);
    const [building, setBuilding] = useState({});
    useEffect(() => {
        getMuseum();
        if (props.object != null) {
            console.log("im here");
            setName(props.object.Name);
            setCity(props.object.City);
            setAddress(props.object.Address);
            setSelectedValue(props.object.MuseumID);
        }
    }, [props.object != null ? props.object : ""]);

    const postBuilding = () => {
        if (selectedValue === "Please Select Museum") {
            alert("Please Select a Museum");
        } else {
            Axios.post(`http://${server_ip}:3001/addBuilding`, {
                Name: name,
                City: city,
                Address: address,
                MuseumID: selectedValue,
            }).then(() => {
                setBuildingList([
                    ...buildingList,
                    {
                        Name: name,
                        City: city,
                        Address: address,
                        MuseumID: selectedValue,
                    },
                ]);
                alert("Success!");
                window.location.reload(false);
            });
        }
    };

    const updateBuilding = () => {
        Axios.put(`http://${server_ip}:3001/updateBuilding`, {
            BuildingID: props.object.BuildingID,
            Name: name,
            City: city,
            Address: address,
            MuseumID: selectedValue,
        }).then(() => {
            setBuildingList([
                ...buildingList,
                {
                    Name: name,
                    City: city,
                    Address: address,
                    MuseumID: selectedValue,
                },
            ]);
        });
    };

    const getBuilding = () => {
        Axios.get(`http://${server_ip}:3001/building`).then((response) => {
            setBuildingList(response.data);
        });
    };

    const getMuseum = () => {
        Axios.get(`http://${server_ip}:3001/museum`).then((response) => {
            setMuseumList(response.data);
        });
    };

    const deleteBuilding = () => {
        Axios.delete(
            `http://${server_ip}:3001/deleteBuilding/${props.object.BuildingID}`, {}
        ).then(() => {
            window.location.reload(false);
        });
    };

    const classes = styles();

    return ( <
        >
        <
        Container >
        <
        Card style = { cardShadow } >
        <
        Card.Body >
        <
        Card.Text >
        <
        div className = "txtf" >
        <
        TextField className = { classes.root }
        value = { name }
        onChange = {
            (event) => {
                setName(event.target.value);
            }
        }
        variant = "outlined"
        type = "text"
        name = "name"
        label = "Building Name" /
        >
        <
        br / >
        <
        br / >
        <
        TextField className = { classes.root }
        disabled value = { city }
        onChange = {
            (event) => {
                setCity(event.target.value);
            }
        }
        variant = "outlined"
        type = "text"
        name = "City"
        label = "City"
        helperText = { city === "" ? "Field cannot be empty" : "" }
        error = { city === "" }
        /> <
        br / >
        <
        br / >
        <
        TextField className = { classes.root }
        disabled value = { address }
        onChange = {
            (event) => {
                setAddress(event.target.value);
            }
        }
        variant = "outlined"
        type = "text"
        name = "Address"
        label = "Address"
        helperText = { address === "" ? "Field cannot be empty" : "" }
        error = { address === "" }
        /> <
        br / >
        <
        br / >
        <
        label >
        Museum:
        <
        select style = {
            { marginLeft: "10px" } }
        onChange = {
            (event) => {
                setSelectedValue(event.target.value);
            }
        } >
        {
            props.object == null ? ( <
                option disabled selected value >
                Please Select Museum <
                /option>
            ) : (
                ""
            )
        }

        {
            museumList.map((val, key) => {
                return ( <
                    option selected = {
                        (props.object != null &&
                            val.id == props.object.MuseumID) ||
                        val.id == 1
                    }
                    className = "museum"
                    value = { val.id } >
                    { val.name } <
                    /option>
                );
            })
        } <
        /select> <
        /label> <
        br / >
        <
        br / >
        <
        Button className = "bn30"
        variant = "contained"
        color = "primary"
        type = "submit"
        onClick = { props.object == null ? postBuilding : updateBuilding } >
        SUBMIT <
        /Button> {
            props.object == null ? (
                ""
            ) : ( <
                Button variant = "contained"
                color = "primary"
                type = "submit"
                style = {
                    {
                        color: "white",
                        background: "red",
                        marginLeft: "10px",
                    }
                }
                onClick = { deleteBuilding } >
                Delete Building <
                /Button>
            )
        }

        {
            /* <button onClick={getBuilding} id="check">
                      Show Buildings
                    </button> */
        } <
        /div> <
        /Card.Text> <
        /Card.Body> <
        /Card> <
        /Container> <
        />
    );
};

export default AddBuilding;