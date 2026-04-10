const bcrypt = require("bcrypt");

class HashProvider {
  async hash(password) {
    const hashedPassword = await bcrypt.hash(password);
    return hashedPassword;
  }

  async compare(oldPassword, hashedPassword) {
    const isMatch = await bcrypt.compare(oldPassword, hashedPassword);
    return isMatch;
  }
}
module.exports = HashProvider;
