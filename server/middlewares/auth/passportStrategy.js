import { config } from 'dotenv';
import MainContract from "../../blockchain/MainContract.js";
import web3 from "../../blockchain/web3.js";

const signer = web3.eth.accounts.privateKeyToAccount(process.env.SIGNER_PRIVATE_KEY);
web3.eth.accounts.wallet.add(signer);
const address = signer.address;

config({ path: '../../.env' });

import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import passport from 'passport';
import { StatusCodes } from 'http-status-codes';
import passportLocal from 'passport-local';
// import LocalStrategy from 'passport-local'.Strategy;

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Check for exisiting user
      const data = await MainContract.methods.getUser(email).call();
      if (data.profile == 1) {
        return done(null, false, { message: 'This Email is not Registered!!!' });
      }
      else {
        // Match password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            const pwd = hash;
            const user =  MainContract.methods.login(email, pwd).send({ from: address, gas: "300000" });
            if(MainContract.methods.isApplicant(user).call()) {
              return done(null, user);
            } 
            else {
              return done(null, false, { message: 'Password is not Correct!!!' });
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