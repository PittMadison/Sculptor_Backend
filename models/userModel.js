const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateUser: {
    type: Date,
    default: Date.now(),
  }
},{ 
    timestamps: true,
})

userSchema.pre("save", function(next) {
    var user = this;
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(12, function(err, salt) {
        if (err) {
          return next(err);
        }
        bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) {
            return next(err);
          }
          user.password = hash;
          next();
        });
      });
    } else {
      return next();
    }
  });

const user = mongoose.model('users', userSchema, 'userInfo');

module.exports = user;