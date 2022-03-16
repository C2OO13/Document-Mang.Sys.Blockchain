import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from '../api'

const SignIn = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    let formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    await axios.post('/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
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
