import { config } from 'dotenv';
import MainContract from "../blockchain/MainContract.js";
import web3 from "../blockchain/web3.js";
import { getOwner } from '../blockchain/methods.js';

const signer = web3.eth.accounts.privateKeyToAccount(process.env.SIGNER_PRIVATE_KEY);
web3.eth.accounts.wallet.add(signer);
const address = signer.address;

config({ path: '../.env' });

import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import passport from 'passport';
// const { authenticate } = passport;
import { forwardAuthenticated } from '../middlewares/Auth/passportAuth.js';
import { StatusCodes } from 'http-status-codes';

import '../middlewares/auth/passportStrategy.js';
// Register User 
export const signup = async (req, res) => {
  const { body } = req;

  try {
    let errors = [];
    if (!user.accountName || !user.name || !user.password || !user.password) {
      errors.push({ msg: 'Please Enter All Fields!!!' });
    }

    if (user.password != user.cpassword) {
      errors.push({ msg: 'Password does not Match!!!' });
    }

    if (user.password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 Characters' });
    }

    if (errors.length > 0) {
      console.log(errors)
      let acname = user.accountName;
      let dname = user.name;
      res.render('register', {
        errors,
        acname,
        dname
      });
    }
    else {
      const userTrue = await MainContract.methods.isApplicant(user.accountName).send({ from: address, gas: "300000" });
      if (userTrue) {
        let acname = user.accountName;
        let dname = user.name;
        errors.push({ msg: 'Email Already Exists!!!' });
        res.render('register', {
          errors,
          acname,
          dname
        });
      }
      else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            // await MainContract.methods.registerApplicant(user.accountName, user.name, user.password).send({ from: address, gas: "300000" });
          });
        });
        return res.json({ messafge: `User Added Successfully` });
      }
    }
  }
  catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Something went wrong while User signup' });
  }
};

// Login
// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/users/login',
//     failureFlash: true
//   })(req, res, next);
// });

// Logout
// router.get('/logout', (req, res) => {
//   req.logout();
//   req.flash('success_msg', 'You are logged out');
//   res.redirect('/users/login');
// });

export const logout = async (req, res) => {
  req.logOut();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/api/login');
  // res
  //   .status(StatusCodes.OK)
  //   .clearCookie('jwt')
  //   .json({ data: 'logged out successfully!' });
};

export const login = async (req, res, next) => {
  console.log("userAuth contrll", req.body)

  await passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/api/login'
    // ,
    // failureFlash: true
  })(req, res, next);

};


export const checkAuth = async (req, res) => {
  res.send({
    isAuthenticated: true
  })
  // res.status(StatusCodes.OK).json({ data: req.user });
};


/*
// Login User

/**
 * @desc    logout user
 * @route   get /api/users/auth/logout
 * @access  private
 

/**
 * @desc    To check authentication status
 * @route   GET /api/users/auth/check-auth
 * @access  private
 

// module.exports = { signup, login, checkAuth, logout };*/