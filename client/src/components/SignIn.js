import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from '../api'

const SignIn = () => {
  const history = useHistory()

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await axios.get('/api/check_auth')
      if (data.isAuthenticated) {
        history.push('/dashboard')
      }
      console.log(data)
    }

    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    await axios.post('/api/login', {
      email,
      password,
    })
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
          <Link to="/signup"> Sign Up</Link>
        </p>
      </form>
    </div>
  )
}

export default SignIn
