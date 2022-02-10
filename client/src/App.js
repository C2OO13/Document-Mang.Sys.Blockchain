import './App.css'
import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import CreateCertificate from './components/CreateCertificate'
import Header from './components/Header'
import Home from './components/Home'
import UploadTemplate from './components/UploadTemplate'
import VerifyCertificate from './components/VerifyCertificate'
import Authentication from './components/Authentication'
import PasswordReset from './components/PasswordReset'
import SignUp from './components/SignUp'

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Authentication} />
          <Route path="/dashboard" exact component={Home} />
          <Route
            path="/create_certificate"
            exact
            component={CreateCertificate}
          />
          <Route
            path="/verify_certificate"
            exact
            component={VerifyCertificate}
          />
          <Route path="/upload_template" exact component={UploadTemplate} />
          <Route path="/password_reset" exact component={PasswordReset} />
          <Route path="/signup" exact component={SignUp} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
