const port = process.env.PORT || 3001;
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const multer = require("multer");
const path = require("path");

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  user: "root",
  host: "34.65.174.141",
  password: "MophM2022!",
  database: "museum",
});

// let db = "";

// const createUnixSocketPool = async (config) => {
//   const dbSocketPath = process.env.DB_SOCKET_PATH || "/cloudsql";

//   // Establish a connection to the database
//   db = mysql.createPool({
//     user: process.env.DB_USER, // e.g. 'my-db-user'
//     password: process.env.DB_PASS, // e.g. 'my-db-password'
//     database: process.env.DB_NAME, // e.g. 'my-database'
//     // If connecting via unix domain socket, specify the path
//     socketPath: `${dbSocketPath}/${process.env.INSTANCE_CONNECTION_NAME}`,
//     // Specify additional properties here.
//     ...config,
//   });
// };

// add, update, get Museums
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
app.put("/updateMuseum", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  db.query(
    "UPDATE museum SET name = ? WHERE id = ?",
    [name, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.delete("/deleteMuseum/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM museum WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//add get update remove Questions
app.get("/question", (req, res) => {
  db.query("SELECT * FROM Questions", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/addQuestion", (req, res) => {
  var ObjectID = req.body.itemID;
  console.log(req.body);
  const questions = req.body.questions;
  console.log(questions);
  questions.forEach((element) => {
    var question = element.question;
    var answer1 = element.answer1;
    var answer2 = element.answer2;
    var answer3 = element.answer3;
    var answer4 = element.answer4;
    var hint = element.hint;
    var correct = element.correct;

    console.log(element);
    db.query(
      "INSERT INTO Questions (Question,a1,a2,a3,a4,Clue,Correct,ObjectID) VALUES (?,?,?,?,?,?,?,?)",
      [question, answer1, answer2, answer3, answer4, hint, correct, ObjectID],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          //res.send("Values Inserted");
          console.log("success");
        }
      }
    );
  });
});

app.put("/updateQuestion", (req, res) => {
  const questions = req.body.questions;
  var ObjectID = req.body.itemID;
  console.log(questions);
  questions.forEach((element) => {
    var question = element.question;
    var qid = element.qid;
    var answer1 = element.answer1;
    var answer2 = element.answer2;
    var answer3 = element.answer3;
    var answer4 = element.answer4;
    var hint = element.hint;
    var correct = element.correct;

    console.log(element);
    db.query(
      "UPDATE Questions SET Question = ?, a1 = ?, a2 = ?, a3 = ?, a4 = ?, Clue = ?, Correct = ?, ObjectID = ?  WHERE QuestionID = ?",

      [
        question,
        answer1,
        answer2,
        answer3,
        answer4,
        hint,
        correct,
        ObjectID,
        qid,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          //res.send("Values Inserted");
          console.log("hada");
        }
      }
    );
  });
});

app.delete("/deleteQuestion/:id", (req, res) => {
  const id = req.params.qid;
  db.query("DELETE FROM Questions WHERE QuestionID = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//add and get Buildings
app.post("/addBuilding", (req, res) => {
  const Name = req.body.Name;
  const City = req.body.City;
  const Address = req.body.Address;
  const MuseumID = req.body.MuseumID;
  console.log(MuseumID);
  db.query(
    "INSERT INTO building (Name,City,Address,MuseumID) VALUES (?,?,?,?)",
    [Name, City, Address, MuseumID],
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
app.put("/updateBuilding", (req, res) => {
  const BuildingID = req.body.BuildingID;
  const Name = req.body.Name;
  const City = req.body.City;
  const Address = req.body.Address;
  const MuseumID = req.body.MuseumID;
  db.query(
    "UPDATE building SET Name = ?, City = ?, Address = ?, MuseumID = ? WHERE BuildingID = ?",
    [Name, City, Address, MuseumID, BuildingID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.delete("/deleteBuilding/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM building WHERE BuildingID = ?", id, (err, result) => {
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
app.put("/updateSection", (req, res) => {
  const idSection = req.body.idSection;
  const Name = req.body.Name;
  const Description = req.body.Desctiption;
  const BuildingID = req.body.BuildingID;
  db.query(
    "UPDATE section SET Name = ?, Description = ?, BuildingID = ? WHERE idSection = ?",
    [Name, Description, BuildingID, idSection],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.delete("/deleteSection/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM section WHERE idSection = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// add and get Display
app.post("/addDisplay", (req, res) => {
  const name = req.body.Name;
  const theme = req.body.Theme;
  const permanent = req.body.permanent;
  const startDate = req.body.StartDate == "" ? null : req.body.startDate;
  const endDate = req.body.EndDate == "" ? null : req.body.endDate;
  const curator = req.body.Curator;
  const designer = req.body.Designer;
  const shortDescription = req.body.ShortDesc;
  const reason = req.body.Reason;
  const sectionID = req.body.SectionID;
  db.query(
    "INSERT INTO display (Name, Theme,permanent,StartDate,EndDate,Curator,Designer, ShortDesc, Reason, SectionID) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [
      name,
      theme,
      permanent,
      startDate,
      endDate,
      curator,
      designer,
      shortDescription,
      reason,
      sectionID,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/Display", (req, res) => {
  db.query("SELECT * FROM display", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.put("/updateDisplay", (req, res) => {
  console.log("Hada");
  const idDisplay = req.body.idDisplay;
  const Name = req.body.Name;
  const Theme = req.body.Theme;
  const permanent = req.body.permanent;
  const StartDate = req.body.StartDate;
  const EndDate = req.body.EndDate;
  const Curator = req.body.Curator;
  const Designer = req.body.Designer;
  const ShortDesc = req.body.ShortDesc;
  const Reason = req.body.Reason;
  const SectionID = req.body.SectionID;

  db.query(
    "UPDATE display SET Name = ?, Theme = ?, permanent = ?, StartDate = ?, EndDate = ?, Curator = ?, Designer = ?, ShortDesc = ?, Reason = ?, SectionID = ? WHERE idDisplay = ?",
    [
      Name,
      Theme,
      permanent,
      StartDate,
      EndDate,
      Curator,
      Designer,
      ShortDesc,
      Reason,
      SectionID,
      idDisplay,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.delete("/deleteDisplay/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM display WHERE idDisplay = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// add and get Showcase
app.post("/addShowcase", (req, res) => {
  const Number = req.body.Number;
  const Name = req.body.Name;
  const Descr = req.body.Desc;
  const Type = req.body.Type;
  const SpecialCare = req.body.SpecialCare;
  const DisplayID = req.body.DisplayID;
  const ImagePath = req.body.ImagePath;

  db.query(
    "INSERT INTO showcase (Number,Name,Descr,Type,SpecialCare,DisplayID,ImagePath) VALUES (?,?,?,?,?,?,?)",
    [Number, Name, Descr, Type, SpecialCare, DisplayID, ImagePath],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/Showcase", (req, res) => {
  db.query("SELECT * FROM showcase", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.put("/updateShowcase", (req, res) => {
  console.log("hon");
  const idShowcase = req.body.idShowcase;
  const Number = req.body.Number;
  const Name = req.body.Name;
  const Descr = req.body.Descr;
  const Type = req.body.Type;
  const SpecialCare = req.body.SpecialCare;
  const DisplayID = req.body.DisplayID;
  const ImagePath = req.body.ImagePath;
  const SpecialCareDescr = req.body.SpecialCareDescr;

  db.query(
    "UPDATE showcase SET Number = ?, Name = ?, Descr = ?, Type = ?, SpecialCare = ?, SpecialCareDescr = ?, DisplayID = ?, ImagePath = ? WHERE idShowcase = ?",
    [
      Number,
      Name,
      Descr,
      Type,
      SpecialCare,
      SpecialCareDescr,
      ImagePath,
      DisplayID,
      idShowcase,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.delete("/deleteShowcase/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM showcase WHERE idShowcase = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Get Post Item

app.get("/Item", (req, res) => {
  db.query("SELECT * FROM item", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/addItem", (req, res) => {
  const ID = req.body.ID;
  const name = req.body.name;
  const descr = req.body.descr;
  const shortDescr = req.body.shortDescr;
  const storage = req.body.storage;
  const displayID = req.body.displayID == "" ? null : req.body.displayID;
  const showcaseID = req.body.showcaseID == "" ? null : req.body.showcaseID;
  const site = req.body.site;
  const period = req.body.period;
  const age = req.body.age;
  const material = req.body.material;
  const website = req.body.website;
  const size = req.body.size;
  const references = req.body.references;
  const itemData = req.body.itemData;
  const ImagePath = req.body.ImagePath;
  const data = itemData.map((x) =>
    Object.keys(x)
      .filter((key) => key != "id")
      .map((key) => `${key} => ${x[key]}`)
      .join(" &&& ")
  );
  const data1 = data.map((temp) => temp + "^%^");
  console.log(data1.toString());
  console.log(data1.toString().split("^%^"));

  db.query(
    "INSERT INTO item (ItemID, ItemName, Descr, ShortDescr, InStorage, DisplayID, ShowcaseID, Site, Period, Age, Material, Website, Size, Refs, ImagePath, ItemData) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      ID,
      name,
      descr,
      shortDescr,
      storage,
      displayID,
      showcaseID,
      site,
      period,
      age,
      material,
      website,
      size,
      references,
      ImagePath,
      data1.toString(),
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
app.put("/updateItem", (req, res) => {
  const ID = req.body.ID;
  const name = req.body.name;
  const descr = req.body.descr;
  const shortDescr = req.body.shortDescr;
  const storage = req.body.storage;
  const displayID = req.body.displayID == "" ? null : req.body.displayID;
  const showcaseID = req.body.showcaseID == "" ? null : req.body.showcaseID;
  const site = req.body.site;
  const period = req.body.period;
  const age = req.body.age;
  const material = req.body.material;
  const website = req.body.website;
  const size = req.body.size;
  const references = req.body.references;
  const itemData = req.body.itemData;
  const ImagePath = req.body.ImagePath;
  const data = itemData.map((x) =>
    Object.keys(x)
      .filter((key) => key != "id")
      .map((key) => `${key} => ${x[key]}`)
      .join(" &&& ")
  );
  const data1 = data.map((temp) => temp + "^%^");

  db.query(
    "UPDATE item SET ItemName = ?, Descr = ?, Material = ?, Period = ?, Site = ?, ShortDescr = ?, Age = ?, Website = ?, Size = ?, InStorage = ?, DisplayID = ?, ShowcaseID = ?, Refs = ?, ImagePath = ?, ItemData = ? WHERE ItemID = ?",
    [
      name,
      descr,
      material,
      period,
      site,
      shortDescr,
      age,
      website,
      size,
      storage,
      displayID,
      showcaseID,
      references,
      ImagePath,
      data1.toString(),
      ID,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.delete("/deleteItem/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM item WHERE ItemID = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/Item/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM item WHERE ItemID = ?", id, (err, result) => {
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

const storage = multer.diskStorage({
  destination: "/home/mophm2022/frontEnd/public",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("myImage");

// test
app.post("/upload", (req, res) => {
  upload(req, res, function (err) {
    // console.log("Request ---", req.body);
    // console.log("Request file ---", req.file); //Here you get file.
    res.json(`/${req.file.filename}`);
    console.log(`${__dirname}/../../frontEnd/public/${req.file.filename}`);
    /*Now do where ever you want to do*/
    if (!err) {
      return `/${req.file.filename}`;
    } else {
      res.json("idwidqwidwdi");
    }
  });
});

app.get("/", function (req, res) {
  console.log("i am here");
  res.json("Hello hallo");
});

app.get("/test", function (req, res) {
  console.log("asd");
  res.json("zxczxcasdnplo");
});

app.listen(port, () => {
  console.log("Yey, your server is running on port " + port);
});
