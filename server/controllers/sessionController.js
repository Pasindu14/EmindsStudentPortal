const db = require("../config/db");
const ApiResponse = require("../models/api_response");
const { uploadImage } = require("./commonController");

exports.getSessions = (req, res) => {
  const sql = `
      SELECT 
        sessions.*, 
        courses.course_name, 
        batches.batch_name
      FROM 
        sessions
      INNER JOIN 
        courses ON sessions.course_auto_id = courses.auto_id
      INNER JOIN 
        batches ON sessions.batch_auto_id = batches.auto_id
    `;

  db.query(sql, (err, results) => {
    if (err) {
      const apiResponse = ApiResponse.failure(err);
      return res.json(apiResponse);
    }

    if (results.length === 0) {
      const apiResponse = ApiResponse.failure(
        "No records found in the table. Please add some sessions first."
      );
      return res.json(apiResponse);
    }

    const apiResponse = ApiResponse.success(results);
    res.json(apiResponse);
  });
};

exports.addSession = async (req, res) => {
  try {
    const {
      batch_auto_id,
      course_auto_id,
      title,
      zoom_link,
      zoom_password,
      slide_extension,
    } = req.body;

    const insertSql =
      "INSERT INTO sessions (batch_auto_id, course_auto_id, title, zoom_link, zoom_password , slide_extension ) VALUES (?,?,?,?,?,?)";
    db.query(
      insertSql,
      [
        batch_auto_id,
        course_auto_id,
        title,
        zoom_link,
        zoom_password,
        slide_extension,
      ],
      (err, results) => {
        if (err) {
          const apiResponse = ApiResponse.failure(err);
          return res.json(apiResponse);
        }
        const apiResponse = ApiResponse.success({
          message: "New session has been successfully added.",
          insertId: results.insertId,
        });
        res.json(apiResponse);
      }
    );
  } catch (error) {
    console.log("An error occurred:", error);
    res.json(error); // Or however y
  }
};

exports.uploadSlideImage = async (req, res) => {
  const uploadResponse = await uploadImage(req, res);
  if (uploadResponse.status === "success") {
    const apiResponse = ApiResponse.success(
      "New session has been successfully added."
    );
    res.json(apiResponse);
  } else {
    const apiResponse = ApiResponse.failure("Error occured while uploading");
    return res.json(apiResponse);
  }
};

exports.updateSession = (req, res) => {
  const { session_auto_id, batch_auto_id, course_auto_id, title } = req.body;
  const updateSql = `
    UPDATE sessions
    SET batch_auto_id = ?, course_auto_id = ?, title = ?
    WHERE session_auto_id = ?;
  `;
  db.query(
    updateSql,
    [batch_auto_id, course_auto_id, title, session_auto_id],
    (err, results) => {
      if (err) {
        const apiResponse = ApiResponse.failure(err);
        return res.json(apiResponse);
      }

      const apiResponse = ApiResponse.success(
        "Session record has been successfully updated."
      );
      res.json(apiResponse);
    }
  );
};

exports.removeSession = (req, res) => {
  const session_auto_id = req.body.id;

  const deleteSql = "DELETE FROM sessions WHERE session_auto_id = ?";

  db.query(deleteSql, [session_auto_id], (err, results) => {
    if (err) {
      const apiResponse = ApiResponse.failure(err);
      return res.json(apiResponse);
    }

    const apiResponse = ApiResponse.success(
      "Session record has been successfully removed."
    );
    res.json(apiResponse);
  });
};
