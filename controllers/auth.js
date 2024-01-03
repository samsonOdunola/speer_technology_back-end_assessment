const UserModel = require('../models/user');
const response = require('../utils/response');
const {hashPassword, comparePassword} = require('../utils/hashPassword');
const {signUser} = require('../utils/authentication');
const signUp = async (req, res) => {
  let user;
  try {
    const passwordHash = await hashPassword(req.body.password);
    user = new UserModel({...req.body, password: passwordHash});
    await user.save();
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false,
      message: 'Error in creating user',
      error: err.message,
      data: {},
    });
  }
  return res.status(response.CREATED).json({
    success: true,
    message: 'User created successfully',
    data: user,
  });
};
const signIn = async (req, res) => {
  let user;
  let token;
  try {
    const {email, password} = req.body;
    user = await UserModel.findOne({email});

    if (!user) {
      return res.status(response.BAD_REQUEST).json({
        success: false,
        message: 'user does not exist',
        error: 'error',
        data: {},
      });
    }

    const isPassword = await comparePassword(password, user.password);

    if (!isPassword) {
      return res.status(response.BAD_REQUEST).json({
        success: false,
        message: 'email or password is incorrect',
        error: 'error',
        data: {},
      });
    }
    token = await signUser(user);
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false,
      message: 'Error in sigin user',
      error: err,
      data: {},
    });
  }
  return res.status(response.CREATED).json({
    success: true,
    message: 'Login Successfull',
    data: user,
    token,
  });
};

module.exports = {signUp, signIn};
