const db = require("../config/db");
const ApiResponse = require("../models/api_response");

exports.getExams = (req, res) => {
  const sql = `
      SELECT 
        exams.*, 
        courses.course_name, 
        batches.batch_name
      FROM 
        exams
      INNER JOIN 
        courses ON exams.course_code = courses.auto_id
      INNER JOIN 
        batches ON exams.batch_code = batches.auto_id
    `;

  db.query(sql, (err, results) => {
    if (err) {
      const apiResponse = ApiResponse.failure(err);
      return res.json(apiResponse);
    }

    if (results.length === 0) {
      const apiResponse = ApiResponse.failure(
        "No records found in the table. Please add some exams first."
      );
      return res.json(apiResponse);
    }

    const apiResponse = ApiResponse.success(results);
    res.json(apiResponse);
  });
};

exports.addExam = (req, res) => {
  const { batch_code, course_code, exam_code } = req.body;

  const insertSql =
    "INSERT INTO exams (batch_code, course_code, exam_code) VALUES (?, ?, ?)";
  db.query(insertSql, [batch_code, course_code, exam_code], (err, results) => {
    if (err) {
      const apiResponse = ApiResponse.failure(err);
      return res.json(apiResponse);
    }

    const apiResponse = ApiResponse.success(
      "New exam has been successfully added."
    );
    res.json(apiResponse);
  });
};

exports.updateExam = (req, res) => {
  const { exam_auto_id, batch_code, course_code, exam_code } = req.body;
  const updateSql = `
    UPDATE exams
    SET batch_code = ?, course_code = ?, exam_code = ?
    WHERE exam_auto_id = ?;
  `;

  db.query(
    updateSql,
    [batch_code, course_code, exam_code, exam_auto_id],
    (err, results) => {
      if (err) {
        const apiResponse = ApiResponse.failure(err);
        return res.json(apiResponse);
      }

      const apiResponse = ApiResponse.success(
        "Exam record has been successfully updated."
      );
      res.json(apiResponse);
    }
  );
};

exports.removeExam = (req, res) => {
  const exam_auto_id = req.body.id;

  const deleteSql = "DELETE FROM exams WHERE exam_auto_id = ?";

  db.query(deleteSql, [exam_auto_id], (err, results) => {
    if (err) {
      const apiResponse = ApiResponse.failure(err);
      return res.json(apiResponse);
    }

    const apiResponse = ApiResponse.success(
      "Exam record has been successfully removed."
    );
    res.json(apiResponse);
  });
};
