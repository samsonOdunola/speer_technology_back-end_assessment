const response = require('../utils/response');
const {verifyUser} = require('../utils/authentication');

const authUser = async (req, res, next) => {
  try {
    const {authorization} = req.headers;

    if (!authorization) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false,
        message: 'Unauthorised Access',
        error: 'Error',
      });
    }
    const token = authorization.split(' ')[1];
    const bearer = authorization.split(' ')[0];

    if (bearer !== 'Bearer') {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false,
        message: 'Unauthorised Access',
        error: 'Error',
      });
    }

    const userInfo = await verifyUser(token);

    if (!userInfo) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false,
        message: 'Unauthorised Access',
        error: 'Invalid Token',
      });
    }
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false,
      message: 'Authorization error',
      error: err.message,
    });
  }
  next();
};

module.exports = authUser;
