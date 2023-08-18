const createError = require('http-errors');
const UserModel = require('../model/user');
const UserModelInstance = new UserModel();


module.exports = class AuthService {
  async get(id) {
    try {
      const user = await UserModelInstance.findOneById(id)

      if (!user) {
        res.status(401).json({ detail: 'No user with provided ID' })
        throw createError(401, 'No user with provided ID');
      }

      return {
        message: 'User succefully fetched',
        data: {
          ...user,
          password: null
        }
      }

    } catch (err) {
      throw createError(500, err);
    }
  };


  async update(data) {
    try {
      const user = await UserModelInstance.findOneById(data.id)

      if (!user) {
        res.status(401).json({ detail: 'No user with provided ID' })
        throw createError(401, 'No user with provided ID');
      }

      const updatedUser = await UserModelInstance.update(data)
      console.log('return from await model instance is ' + updatedUser)

      return {
        message: 'User succefully updated',
        data: user
      }

    } catch (err) {
      throw createError(500, err);
    }

  };
}
