import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import axios from '../api'

const SignUp = () => {
  const history = useHistory()

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await axios.get('/api/check_auth')
      if (data.isAuthenticated) {
        history.push('/dashboard')
      }
    }

    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fname = e.target[0].value
    const lname = e.target[1].value
    const email = e.target[2].value
    const password = e.target[3].value
    const cpassword = e.target[4].value
    if (password !== cpassword) {
      alert('Passwords do not match!')
      return
    }

    const { data } = await axios.post('/api/register_applicant', {
      email,
      name: `${fname} ${lname}`,
      password,
    })
    console.log(data)

    if (data) {
      alert('Registered Successfully! Please proceed to sign in.')
      history.push('/')
    } else {
      alert('Email already in use!')
    }

    // history.push('/verify_email')
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
      <form
        className="ui form"
        style={{ width: '1000px', margin: '0 auto' }}
        onSubmit={handleSubmit}
      >
        <label>First Name:</label>
        <input type="text" required />
        <br />
        <br />
        <label>Last Name:</label>
        <input type="text" required />
        <br />
        <br />
        <label>Email:</label>
        <input type="email" required />
        <br />
        <br />
        <label>Password:</label>
        <input type="password" required />
        <br />
        <br />
        <label>Confirm Password:</label>
        <input type="password" required />
        <br />
        <br />
        <br />
        <input type="submit" className="ui button primary" value="Sign Up" />
      </form>
    </div>
  )
}

export default SignUp
