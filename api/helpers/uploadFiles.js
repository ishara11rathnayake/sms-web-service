const multer = require("multer");
const multerGoogleStorage = require("multer-google-storage");

const storage = multerGoogleStorage.storageEngine({
  filename: function(req, file, cb) {
    cb(null, "profile/" + Date.now() + file.originalname);
  },
  bucket: "sms_bucket",
  projectId: "sms-311",
  keyFilename: "./api/helpers/sms-311-635c2061dd69.json",
  acl: "publicread",
  contentType: function(req, file) {
    return file.mimetype;
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  }
}).single("profleImage");

module.exports.upload = upload;
