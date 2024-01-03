const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
      firstName: {
        type: String,
        required: true,
      },

      lastName: {
        type: String,
      },

      userName: {
        type: String,
      },

      email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
      },

      password: {
        type: String,
      },

    },
    {timestamps: true},
);


const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
