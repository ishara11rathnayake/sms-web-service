const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ");
    const decoded = jwt.verify(token[1], process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    console.log("xxx");
    return res.status(401).json({
      message: "Access denied"
    });
  }
};
