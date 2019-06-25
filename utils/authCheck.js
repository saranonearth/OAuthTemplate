const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      isAuthenticated: false,
      msg: 'User is not authenticated'
    });
  } else {
    next();
  }
};

module.exports = authCheck;
