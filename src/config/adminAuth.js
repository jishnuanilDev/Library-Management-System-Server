require('dotenv').config();
const JWT = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const GenerateTokenAdmin = (email) => {
    return JWT.sign({ email }, process.env.JWT_SECRET, { expiresIn: "5d" });
  };
  
const verifyTokenAdmin = (token) => {
  try {
    return JWT.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = { GenerateTokenAdmin, verifyTokenAdmin };
