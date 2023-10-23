// File: controllers/uploadController.js

const multer = require("multer");
const ApiResponse = require("../models/api_response"); // Please adjust the path

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { type } = req.body;
    if (type == "event") {
      cb(null, "./uploads/events");
    } else {
      cb(null, "./uploads");
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const upload = multer({ storage: storage });

exports.uploadImage = (req, res) => {
  upload.single("myFile")(req, res, (err) => {
    if (err) {
      const apiResponse = ApiResponse.failure(err.message);
      return res.json(apiResponse);
    }

    if (!req.file) {
      const apiResponse = ApiResponse.failure("No file uploaded");
      return res.json(apiResponse);
    }

    const file = req.file; // The file information is stored in req.file

    // Optionally, you might want to rename, move, or process the file in some way

    const apiResponse = ApiResponse.success({
      filename: file.filename,
      path: file.path,
    });
    res.json(apiResponse);
  });
};
