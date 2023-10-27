const db = require("../config/db");
const ApiResponse = require("../models/api_response");

exports.getStudents = (req, res) => {
  const sql = "SELECT * FROM students";
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
};

exports.addStudent = (req, res) => {
  const { name, phone, address, nic, email, birthDay } = req.body;

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
        const apiResponse = ApiResponse.success(
          "New student record has been successfully added."
        );
        res.json(apiResponse);
      }
    );
  });
};

exports.updateStudent = (req, res) => {
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
};

exports.removeStudent = (req, res) => {
  const auto_id = req.body.id;

  const deleteSql = `
        DELETE FROM students
        WHERE auto_id = ?;
      `;

  db.query(deleteSql, [auto_id], (err, results) => {
    if (err) {
      const apiResponse = ApiResponse.failure(err);
      return res.json(apiResponse);
    }

    const apiResponse = ApiResponse.success(
      "Student record has been successfully removed."
    );
    res.json(apiResponse);
  });
};
