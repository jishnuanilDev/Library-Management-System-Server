const bcrypt = require("bcrypt");  
const User  = require('../models/userSchema');
const {GenerateTokenUser} = require('../config/userAuth');
const userController = require("../controllers/userController");
let userService = {};

userService.signIn = async (email, password) => {
  try {
   
    const user = await User.findOne({ email });
    if (!user) {
      return { status: 400, message: "Inavlid Credentials", userToken: "" };
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return { status: 400, message: "Inavlid Credentials" };
    }

    const userToken = await GenerateTokenUser(user._id);
    if (!userToken) {
      console.log("no user token get in user sign in service");
    }
    const userData = {userId:user._id, email: user.email, username: user.username };
    return {
      status: 200,
      message: "Login successful",
      userToken: userToken,
      userData: userData,
    };
  } catch (err) {
    console.error(
      "Error occured in login admin in sign in controller",
      err.message
    );
    res
      .status(500)
      .json({ info: "An error login admin in sign in controller " });
  }
};






userService.signUp = async (username,email,password) => {
  try {

    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return { status: 409, message: "Email already exists " };
    }
    const UserUserName = await User.findOne({ username });
    if (UserUserName) {
      return { status: 409, message: "Username already exists " };
    }
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);


    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return { status: 201,message:'Successfully signed Up , Please Login' ,success: true };
  } catch (err) {
    console.error(
      "Error occured in sign up admin in sign in user service",
      err.message
    );
    res.status(500).json({ info: "An error sign up user in user service " });
  }

  }

  userService.fetchUsers = async () => {
    try {
     
      const users = await User.find({});
      if (!users) {
        return { status: 400, message: "Users not found ", userToken: "" };
      }
   
      return {
        status: 200,
        users: users,
      };
    } catch (err) {
      console.error(
        "Error occured in login admin in fetch users controller",
        err.message
      );
      res
        .status(500)
        .json({ info: "An error login admin in fetch users controller " });
    }
  };


  
  userService.updateProfile = async (username,email,userId) => {
    try {
     
      const user = await User.findById(userId);
      if (!user) {
        return { status: 404, message: "User not found " };
      }
      user.username = username;
      user.email = email;
      await user.save();
      const userData = {userId:user._id, email: user.email, username: user.username };
      return { status: 200, message: "Profile updated successfully" , userData:userData};
    } catch (err) {
      console.error(
        "Error occured in login admin in fetch users controller",
        err.message
      );
      res
        .status(500)
        .json({ info: "An error login admin in fetch users controller " });
    }
  };



module.exports = userService;