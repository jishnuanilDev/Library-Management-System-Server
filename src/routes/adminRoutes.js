const express = require('express');
const adminRouter = express.Router();
const bookController = require('../controllers/bookController');
const authProtect = require('../middlewares/auth');
const adminController = require('../controllers/adminController')
adminRouter.post('/sign-in',adminController.signIn);

module.exports = adminRouter;