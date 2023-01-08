const express = require("express");
let app = express();

// ! ---------------------------------------------- CONNECT TO THE DATABASE
const Datastore = require("nedb");
// let datastore = nedb();

// !---------------------------------------------- CONNECT TO THE PORT
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("LISTENING TO PORT 5000 :)");
});
// !---------------------------------------------- GIVING THE EXPRESS A DIRECTOtY
// !--- to show the public (index.html)
app.use(express.static("public"));
// !--- express.json()--- for server to inderstand the inconing json data
app.use(express.json());

let database = new Datastore("datastore.db");
database.loadDatabase();

// ! POST method is used to send data to server
// ! expample submitting a form
app.post("/api", (req, res) => {
  // (/api) where the client send data to me
  // reciving data from the cient (req.body)
  console.log("I recive something");
  console.log(req.body);
  const data = req.body;

  const timestamp = new Date().toLocaleString();
  data.timestamp = timestamp;

  database.insert(data);
  // sending data from server to the client  res.json()

  res.json(data);
});

// !
app.get("/api", (req, res) => {
  database.find({}, (err, data) => {
    if (err) {
      res.end();
    } else {
      res.json(data);
    }
  });
});
// // sending request to the clint
// app.post("/api", (req, res) => {
//   console.log(req.body);
//   let data = req.body;
//   let timestamp = Date.now();
//   data.timestamp = timestamp;
//   database.insert(data);

//   res.json({
//     status: "success :)",
//     timestamp: timestamp,
//     latitude: data.lat,
//     longitude: data.lon,
//   });
// });
