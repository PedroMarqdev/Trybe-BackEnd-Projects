const { StatusCodes } = require('http-status-codes');

const verifyAdminMiddleware = async (req, res, next) => {
  if (req.user.role === 'admin') return next();
res.status(StatusCodes.FORBIDDEN).send({ message: 'Only admins can register new admins' }); 
};

module.exports = verifyAdminMiddleware;
