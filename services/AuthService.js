const createError = require('http-errors');
const UserModel = require('../model/user');
const UserModelInstance = new UserModel();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = class AuthService {

  async register(data) {

    const { email, password } = data;

    try {
      // Check if user already exists
      const user = await UserModelInstance.findOneByEmail(email);

      // If user already exists, reject
      if (user) {
        res.status(409).json({ detail: 'Email already in use' })
        throw createError(409, 'Email already in use');
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      const token = jwt.sign({ email }, 'secret', { expiresIn: '48hr' })

      // User doesn't exist, create new user record
      await UserModelInstance.create({email, password: hashedPassword});
      const addedUser = await UserModelInstance.findOneByEmail(email);

      return {
        token, data: {
          id: addedUser.id,
          email
        }
      };

    } catch (err) {
      throw createError(500, err);
    }

  };

  async login(data) {

    const { email, password } = data;

    try {
      // Check if user exists
      const user = await UserModelInstance.findOneByEmail(email);

      // If no user found, reject
      if (!user) {
        return {detail: 'Incorrect username or password'}
      }

      const token = jwt.sign({ email }, 'secret', { expiresIn: '48hr' })
      const comparePasswords = await bcrypt.compare(password, user.password)

      // Check for matching passwords
      if (!comparePasswords) {
        return { detail: 'Incorrect username or password' }
      }

      return {token, data: {
        id: user.id,
        email
      }};

    } catch (err) {
      throw createError(500, err);
    }

  };

}
