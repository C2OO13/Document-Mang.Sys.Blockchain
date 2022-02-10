import React from 'react'
import { Link } from 'react-router-dom'

const SignIn = () => {
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
        <label>Email:</label>
        <input type="email" required />
        <br />
        <br />
        <label>Password:</label>
        <input type="password" required />
        <br />
        <br />
        <input type="submit" className="ui button primary" value="Sign In" />
        <Link to="/password_reset" style={{ marginLeft: '50px' }}>
          Forgot Password?
        </Link>
        <br />
        <br />
        <p>
          Don't have an account?
          <Link to="/signup">
            {' '}
            <u>Sign Up</u>
          </Link>
        </p>
      </form>
    </div>
  )
}

export default SignIn
