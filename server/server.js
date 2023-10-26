const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { type } = req.body;
    if (type == "event") {
      cb(null, "./uploads/events");
    } else {
      cb(null, "./uploads");
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const upload = multer({ storage: storage });

const db = require("./config/db");
const ApiResponse = require("./models/api_response");

const studentController = require("./controllers/studentController");
const courseController = require("./controllers/courseController");
const batchController = require("./controllers/batchController");
const examController = require("./controllers/examController");
const jobController = require("./controllers/jobController");
const questionController = require("./controllers/questionController");
const commonController = require("./controllers/commonController");
const eventController = require("./controllers/eventController");
const mappingController = require("./controllers/mappingController");

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

app.get("/api/exams/getExams", examController.getExams);
app.post("/api/exams/addExam", examController.addExam);
app.put("/api/exams/updateExam", examController.updateExam);
app.delete("/api/exams/removeExam", examController.removeExam);

app.get("/api/jobs/getJobs", jobController.getJobs);
app.post("/api/jobs/addJob", jobController.addJob);
app.put("/api/jobs/updateJob", jobController.updateJob);
app.delete("/api/jobs/removeJob", jobController.removeJob);

app.get("/api/questions/getQuestions", questionController.getQuestions);
app.post("/api/questions/addQuestion", questionController.addQuestion);
app.put("/api/questions/updateQuestion", questionController.updateQuestion);
app.delete("/api/questions/removeQuestion", questionController.removeQuestion);

app.post("/api/uploadImages", commonController.uploadImage);

app.get("/api/events/getEvents", eventController.getEvents);
app.post("/api/events/addEvent", eventController.addEvent);
app.put("/api/events/updateEvent", eventController.updateEvent);
app.delete("/api/events/removeEvent", eventController.removeEvent);

app.get("/api/mappings/getMappings", mappingController.getMappings);
app.post("/api/mappings/addMapping", mappingController.addMapping);
app.put("/api/mappings/updateMapping", mappingController.updateMapping);
app.put("/api/mappings/updateBlockStatus", mappingController.updateBlockStatus);
app.delete("/api/mappings/removeMapping", mappingController.removeMapping);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
