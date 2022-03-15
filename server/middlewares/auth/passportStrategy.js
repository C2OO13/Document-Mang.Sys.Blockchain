import { config } from 'dotenv';
import MainContract from "./MainContract.js";
import web3 from "./web3.js";

const signer = web3.eth.accounts.privateKeyToAccount(process.env.SIGNER_PRIVATE_KEY);
web3.eth.accounts.wallet.add(signer);
const address = signer.address;

config({ path: '../.env' });

const express = require('express');
// const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// const { forwardAuthenticated } = require('../middlewares/passportAuth');
const { StatusCodes } = require('http-status-codes');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Check for exisiting user
      if (!MainContract.methods.isApplicant(email).call()) {
        return done(null, false, { message: 'This Email is not registered' });
      }
      else {
        // Match password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            let pwd = hash;
            let user = await MainContract.methods.login(email, pwd).send({ from: address, gas: "300000" });
            if(MainContract.methods.isApplicant(user).call()) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        });
      };
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};