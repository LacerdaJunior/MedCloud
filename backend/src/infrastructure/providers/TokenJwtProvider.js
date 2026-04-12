const jwt = require("jsonwebtoken");

class TokenJwtProvider {
  generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
  }
}
module.exports = TokenJwtProvider;
