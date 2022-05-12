import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from '../api'

const Header = () => {
  const [isApplicant, setIsApplicant] = useState(null)

  const onSignOutClick = async () => {
    try {
      await axios.get('/api/logout')
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const checkProfile = async () => {
      const { data } = await axios.get('/api/is_approver')
      if (!data) {
        setIsApplicant(true)
      } else {
        setIsApplicant(false)
      }
    }
    checkProfile()
  }, [])

  return (
    <div className="ui secondary pointing menu">
      <Link to="/dashboard" className="item">
        BBDMS
      </Link>
      <div className="right menu">
        {isApplicant ? (
          <Link to="/create_certificate" className="item">
            Create Certificate
          </Link>
        ) : null}
        {isApplicant ? (
          <Link to="/verify_certificate" className="item">
            Verify Certificate
          </Link>
        ) : null}
        <Link to="/" className="item" onClick={onSignOutClick}>
          Sign Out
        </Link>
      </div>
    </div>
  )
}

export default Header
