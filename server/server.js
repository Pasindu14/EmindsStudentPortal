const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db");
const ApiResponse = require("./models/api_response");

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

app.get("/api/helloworld", (req, res) => {
  const sql = "SELECT * FROM users ";
  const values = ["username", "password"];
  db.query(sql, values, (err, results) => {
    return res.json({ error: results });
  });
});
// Define a route to retrieve data from MySQL under the /api path
app.post("/api/users/signIn", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  const values = [username, password];

  db.query(sql, values, (err, results) => {
    if (err) {
      const apiResponse = ApiResponse.failure(err);
      return res.json(apiResponse);
    }

    if (results.length === 0) {
      const apiResponse = ApiResponse.failure("Invalid username or password");
      return res.json(apiResponse);
    }

    const apiResponse = ApiResponse.success(results);
    res.json(apiResponse);
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
