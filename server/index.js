const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "11qq22ww",
  database: "museum",
});

// add and get Museums
app.post("/addMuseum", (req, res) => {
  const name = req.body.name;
  db.query("INSERT INTO museum (name) VALUES (?)", [name], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Values Inserted");
    }
  });
});
app.get("/museum", (req, res) => {
  db.query("SELECT * FROM museum", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//add and get Buildings
app.post("/addBuilding", (req, res) => {
  const name = req.body.name;
  const city = req.body.city;
  const address = req.body.address;
  const MuseumID = req.body.MuseumID;
  db.query(
    "INSERT INTO building (name,city,address,MuseumID) VALUES (?,?,?,?)",
    [name, city, address, MuseumID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
app.get("/building", (req, res) => {
  db.query("SELECT * FROM building", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//add and get Sections
app.post("/addSection", (req, res) => {
  const name = req.body.Name;
  const description = req.body.Description;
  const BuildingID = req.body.BuildingID;
  db.query(
    "INSERT INTO section (name,description,BuildingID) VALUES (?,?,?)",
    [name, description, BuildingID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
app.get("/Section", (req, res) => {
  db.query("SELECT * FROM section", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
