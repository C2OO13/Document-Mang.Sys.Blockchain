import React, { useState, useEffect } from 'react'

import axios from '../api'

const Home = () => {
  const [dashboard, setDashboard] = useState([])

  useEffect(() => {
    const checkUserAndGetData = async () => {
      const { data } = await axios.get('/api/is_applicant')
      if (data) {
        const { birthData } = await axios.get('/api/get_birth_certi')
        const { aadharData } = await axios.get('/api/get_aadhar_card')
        const { passportData } = await axios.get('/api/get_passport_certi')
      } else {
      }
    }

    checkUserAndGetData()
  }, [])

  return (
    <div>
      <h1>Welcome to the Blockchain-Based Document Management System</h1>
    </div>
  )
}

export default Home
