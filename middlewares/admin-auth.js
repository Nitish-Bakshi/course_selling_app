const jwt = require("jsonwebtoken");
const JWT_SECRET_ADMIN = "hhihisdcsdic";

function adminAuth(req, res, next) {
  const token = req.headers.token;

  const verification = jwt.verify(token, JWT_SECRET_ADMIN);

  if (verification) {
    req.adminId = verification.id;
    next();
  } else {
    res.json({
      message: "verification failed",
    });
  }
}
module.exports = {
  adminAuth,
};
