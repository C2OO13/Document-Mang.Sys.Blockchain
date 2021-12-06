import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import GoogleLogin from "react-google-login"

import axios from "../api"

const Header = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const { data } = axios.get("/api/current_user")
    if (data) {
      setIsAuthenticated(true)
      setCurrentUser(data)
    }
  }, [])
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
        <Link to="/uploadTemplate" className="item">
          Upload Template
        </Link>
        {!isAuthenticated ? (
          <GoogleLogin
            clientId={
              "922603664055-rgd2dan2rqmio280911p6n1s475h4jjp.apps.googleusercontent.com"
            }
            buttonText={"Sign In With Google"}
            onSuccess={props.login}
            onFailure={(err) => console.log("GoogleLogin :", err)}
            cookiePolicy={"single_host_origin"}
          />
        ) : (
          <button onClick={props.logout} className="ui red google button">
            <i className="google icon" />
            Sign Out
          </button>
        )}
      </div>
    </div>
  )
}

export default Header
