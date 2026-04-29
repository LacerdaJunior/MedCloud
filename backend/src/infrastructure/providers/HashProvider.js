const bcrypt = require("bcrypt");

class HashProvider {
  async hash(password) {
    const saltRounds = process.env.NODE_ENV === "test" ? 1 : 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async compare(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }
}
module.exports = HashProvider;
