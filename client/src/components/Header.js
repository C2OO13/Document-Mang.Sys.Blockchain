import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import axios from '../api'

const Header = () => {
  const history = useHistory()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('/api/check_auth')
        setIsAuthenticated(true)
      } catch (e) {
        console.log(e)
        history.push('/')
      }
    }
    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isAuthenticated) return null

  return (
    <div className="ui secondary pointing menu">
      <Link to="/dashboard" className="item">
        BBDMS
      </Link>
      <div className="right menu">
        <Link to="/create_certificate" className="item">
          Create Certificate
        </Link>
        <Link to="/verify_certificate" className="item">
          Verify Certificate
        </Link>
        <Link to="/" className="item" onClick={() => {}}>
          Sign Out
        </Link>
      </div>
    </div>
  )
}

export default Header
