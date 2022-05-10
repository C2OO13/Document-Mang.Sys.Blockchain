import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import axios from '../api'

const PasswordReset = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    history.push('/change_password')
  }

  return (
    <div>
      <form
        className="ui form"
        style={{ width: '1000px', margin: '0 auto' }}
        onSubmit={handleSubmit}
      >
        <label>Enter your email to obtain verification code:</label>
        <input type="email" required />
        <br />
        <br />
        <input type="submit" className="ui button primary" value="Send" />
      </form>
    </div>
  )
}

export default PasswordReset
