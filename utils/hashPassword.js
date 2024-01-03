const bcrypt = require('bcrypt');

const hashPassword = async (myPlaintextPassword) => {
  const saltRounds = 10;

  return bcrypt.hash(myPlaintextPassword, saltRounds).then((hash) => hash);
};

// eslint-disable-next-line arrow-body-style
const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash).then((result) => result);
};

module.exports = {hashPassword, comparePassword};
