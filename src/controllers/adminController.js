const express = require("express");

const adminService = require('../services/adminService')

let adminController = {};

adminController.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await adminService.signIn(email, password);

    res.status(result.status).json({
      message: result.message,
      adminLibraryToken: result.adminToken,
      adminData:result.adminData
    });
  } catch (err) {
    console.error("Error occurred in admin login data", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = adminController