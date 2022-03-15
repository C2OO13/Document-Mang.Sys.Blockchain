import React from 'react'

const ForgotPassword = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
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
