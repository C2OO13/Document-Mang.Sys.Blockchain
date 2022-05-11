import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'

import { getUserByEmail } from '../blockchain/methods.js'
import { signupUser } from '../blockchain/methods.js'

/**
 * @desc    signup user
 * @route   post /api/users/auth/signup
 * @access  public
 */
export const signup = async (req, res) => {
  const email = req.body.email
  const name = req.body.name
  const password = req.body.password

  const ok = await signupUser(email, name, password)

  if (!ok) {
    return res.send({
      error: 'User already exists!',
    })
  }

  const user = {
    email,
    name,
    password,
  }
  const token = jwt.sign(user, process.env.JWT_TOKEN_SECRET, {
    expiresIn: '2h',
  })

  return res
    .cookie('jwt', token, {
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
    .send({ data: user })
}

/**
 * @desc    login user
 * @route   post /api/users/auth/login
 * @access  public
 */
export const login = async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const check_user = await getUserByEmail(email)

  if (!check_user)
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: 'Email Does not exists!!' })

  if (check_user[2] !== password) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: 'Password is incorrect' })
  }

  const user = {
    email,
    name: check_user[0],
    password,
  }
  const token = jwt.sign(user, process.env.JWT_TOKEN_SECRET, {
    expiresIn: '2h',
  })
  // token
  return res
    .status(StatusCodes.OK)
    .cookie('jwt', token, {
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
    .send({
      data: user,
    })
}

/**
 * @desc    logout user
 * @route   get /api/users/auth/logout
 * @access  private
 */
export const logout = async (req, res) => {
  req.logOut()
  res
    .status(StatusCodes.OK)
    .clearCookie('jwt')
    .json({ data: 'logged out successfully!' })
}

/**
 * @desc    To check authentication status
 * @route   GET /api/users/auth/check-auth
 * @access  private
 */
export const checkAuth = (req, res) => {
  res.status(StatusCodes.OK).json({ data: req.user })
}
