const multer = require("multer");

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

module.exports = upload;
