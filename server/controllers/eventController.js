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

exports.addEvent = async (req, res) => {
  try {
    const uploadResponse = await uploadImage(req, res);
    if (uploadResponse.status === "success") {
      const image = uploadResponse.data.filename;
      const { name, description, date, link, status } = req.body; // Update field names
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
    } else {
      res.json(uploadResponse);
    }
  } catch (error) {
    console.log("An error occurred:", error);
    res.json(error); // Or however y
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const uploadResponse = await uploadImage(req, res);
    if (uploadResponse.status === "success") {
      const imageExist = uploadResponse.data == null ? false : true;

      let image = "";
      if (imageExist) {
        image = uploadResponse.data.filename;
      }
      const { event_auto_id, name, description, date, link, status } = req.body; // Update field names
      const updateSql =
        imageExist === true
          ? `
      UPDATE events
      SET name = ?, description = ?, date = ?, link = ?, image = ?, status = ?
      WHERE event_auto_id = ?;
    `
          : `
    UPDATE events
    SET name = ?, description = ?, date = ?, link = ?, status = ?
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
    } else {
      res.json(uploadResponse);
    }
  } catch (error) {
    console.log("An error occurred:", error);
    res.json(error);
  }
};

exports.removeEvent = (req, res) => {
  const event_auto_id = req.body.id; // Update field name
  console.log("first", event_auto_id);
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
