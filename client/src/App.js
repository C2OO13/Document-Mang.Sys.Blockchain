import "./App.css"
import React from "react"
import { Route, BrowserRouter, Switch } from "react-router-dom"

import CreateCertificate from "./components/CreateCertificate"
import Header from "./components/Header"
import Home from "./components/Home"
import UploadTemplate from "./components/UploadTemplate"
import VerifyCertificate from "./components/VerifyCertificate"
import axios from "./api"

const App = () => {
  const login = async (googleAuthResponse) => {
    try {
      const { data } = await axios.post("/google_auth", {
        ga_token: googleAuthResponse.tokenId,
      })
      if (data.status) {
        //setIsAuthenticated(true)
      }
    } catch (err) {
      console.log("/google_auth :", err)
    }
  }

  const logout = async () => {
    try {
      const { data } = await axios.post("/logout", "")

      if (data.status) {
        //setIsAuthenticated(false)
      }
    } catch (err) {
      // console.log('/logout :', err)
    }
  }

  return (
    <div className="ui container">
      <BrowserRouter>
        <Header login={login} logout={logout} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/createCertificate"
            exact
            component={CreateCertificate}
          />
          <Route
            path="/verifyCertificate"
            exact
            component={VerifyCertificate}
          />
          <Route path="/uploadTemplate" exact component={UploadTemplate} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
