import React, { useState, useEffect } from "react"

import axios from "../api"

const VerifyCertificate = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const { data } = axios.get("/api/current_user")
    if (data) {
      setIsAuthenticated(true)
      setCurrentUser(data)
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!isAuthenticated) {
      alert("Please Sign In to proceed!")
      return
    }
    console.log(event)

    const file = event.target[0].files[0]
    if (file.type !== "application/pdf") {
      alert("Please upload file in pdf format only!")
      return
    }

    // read Metadata and verify if such certificate exists
    // pdf url required to read meta data: https://jsfiddle.net/Hopding/eg8rfz3k/16/
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Verify Certificate</h1>
      <form
        className="ui form"
        style={{ width: "1000px", margin: "0 auto" }}
        onSubmit={handleSubmit}
      >
        <label>Upload Certificate:</label>
        <input type="file" accept=".pdf" required />
        <br />
        <br />
        <input type="submit" className="ui button primary" value="Verify" />
      </form>
    </div>
  )
}

export default VerifyCertificate
