const db = require("../config/db");
const ApiResponse = require("../models/api_response");

exports.getBatches = (req, res) => {
  const sql = "SELECT * FROM batches";
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

exports.addBatch = (req, res) => {
  const {
    batch_no,
    batch_name,
    zoom_link,
    course_auto_id,
    start_date,
    end_date,
    status,
    password,
    price,
  } = req.body;

  const insertSql =
    "INSERT INTO batches ( batch_no, batch_name, zoom_link, course_auto_id, start_date, end_date, status, password, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    insertSql,
    [
      batch_no,
      batch_name,
      zoom_link,
      course_auto_id,
      start_date,
      end_date,
      status,
      password,
      price,
    ],
    (err, results) => {
      if (err) {
        const apiResponse = ApiResponse.failure(err);
        return res.json(apiResponse);
      }
      const apiResponse = ApiResponse.success(
        "New batch record has been successfully added."
      );
      res.json(apiResponse);
    }
  );
};

exports.updateBatch = (req, res) => {
  const {
    auto_id,
    batch_no,
    batch_name,
    zoom_link,
    course_auto_id,
    start_date,
    end_date,
    status,
    password,
    price,
  } = req.body;

  const updateSql = `
        UPDATE batches
        SET batch_no = ?, batch_name = ?, zoom_link = ?, course_auto_id = ?, start_date = ?, end_date = ?, status = ?, password = ?, price = ?
        WHERE auto_id = ?;
      `;

  db.query(
    updateSql,
    [
      batch_no,
      batch_name,
      zoom_link,
      course_auto_id,
      start_date,
      end_date,
      status,
      password,
      price,
      auto_id,
    ],
    (err, results) => {
      if (err) {
        const apiResponse = ApiResponse.failure(err);
        return res.json(apiResponse);
      }

      const apiResponse = ApiResponse.success(
        "Batch record has been successfully updated."
      );
      res.json(apiResponse);
    }
  );
};

exports.removeBatch = (req, res) => {
  const auto_id = req.body.id;

  const deleteSql = `
        DELETE FROM batches
        WHERE auto_id = ?;
      `;

  db.query(deleteSql, [auto_id], (err, results) => {
    if (err) {
      const apiResponse = ApiResponse.failure(err);
      return res.json(apiResponse);
    }

    const apiResponse = ApiResponse.success(
      "Batch record has been successfully removed."
    );
    res.json(apiResponse);
  });
};
