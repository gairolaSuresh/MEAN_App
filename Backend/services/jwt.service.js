const jwt = require("jsonwebtoken");

let JwtSign = (payload, cb) => {
  jwt.sign(payload, "secret", { expiresIn: "1d" }, cb);
};

module.exports = JwtSign;
