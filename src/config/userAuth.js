require('dotenv').config();
const JWT = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const GenerateTokenUser = (id) => {
  return JWT.sign({ userId: id.toString() }, JWT_SECRET, { expiresIn: "5d" });
};

const verifyTokenUser = (token) => {
  try {
    return JWT.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = { GenerateTokenUser, verifyTokenUser };
