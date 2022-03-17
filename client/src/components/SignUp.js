import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import axios from '../api'

const SignUp = () => {
  const history = useHistory()

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await axios.get('/check-auth')
      if (data.isAuthenticated) {
        history.push('/dashboard')
      }
    }

    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    history.push('/verify_email')
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
        <label>Register as:</label>
        <br />
        <br />
        <input
          type="radio"
          id="Approver"
          name="Profile"
          value="Approver"
          required
        />
        <label htmlFor="Approver"> Approver</label>
        <br />
        <input type="radio" id="Applicant" name="Profile" value="Applicant" />
        <label htmlFor="Applicant"> Applicant</label>
        <br />
        <br />
        <br />
        <input type="submit" className="ui button primary" value="Sign Up" />
      </form>
    </div>
  )
}

export default SignUp
