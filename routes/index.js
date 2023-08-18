const authRouter = require('./auth');
const userRouter = require('./user');
const productRouter = require('./product');
const stripeRouter = require('./stripe')

module.exports = (app, passport) => {
  authRouter(app, passport);
  userRouter(app);
  productRouter(app);
  stripeRouter(app);
}
