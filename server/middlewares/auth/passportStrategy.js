import { config } from 'dotenv'
import MainContract from '../../blockchain/MainContract.js'
import web3 from '../../blockchain/web3.js'

const signer = web3.eth.accounts.privateKeyToAccount(
  process.env.SIGNER_PRIVATE_KEY
)
web3.eth.accounts.wallet.add(signer)
const address = signer.address

config({ path: '../../.env' })

import express from 'express'
const router = express.Router()
import bcrypt from 'bcryptjs'
import passport from 'passport'
import { StatusCodes } from 'http-status-codes'
import passportLocal from 'passport-local'

export const initialize = (passport) => {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email)
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(
    new passportLocal.Strategy({ usernameField: 'email' }, authenticateUser)
  )
  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

// export const passportStrategy = async (req, res, next) => {
//   // const accName = req.body.accName;
//   // const password = req.body.password;

//   passport.use(
//     new passportLocal.Strategy(
//       { usernameField: 'accName' },
//       async (accName, password, done) => {
//         try {
//           const data = await MainContract.methods.isApplicant(accName).call()
//           if (data == false) {
//             return done(null, false, {
//               message: 'This Email is not Registered!!!',
//             })
//           } else {
//             const user = await MainContract.methods
//               .login(accName, password)
//               .call()
//             if (user == true) {
//               return done(null, user)
//             } else {
//               return done(null, false, {
//                 message: 'Password is not Correct!!!',
//               })
//             }

//             {
//               // Match password
//               // bcrypt.genSalt(10, (err, salt) => {
//               //   bcrypt.hash(password, salt, (err, hash) => {
//               //     if (err) throw err;
//               //     const pwd = hash;
//               //     const user =  await MainContract.methods.login(email, pwd).send({ from: address, gas: "300000" });
//               //     if(MainContract.methods.isApplicant(user).call()) {
//               //       return done(null, user);
//               //     }
//               //     else {
//               //       return done(null, false, { message: 'Password is not Correct!!!' });
//               //     }
//               //   });
//               // });
//             }
//           }
//         } catch (error) {
//           done(error)
//         }
//       }
//     )
//   )

//   passport.serializeUser(function (user, done) {
//     done(null, user)
//   })

//   passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//       done(null, user)
//     })
//   })
// }
