const db = require("../config/db");
const ApiResponse = require("../models/api_response");

exports.getJobs = (req, res) => {
  const sql = `
      SELECT 
        jobs.* 
      FROM 
        jobs
    `;

  db.query(sql, (err, results) => {
    if (err) {
      const apiResponse = ApiResponse.failure(err);
      return res.json(apiResponse);
    }

    if (results.length === 0) {
      const apiResponse = ApiResponse.failure(
        "No records found in the table. Please add some jobs first."
      );
      return res.json(apiResponse);
    }

    const apiResponse = ApiResponse.success(results);
    res.json(apiResponse);
  });
};

exports.addJob = (req, res) => {
  const { title, expire_date, link, status } = req.body;

  const insertSql = `
    INSERT INTO jobs (title, expire_date, link, status) 
    VALUES (?, ?, ?, ?)
  `;

  db.query(insertSql, [title, expire_date, link, status], (err, results) => {
    if (err) {
      const apiResponse = ApiResponse.failure(err);
      return res.json(apiResponse);
    }

    const apiResponse = ApiResponse.success(
      "New job has been successfully added."
    );
    res.json(apiResponse);
  });
};

exports.updateJob = (req, res) => {
  const { job_auto_id, title, expire_date, link, status } = req.body;

  const updateSql = `
    UPDATE jobs
    SET title = ?, expire_date = ?, link = ?, status = ?
    WHERE job_auto_id = ?
  `;

  db.query(
    updateSql,
    [title, expire_date, link, status, job_auto_id],
    (err, results) => {
      if (err) {
        const apiResponse = ApiResponse.failure(err);
        return res.json(apiResponse);
      }

      const apiResponse = ApiResponse.success(
        "Job record has been successfully updated."
      );
      res.json(apiResponse);
    }
  );
};

exports.removeJob = (req, res) => {
  const job_auto_id = req.body.id;

  const deleteSql = "DELETE FROM jobs WHERE job_auto_id = ?";

  db.query(deleteSql, [job_auto_id], (err, results) => {
    if (err) {
      const apiResponse = ApiResponse.failure(err);
      return res.json(apiResponse);
    }

    const apiResponse = ApiResponse.success(
      "Job record has been successfully removed."
    );
    res.json(apiResponse);
  });
};
