// File: controllers/uploadController.js

const multer = require("multer");
const ApiResponse = require("../models/api_response"); // Please adjust the path
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { type, lastInsertedId } = req.body;

    if (type == "event") {
      cb(null, "./uploads/events");
    } else if (type == "slide") {
      cb(null, "./uploads/slides");
    } else {
      cb(null, "./uploads");
    }
  },
  filename: (req, file, cb) => {
    const { type, lastInsertedId } = req.body;
    if (type === "slide") {
      cb(null, lastInsertedId + "." + file.originalname.split(".").pop());
    } else {
      cb(null, uuidv4() + "." + file.originalname.split(".").pop());
    }
  },
});

const upload = multer({ storage: storage });

exports.uploadImage = (req, res) => {
  return new Promise((resolve, reject) => {
    upload.single("imageFile")(req, res, (err) => {
      if (err) {
        const apiResponse = ApiResponse.failure(err.message);
        reject(apiResponse);
        return;
      }

      if (!req.file) {
        const apiResponse = ApiResponse.success();
        resolve(apiResponse);
        return;
      }

      const file = req.file;
      const apiResponse = ApiResponse.success({
        filename: file.filename,
        path: file.path,
      });
      resolve(apiResponse);
    });
  });
};
