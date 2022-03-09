const multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + "_" + Date.now());
  },
});
exports.upload = multer({ storage: storage });
