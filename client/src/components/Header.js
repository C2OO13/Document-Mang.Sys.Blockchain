import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
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
        <Link to="/upload_template" className="item">
          Upload Template
        </Link>
      </div>
    </div>
  )
}

export default Header
