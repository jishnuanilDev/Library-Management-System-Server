const { GenerateTokenAdmin } = require("../config/adminAuth");
require('dotenv').config();

let adminService = {};
const credentials = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASS,
};

adminService.signIn = async (email, password) => {
  try {
    if (credentials.email !== email) {
      return { status: 400, message: "Invalid email" };
    }
    if (credentials.password !== password) {
      return { status: 400, message: "Invalid password" };
    }

    const adminToken = await GenerateTokenAdmin(email);
    if (!adminToken) {
      return { status: 500, message: "Token generation failed" };
    }

    return {
      status: 200,
      message: "Login successful",
      adminToken,
      adminData: { adminEmail: credentials.email },
    };
  } catch (error) {
    console.error("Admin sign-in error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
};

module.exports = adminService;
