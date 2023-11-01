const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const { SESSION_SECRET } = require('../config');
const cookieParser = require('cookie-parser')

module.exports = (app) => {

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  }));

  // Transforms raw string of req.body into JSON
  app.use(bodyParser.json());

  // Parses urlencoded bodies
  app.use(bodyParser.urlencoded({ extended: true }));

  //
  app.set('trust proxy', 1);

  // Cookie parser
  app.use(cookieParser(SESSION_SECRET))

  // app.use((req, res, next) => {
  //   res.setHeader("Access-Control-Allow-Credentials", "true");
  // })

  // Creates a session
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
      }
    })
  );

  return app;

}
