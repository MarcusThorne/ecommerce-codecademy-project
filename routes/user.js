const express = require('express');
const router = express.Router();

const UserService = require('../services/UserService');
const UserServiceInstance = new UserService();

module.exports = (app) => {

  app.use('/users', router);

  router.get('/:userId', async (req, res, next) => {

    try {
      const { userId } = req.params;

      const response = await UserServiceInstance.get(userId);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  });

  router.put('/:userId', async (req, res, next) => {
    try {
      const response = await UserServiceInstance.update(req.body.updateInfo);
      console.log(response)
      res.status(200).json(response);

    } catch (err) {
      next(err);
    }
  });

}
