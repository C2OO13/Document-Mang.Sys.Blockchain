import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import axios from '../api'

const ForgotPassword = () => {
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
    history.push('/dashboard')
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Sign In</h1>
      <form
        className="ui form"
        style={{ width: '1000px', margin: '0 auto' }}
        onSubmit={handleSubmit}
      >
        <label>Verification Code:</label>
        <input type="text" required />
        <br />
        <br />
        <label>New Password:</label>
        <input type="password" required />
        <br />
        <br />
        <label>Confirm Password:</label>
        <input type="password" required />
        <br />
        <br />
        <input
          type="submit"
          className="ui button primary"
          value="Change Password"
        />
      </form>
    </div>
  )
}

export default ForgotPassword
