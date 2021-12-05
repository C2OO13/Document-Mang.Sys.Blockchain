import React, { useState, useEffect } from "react"

import axios from "../api"

const UploadTemplate = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const { data } = axios.get("/api/current_user")
    if (data) {
      setIsAuthenticated(true)
      setCurrentUser(data)
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!isAuthenticated) {
      alert("Please Sign In to proceed!")
      return
    }
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Upload Template</h1>
      <form
        className="ui form"
        style={{ width: "1000px", margin: "0 auto" }}
        onSubmit={handleSubmit}
      >
        <label>Name of Form:</label>
        <input type="text" required />
        <br />
        <br />
        <label>Fields(Enter all the required fields seperated by a ,):</label>
        <input type="text" required />
        <br />
        <br />
        <label>Form Template:</label>
        <input type="file" required />
        <br />
        <br />
        <br />

        <input type="submit" className="ui button primary" value="Upload" />
      </form>
    </div>
  )
}

export default UploadTemplate
