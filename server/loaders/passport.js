const passport = require('passport');
const LocalStrategy = require('passport-local');

const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();

const UserModel = require('../model/user');
const UserModelInstance = new UserModel();

module.exports = (app) => {

  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Set method to serialize data to store in cookie
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Set method to deserialize data stored in cookie and attach to req.user
  passport.deserializeUser((id, done) => {
    User.findOneById({id}, (err, user) => {
      cb(err, user)
    })
  });

  // Configure local strategy to be use for local login
  passport.use(new LocalStrategy(
    async (email, password, done) => {
      try {
        console.log('is passport local working?')
        const user = await UserModelInstance.login({ email, password });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));

  return passport;

}
