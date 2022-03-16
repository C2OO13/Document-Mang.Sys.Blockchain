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
import LocalStrategy from 'passport-local'

export const passportStrategy = async( req, res, next)=> {
    // const accName = req.body.accName;
    // const password = req.body.password;
    
    console.log("asdsdasdasd" , req.body);
    passport.use( new passportLocal.Strategy({ usernameField: 'accName' }, async (accName, password, done) => {
        // Check for exisiting user
      console.log("asdasdasdasdasdsdasdas")
        console.log(accName)
      console.log(password)
        try {
          const data = await MainContract.methods.isApplicant(accName).call();
          console.log("Data here", data);
          if (data == false) {
          return done(null, false, { message: 'This Email is not Registered!!!' });
        }
        else {

          const user =  await MainContract.methods.login(accName, password).call();
          console.log('User here', user)  
          if(user == true) {
            return done(null, user);
          } 
          else {
            return done(null, false, { message: 'Password is not Correct!!!' });
          }

          {
          // Match password
          // bcrypt.genSalt(10, (err, salt) => {
          //   bcrypt.hash(password, salt, (err, hash) => {
          //     if (err) throw err;
          //     const pwd = hash;
          //     const user =  await MainContract.methods.login(email, pwd).send({ from: address, gas: "300000" });
          //     if(MainContract.methods.isApplicant(user).call()) {
          //       return done(null, user);
          //     } 
          //     else {
          //       return done(null, false, { message: 'Password is not Correct!!!' });
          //     }
          //   });
          // });
          }
        };
      }
      catch (error) {
        done(error)
      }
    }));

    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(null, user);
      });
});
}
