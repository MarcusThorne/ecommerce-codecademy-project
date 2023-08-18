const express = require('express');
const router = express.Router();

// Instantiate Services
const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();

module.exports = (app, passport) => {

  app.use('/auth', router);

  // Registration Endpoint
  router.post('/register', async (req, res, next) => {
    try {
      const data = req.body;

      const response = await AuthServiceInstance.register(data);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }

  });

  // Login Endpoint
  router.post('/login', async (req, res, next) => {
    console.log('login route started')
    try {
      const { email, password } = req.body;

      const response = await AuthServiceInstance.login({ email, password });

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  });
}
