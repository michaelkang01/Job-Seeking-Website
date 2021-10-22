const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;
const API_PORT = process.env.API_PORT;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

module.exports = async (UserModel, passport) => {
  passport.use(
    "google-login",
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `${BASE_URL}:${API_PORT}/api/user/auth/google_callback`,
        passReqToCallback: true,
      },
      function (request, accessToken, refreshToken, profile, done) {
        UserModel.findOne(
          { email: profile.emails[0].value },
          function (err, user) {
            if (err) {
              return done(err);
            }

            if (!user) {
              UserModel.create(
                {
                  email: profile.emails[0].value,
                  firstName: profile.name.givenName,
                  lastName: profile.name.familyName,
                  password: "",
                  metadata: [],
                },
                function (err, user) {
                  return done(err, user);
                }
              );
            } else {
              return done(err, user);
            }
          }
        );
      }
    )
  );
};
