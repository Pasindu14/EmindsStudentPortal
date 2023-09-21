const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable cookies or authorization headers, if needed
  })
);
// Define a route to retrieve data from MySQL under the /api path
app.post("/api/users/signIn", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  const values = [username, password];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      return res.status(500).json({ error: "Error querying MySQL" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Row not found" });
    }

    const row = results[0];
    res.json(row);
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
