const db = require("../config/db");
const ApiResponse = require("../models/api_response");

exports.getCourses = (req, res) => {
  const sql = "SELECT * FROM courses";
  db.query(sql, (err, results) => {
    if (err) {
      const apiResponse = ApiResponse.failure(err);
      return res.json(apiResponse);
    }

    if (results.length === 0) {
      const apiResponse = ApiResponse.failure(
        "No records found in the table. Please add some courses first."
      );
      return res.json(apiResponse);
    }

    const apiResponse = ApiResponse.success(results);
    res.json(apiResponse);
  });
};

exports.addCourse = (req, res) => {
  const { course_code, course_name } = req.body;

  const insertSql =
    "INSERT INTO courses (course_code, course_name) VALUES (?, ?)";
  db.query(insertSql, [course_code, course_name], (err, results) => {
    if (err) {
      const apiResponse = ApiResponse.failure(err);
      return res.json(apiResponse);
    }

    const apiResponse = ApiResponse.success(
      "New course has been successfully added."
    );
    res.json(apiResponse);
  });
};

exports.updateCourse = (req, res) => {
  const { auto_id, course_code, course_name } = req.body;
  const updateSql = `
    UPDATE courses
    SET course_code = ?, course_name = ?
    WHERE auto_id = ?;
  `;

  db.query(updateSql, [course_code, course_name, auto_id], (err, results) => {
    if (err) {
      const apiResponse = ApiResponse.failure(err);
      return res.json(apiResponse);
    }

    const apiResponse = ApiResponse.success(
      "Course record has been successfully updated."
    );
    res.json(apiResponse);
  });
};

exports.removeCourse = (req, res) => {
  const auto_id = req.body.id;

  const deleteSql = "DELETE FROM courses WHERE auto_id = ?";

  db.query(deleteSql, [auto_id], (err, results) => {
    if (err) {
      const apiResponse = ApiResponse.failure(err);
      return res.json(apiResponse);
    }

    const apiResponse = ApiResponse.success(
      "Course record has been successfully removed."
    );
    res.json(apiResponse);
  });
};
