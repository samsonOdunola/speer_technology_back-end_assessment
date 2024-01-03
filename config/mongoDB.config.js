/* eslint-disable max-len */
const mongoose = require('mongoose');
const DBURL = process.env.DBURL;
require('dotenv').config();


const database = () => {
  const options = {
    autoIndex: true, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    minPoolSize: 5,
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,

    // textSearchEnabled: true,

  };

  mongoose.connect(DBURL, options);

  const db = mongoose.connection;
  db.on('error', (err) => {
    console.error('Error connecting to database.', err);
  });
  db.once('connected', () => {
    console.log('Database Connection is Successful');
  });
  db.once('disconnected', () => {
    console.info('Database Disconnected');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close((err) => {
      console.info('Database Connection Closed Due to App Termination');
      process.exit(err ? 1 : 0);
    });
  });
};

module.exports = database;
