const mongoose = require('mongoose');
const http = require('http');
const config = require('./config/config');
const app = require('./server');
mongoose
  .connect(config.dbConnection)
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((err) => {
    console.error(err);
  });

const httpServer = http.createServer(app);
const server = httpServer.listen(config.port, () => {
  console.log(`server listening on port ${config.port}`);
});
const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};
const unExpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
};

process.on('uncaughtException', unExpectedErrorHandler);
process.on('unhandledRejection', unExpectedErrorHandler);
process.on('SIGTERM', () => {
  console.log('SIGTERM recieved');
  if (server) {
    server.close();
  }
});
