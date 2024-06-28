const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Helps me connect with my frontend even though both run in different ports

//MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ricbm710",
  database: "notes",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL Database");
});

//Get Notes
app.get("/notes", (req, res) => {
  let sql = "SELECT * FROM note";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

//Create note
app.post("/notes", (req, res) => {
  const { id, title, body, date_formatted, user_owner } = req.body;

  if (!id || !title || !body || !date_formatted || !user_owner) {
    return res.status(400).send("All fields required");
  }

  let sql = "INSERT INTO note VALUES (?, ?, ?, ?, ?)";
  let values = [id, title, body, date_formatted, user_owner];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ id, title, body, date_formatted, user_owner });
  });
});

//Get note by id
/*app.get("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  let sql = "SELECT * FROM note WHERE id = ?";
  db.query(sql, [noteId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send("Note not found");
    }
    res.json(results[0]);
  });
});*/

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
