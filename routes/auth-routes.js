const router = require('express').Router();
const passport = require('passport');
const passportConfig = require('../passport-config');
const authCheck = require('../utils/authCheck');

// Main route to check authentication in client
router.get('/', authCheck, (req, res) => {
  if (!req.user) {
    return res.json({
      isAuthenticated: false,
      msg: 'User not Authenticated'
    });
  }
  return res.json({
    isAuthenticated: true,
    user: req.user,
    msg: 'User Authenticated'
  });
});

//login success
router.get('/login/success', (req, res) => {
  console.log(req.cookies);
  if (req.user) {
    res.json({
      isAuthenticated: true,
      user: req.user,
      msg: 'User has successfully authenticated'
    });
  }
});

//logout
router.get('/logout', (req, res) => {
  req.logout();
  res.json({
    isAuthenticated: false,
    msg: 'User logged out'
  });
});

//login fail
router.get('/login/failed', (req, res) => {
  if (req.user) {
    res.json({
      isAuthenticated: false,
      user: null,
      msg: 'User has failed authentication'
    });
  }
});

//For Facebook
router.get('/facebook', passport.authenticate('facebook'));

router.get(
  '/facebook/redirect',
  passport.authenticate('facebook', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: 'http://localhost:4000/auth/login/failed'
  })
);

//For Twitter
router.get('/twitter', passport.authenticate('twitter'));

router.get(
  '/twitter/redirect',
  passport.authenticate('twitter', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: 'http://localhost:4000/auth/login/failed'
  })
);
//For github

router.get('/github', passport.authenticate('github'));

router.get(
  '/github/redirect',
  passport.authenticate('github', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: 'http://localhost:4000/auth/login/failed'
  })
);
//For google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);

router.get(
  '/google/redirect',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: 'http://localhost:4000/auth/login/failed'
  })
);
module.exports = router;
