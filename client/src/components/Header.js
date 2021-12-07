import React from "react"
import { Link } from "react-router-dom"

import GoogleAuth from "./GoogleAuth"

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        BBDMS
      </Link>
      <div className="right menu">
        <Link to="/createCertificate" className="item">
          Create Certificate
        </Link>
        <Link to="/verifyCertificate" className="item">
          Verify Certificate
        </Link>
        {/* <Link to="/uploadTemplate" className="item">
          Upload Template
        </Link> */}
        <GoogleAuth />
      </div>
    </div>
  )
}

export default Header
