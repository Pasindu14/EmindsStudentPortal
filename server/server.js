const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db");
const ApiResponse = require("./models/api_response");

const studentController = require("./controllers/studentController");
const courseController = require("./controllers/courseController");
const batchController = require("./controllers/batchController");

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

app.get("/api/masters/getStudents", studentController.getStudents);
app.post("/api/masters/addStudent", studentController.addStudent);
app.put("/api/masters/updateStudent", studentController.updateStudent);
app.delete("/api/masters/removeStudent", studentController.removeStudent);

app.get("/api/courses/getCourses", courseController.getCourses);
app.post("/api/courses/addCourse", courseController.addCourse);
app.put("/api/courses/updateCourse", courseController.updateCourse);
app.delete("/api/courses/removeCourse", courseController.removeCourse);

app.get("/api/batches/getBatches", batchController.getBatches);
app.post("/api/batches/addBatch", batchController.addBatch);
app.put("/api/batches/updateBatch", batchController.updateBatch);
app.delete("/api/batches/removeBatch", batchController.removeBatch);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
