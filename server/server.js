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
    credentials: true,
  })
);

app.get("/api/helloworld", (req, res) => {
  const sql = "SELECT * FROM students ";
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

app.get("/api/masters/getStudents", (req, res) => {
  const sql = "SELECT * FROM students";
  console.log(sql);
  db.query(sql, (err, results) => {
    if (err) {
      const apiResponse = ApiResponse.failure(err);
      return res.json(apiResponse);
    }

    if (results.length === 0) {
      const apiResponse = ApiResponse.failure(
        "No records found in the table. Please add some data first."
      );

      return res.json(apiResponse);
    }

    const apiResponse = ApiResponse.success(results);
    res.json(apiResponse);
  });
});

app.post("/api/masters/addStudent", (req, res) => {
  const { name, phone, address, nic, email, birthDay } = req.body;

  // Validate the incoming data before running the SQL query
  // ...

  // Check if phoneNumber already exists
  const checkSql = "SELECT * FROM students WHERE phoneNumber = ?";

  db.query(checkSql, [phone], (err, results) => {
    if (err) {
      const apiResponse = ApiResponse.failure(err);
      return res.json(apiResponse);
    }

    // If phoneNumber already exists, return an error response
    if (results.length > 0) {
      const apiResponse = ApiResponse.failure("Phone number already exists.");
      return res.json(apiResponse);
    }

    // If phoneNumber doesn't exist, proceed to insert
    const insertSql =
      "INSERT INTO students (name, phoneNumber, address, nic, email, birthDay) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(
      insertSql,
      [name, phone, address, nic, email, birthDay],
      (err, results) => {
        if (err) {
          const apiResponse = ApiResponse.failure(err);
          return res.json(apiResponse);
        }

        console.log(results);
        const apiResponse = ApiResponse.success(
          "New student record has been successfully added."
        );
        res.json(apiResponse);
      }
    );
  });
});

app.put("/api/masters/updateStudent", (req, res) => {
  const { name, phone, address, nic, email, birthDay, auto_id } = req.body;

  const updateSql = `
    UPDATE students
    SET name = ?, phoneNumber = ?, address = ?, nic = ?, email = ?, birthDay = ?
    WHERE auto_id = ?;
  `;

  db.query(
    updateSql,
    [name, phone, address, nic, email, birthDay, auto_id],
    (err, results) => {
      if (err) {
        const apiResponse = ApiResponse.failure(err);
        return res.json(apiResponse);
      }

      const apiResponse = ApiResponse.success(
        "Student record has been successfully updated."
      );
      res.json(apiResponse);
    }
  );
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
