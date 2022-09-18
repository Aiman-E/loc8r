const mongoose = require('mongoose');

const dbURL = 'mongodb://localhost/Loc8r';
mongoose.connect(dbURL, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURL}`);
});
mongoose.connection.on('disconnected', () => {
  console.log(`Mongoose is disconnected`);
});
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose disconnected through ${err}`);
});

const gracefullShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

// Nodemon
process.once('SIGUSR2', () => {
  gracefullShutdown('Nodemon restart!', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// Terminal
process.on('SIGINT', () => {
  gracefullShutdown('App termination', () => {
    process.exit(0);
  });
});
// Heroku
process.on('SIGTERM', () => {
  gracefullShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});

require('./locations');
