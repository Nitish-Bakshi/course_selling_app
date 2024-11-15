const jwt = require("jsonwebtoken");
const JWT_SECRET_USER = require("../config.js");

function userAuth(req, res, next) {
  const token = req.headers.token;

  const verification = jwt.verify(token, JWT_SECRET_USER);

  if (verification) {
    req.userId = verification.id;
    next();
  } else {
    res.json({
      message: "verification failed",
    });
  }
}
module.exports = {
  userAuth,
};
