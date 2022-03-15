import React from 'react'
import { useHistory } from 'react-router-dom'

const SignUp = () => {
  const history = useHistory()

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
        <input type="submit" className="ui button primary" value="Sign Up" />
      </form>
    </div>
  )
}

export default SignUp
