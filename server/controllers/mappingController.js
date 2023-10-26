const db = require("../config/db");
const ApiResponse = require("../models/api_response");

exports.getMappings = (req, res) => {
  const sql = `
      SELECT 
        students_mapping.auto_id,
        students.name,
        students.nic,
        batches.course_auto_id,
        courses.course_name,
        courses.course_code,
        students_mapping.block_status
      FROM 
      students_mapping
      JOIN students ON students_mapping.student_auto_id = students.auto_id
      JOIN batches ON students_mapping.batch_auto_id = batches.auto_id
      JOIN courses ON batches.course_auto_id = courses.auto_id
    `;

  db.query(sql, (err, results) => {
    if (err) {
      const apiResponse = ApiResponse.failure(err);
      return res.json(apiResponse);
    }

    if (results.length === 0) {
      const apiResponse = ApiResponse.failure("No records found in the table.");
      return res.json(apiResponse);
    }

    const apiResponse = ApiResponse.success(results);
    res.json(apiResponse);
  });
};

exports.addMapping = (req, res) => {
  const { student_auto_id, batch_auto_id, block_status } = req.body;
  const insertSql =
    "INSERT INTO students_mapping (student_auto_id, batch_auto_id, block_status) VALUES (?, ?, ?)";
  console.log("student_auto_id", student_auto_id);
  db.query(
    insertSql,
    [student_auto_id, batch_auto_id, block_status],
    (err, results) => {
      if (err) {
        const apiResponse = ApiResponse.failure(err);
        return res.json(apiResponse);
      }
      const apiResponse = ApiResponse.success(
        "New mapping has been successfully added."
      );
      res.json(apiResponse);
    }
  );
};

exports.updateMapping = (req, res) => {
  const { auto_id, student_auto_id, batch_auto_id, block_status } = req.body;
  const updateSql = `
    UPDATE students_mapping
    SET student_auto_id = ?, batch_auto_id = ?, block_status = ?
    WHERE auto_id = ?;
  `;

  db.query(
    updateSql,
    [student_auto_id, batch_auto_id, block_status, auto_id],
    (err, results) => {
      if (err) {
        const apiResponse = ApiResponse.failure(err);
        return res.json(apiResponse);
      }
      const apiResponse = ApiResponse.success(
        "Mapping record has been successfully updated."
      );
      res.json(apiResponse);
    }
  );
};

exports.removeMapping = (req, res) => {
  const auto_id = req.body.id;
  const deleteSql = "DELETE FROM students_mapping WHERE auto_id = ?";

  db.query(deleteSql, [auto_id], (err, results) => {
    if (err) {
      const apiResponse = ApiResponse.failure(err);
      return res.json(apiResponse);
    }
    const apiResponse = ApiResponse.success(
      "Mapping record has been successfully removed."
    );
    res.json(apiResponse);
  });
};

exports.updateBlockStatus = (req, res) => {
  const { auto_id, block_status } = req.body;
  const updateSql = `
      UPDATE students_mapping
      SET block_status = ?
      WHERE auto_id = ?;
    `;
  db.query(updateSql, [block_status, auto_id], (err, results) => {
    if (err) {
      const apiResponse = ApiResponse.failure(err);
      return res.json(apiResponse);
    }
    const apiResponse = ApiResponse.success(
      "Block status has been successfully updated."
    );
    res.json(apiResponse);
  });
};
