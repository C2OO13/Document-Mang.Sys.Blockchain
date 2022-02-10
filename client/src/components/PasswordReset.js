import React from 'react'

const PasswordReset = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
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
        <input type="submit" className="ui button primary" value="Sign In" />
      </form>
    </div>
  )
}

export default PasswordReset
