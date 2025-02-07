const express = require("express");
const userService = require("../services/userService");


let userController = {};

userController.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await userService.signIn(email, password);

    res.status(result.status).json({
      message: result.message,
      userLibraryToken: result.userToken,
      userData:result.userData
    });
  } catch (err) {
    console.error("Error occurred in login data", err);
    res.status(500).json({ message: "Internal server error" });
  }
};




userController.signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const result = await userService.signUp(username,email,password);

    res.status(result.status).json({
      message: result.message,
      success: result.success,
    });
  } catch (err) {
    console.error("Error occurred in sign up data", err);
    res.status(500).json({ message: "Internal server error" });
  }
};



userController.fetchUsers = async (req, res) => {
  try {

    const result = await userService.fetchUsers();

    res.status(result.status).json({
      users:result.users,
      success: result.success,
    });
  } catch (err) {
    console.error("Error occurred in fetch users data", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

userController.updateProfile = async (req, res) => {
  try {
const {username,email} = req.body;
const user = req.user
    const result = await userService.updateProfile(username,email,user._id);

    res.status(result.status).json({
      userData:result.userData,
      message:result.message,
      success: result.success,
    });
  } catch (err) {
    console.error("Error occurred in fetch users data", err);
    res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = userController
