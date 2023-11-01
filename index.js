const express = require('express');
const app = express();
require('dotenv').config

const loaders = require('./loaders');

const PORT = process.env.PORT || 4000

async function startServer() {

  // Init application loaders
  loaders(app);

  // Start server
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  })

  app.use(express.static(path.join(__dirname, 'client/public')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/public/index.html'))
  });
}

startServer();
