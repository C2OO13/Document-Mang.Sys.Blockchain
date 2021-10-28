import './App.css'
import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import CreateCertificate from './components/CreateCertificate'
import Header from './components/Header'
import Home from './components/Home'
import UploadTemplate from './components/UploadTemplate'

const App = () => {

  return (
    <div className = "ui container">
        <BrowserRouter >
          <Header />
          <Switch>  
            <Route path = "/" exact component = {Home} />
            <Route path = "/createCertificate" exact component = {CreateCertificate} />
            <Route path = "/uploadTemplate" exact component = {UploadTemplate} />
          </Switch>
        </BrowserRouter>
    </div>
  )

}

export default App
