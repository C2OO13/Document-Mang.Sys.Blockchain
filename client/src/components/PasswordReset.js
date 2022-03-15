import React from 'react'
import { useHistory } from 'react-router-dom'

const PasswordReset = () => {
  const history = useHistory()
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
