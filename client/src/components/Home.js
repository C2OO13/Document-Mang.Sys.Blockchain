import React, { useState, useEffect } from 'react'

import axios from '../api'

const Home = () => {
  const [dashboard, setDashboard] = useState([])

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await axios.get('/api/is_applicant')
      if (data) {
      } else {
      }
    }

    checkUser()
  }, [])

  return (
    <div>
      <h1>Welcome to the Blockchain-Based Document Management System</h1>
    </div>
  )
}

export default Home
