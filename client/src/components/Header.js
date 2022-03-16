import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import axios from '../api'

const Header = () => {
  const history = useHistory()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await axios.get('/check-auth')
      if (!data.isAuthenticated) {
        history.push('/')
      } else {
        setIsAuthenticated(true)
      }
    }

    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const jsx = !isAuthenticated ? null : (
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
        <Link to="/" className="item">
          Sign Out
        </Link>
      </div>
    </div>
  )

  return jsx
}

export default Header
