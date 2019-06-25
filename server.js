const express = require('express');
const connectDB = require('./db');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const config = require('config');

connectDB();

app.use(
  cookieSession({
    keys: [config.get('cookieKey')],
    maxAge: 24 * 60 * 60 * 1000
  })
);

app.use(
  cors({
    origin: 'http://localhost:3000', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // allow session cookie from browser to pass through
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Auth API');
});
app.use('/auth', require('./routes/auth-routes'));

app.listen(4000, () => {
  console.log('Server running on PORT 4000');
});
