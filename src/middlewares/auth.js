const {verifyTokenUser} = require('../config/userAuth');
const User = require('../models/userSchema')


const authProtect = async (req, res,next) => {
  try {

    const token = req.headers.authorization;
    if (!token) {
        console.log('not token')
      return res.status(401).json({ info: "Authorization token is missing" });
    }

    const decoded = verifyTokenUser(token);
    const userId = decoded.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }
 
    req.user = user;
    next();
  } catch (err) {
    console.error("Error verifying user token in middleware:", err);
    return res.status(401).json({ info: "Invalid authorization token" });
  }
};
module.exports = authProtect;
