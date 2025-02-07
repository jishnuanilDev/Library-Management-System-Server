const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const authProtect = require('../middlewares/auth');
userRouter.post('/sign-in',userController.signIn);
userRouter.post('/sign-up',userController.signUp);
userRouter.get('/fetch-users',userController.fetchUsers);
userRouter.put('/update-profile',authProtect,userController.updateProfile);

module.exports = userRouter;