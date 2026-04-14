const bcrypt = require("bcrypt");

class HashProvider {
  async hash(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async compare(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }
}
module.exports = HashProvider;
