const db = require("../config/db");
const ApiResponse = require("../models/api_response");
const { uploadImage } = require("./commonController");

exports.getEvents = (req, res) => {
  const sql = "SELECT * FROM events"; // Update to "events" table
  db.query(sql, (err, results) => {
    if (err) {
      const apiResponse = ApiResponse.failure(err);
      return res.json(apiResponse);
    }

    if (results.length === 0) {
      const apiResponse = ApiResponse.failure(
        "No records found in the table. Please add some events first."
      );
      return res.json(apiResponse);
    }

    const apiResponse = ApiResponse.success(results);
    res.json(apiResponse);
  });
};

exports.addEvent = (req, res) => {
  const { name, description, date, link, image, status } = req.body; // Update field names

  const uploadResponse = uploadImage(req, res);
  console.log("uploadResponse", uploadResponse);
  const insertSql =
    "INSERT INTO events (name, description, date, link, image, status) VALUES (?, ?, ?, ?, ?, ?)"; // Update to "events" table and field names
  db.query(
    insertSql,
    [name, description, date, link, image, status], // Update field names
    (err, results) => {
      if (err) {
        const apiResponse = ApiResponse.failure(err);
        return res.json(apiResponse);
      }

      const apiResponse = ApiResponse.success(
        "New event has been successfully added."
      );
      res.json(apiResponse);
    }
  );
};

exports.updateEvent = (req, res) => {
  const { event_auto_id, name, description, date, link, image, status } =
    req.body; // Update field names
  const updateSql = `
    UPDATE events
    SET name = ?, description = ?, date = ?, link = ?, image = ?, status = ?
    WHERE event_auto_id = ?;
  `;

  db.query(
    updateSql,
    [name, description, date, link, image, status, event_auto_id], // Update field names
    (err, results) => {
      if (err) {
        const apiResponse = ApiResponse.failure(err);
        return res.json(apiResponse);
      }

      const apiResponse = ApiResponse.success(
        "Event record has been successfully updated."
      );
      res.json(apiResponse);
    }
  );
};

exports.removeEvent = (req, res) => {
  const event_auto_id = req.body.id; // Update field name

  const deleteSql = "DELETE FROM events WHERE event_auto_id = ?"; // Update to "events" table and field name

  db.query(deleteSql, [event_auto_id], (err, results) => {
    if (err) {
      const apiResponse = ApiResponse.failure(err);
      return res.json(apiResponse);
    }

    const apiResponse = ApiResponse.success(
      "Event record has been successfully removed."
    );
    res.json(apiResponse);
  });
};
