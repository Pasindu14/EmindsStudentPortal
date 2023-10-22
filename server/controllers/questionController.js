// File: controllers/questionController.js

const db = require("../config/db");
const ApiResponse = require("../models/api_response");

exports.getQuestions = (req, res) => {
  const sql = `
    SELECT 
      questions.*, 
      courses.course_code, 
      batches.batch_no,
      exams.exam_code
    FROM 
      questions
    INNER JOIN 
      courses ON questions.course_code = courses.auto_id
    INNER JOIN 
      batches ON questions.batch_code = batches.auto_id
    INNER JOIN 
      exams ON questions.exam_code = exams.exam_auto_id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      const apiResponse = ApiResponse.failure(err);
      return res.json(apiResponse);
    }

    if (results.length === 0) {
      const apiResponse = ApiResponse.failure(
        "No records found in the table. Please add some questions first."
      );
      return res.json(apiResponse);
    }

    const apiResponse = ApiResponse.success(results);
    res.json(apiResponse);
  });
};

exports.addQuestion = (req, res) => {
  const {
    course_code,
    batch_code,
    exam_code,
    question,
    answer_01,
    answer_02,
    answer_03,
    answer_04,
    correct_answer,
  } = req.body;

  const insertSql = `
    INSERT INTO questions (course_code, batch_code, exam_code, question, answer_01, answer_02, answer_03, answer_04, correct_answer) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    insertSql,
    [
      course_code,
      batch_code,
      exam_code,
      question,
      answer_01,
      answer_02,
      answer_03,
      answer_04,
      correct_answer,
    ],
    (err, results) => {
      if (err) {
        const apiResponse = ApiResponse.failure(err);
        return res.json(apiResponse);
      }

      const apiResponse = ApiResponse.success(
        "New question has been successfully added."
      );
      res.json(apiResponse);
    }
  );
};

exports.updateQuestion = (req, res) => {
  const {
    question_auto_id,
    course_code,
    batch_code,
    exam_code,
    question,
    answer_01,
    answer_02,
    answer_03,
    answer_04,
    correct_answer,
  } = req.body;

  const updateSql = `
    UPDATE questions
    SET course_code = ?, batch_code = ?, exam_code = ?, question = ?, answer_01 = ?, answer_02 = ?, answer_03 = ?, answer_04 = ?, correct_answer = ?
    WHERE question_auto_id = ?;
  `;
  db.query(
    updateSql,
    [
      course_code,
      batch_code,
      exam_code,
      question,
      answer_01,
      answer_02,
      answer_03,
      answer_04,
      correct_answer,
      question_auto_id,
    ],
    (err, results) => {
      if (err) {
        const apiResponse = ApiResponse.failure(err);
        return res.json(apiResponse);
      }

      const apiResponse = ApiResponse.success(
        "Question record has been successfully updated."
      );
      res.json(apiResponse);
    }
  );
};

exports.removeQuestion = (req, res) => {
  const question_auto_id = req.body.id;

  const deleteSql = "DELETE FROM questions WHERE question_auto_id = ?";

  db.query(deleteSql, [question_auto_id], (err, results) => {
    if (err) {
      const apiResponse = ApiResponse.failure(err);
      return res.json(apiResponse);
    }

    const apiResponse = ApiResponse.success(
      "Question record has been successfully removed."
    );
    res.json(apiResponse);
  });
};
