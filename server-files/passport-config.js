const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('./models/user');
const config = require('config');
const clientId = config.get('ClientID');
const clientSecret = config.get('clientSecret');
const GithubStrategy = require('passport-github');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      if (user) {
        done(null, user);
      }
    })
    .catch(e => {
      done(new Error('Failed to deserialize an user'));
    });
});
//Github Strategy

passport.use(
  new GithubStrategy(
    {
      clientID: config.get('GITClientId'),
      clientSecret: config.get('GITClientSecret'),
      callbackURL: '/auth/github/redirect'
    },
    async (accessToken, refresToken, profile, done) => {
      console.log(profile);
    }
  )
);
//Google Strategy
passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/github/redirect ',
      clientID: clientId,
      clientSecret: clientSecret
    },
    async (accessToken, refresToken, profile, done) => {
      console.log('Passport call back');

      let user = await User.findOne({ keyId: profile.id });

      if (!user) {
        const newuser = await new User({
          keyId: profile.id,
          name: profile.displayName
        });
        await newuser.save();
        done(null, newuser);
      }

      done(null, user);
    }
  )
);
