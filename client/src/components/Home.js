import React, { useState, useEffect } from 'react'

import axios from '../api'

const Home = () => {
  const [dashboard, setDashboard] = useState([])
  const [isApplicant, setIsApplicant] = useState(null)
  const [fetchedCerti, setFetchedCerti] = useState(null)
  const [certiType, setCertiType] = useState(null)

  useEffect(() => {
    const checkUserAndGetData = async () => {
      const { data } = await axios.get('/api/is_applicant')
      if (data === 'true') {
        setIsApplicant(true)
        const { birthData } = await axios.get('/api/get_birth_certi')
        const { aadharData } = await axios.get('/api/get_aadhar_card')
        const { passportData } = await axios.get('/api/get_passport_certi')

        if (birthData) {
          setDashboard([...dashboard, birthData])
        }
        if (aadharData) {
          setDashboard([...dashboard, aadharData])
        }
        if (passportData) {
          setDashboard([...dashboard, passportData])
        }
      } else {
        setIsApplicant(false)
      }
    }

    checkUserAndGetData()
  }, [dashboard])

  const approveClick = async () => {
    if (certiType === 1) await axios.post('/api/approve_birth_certi')
    else if (certiType === 2) {
      await axios.post('/api/approve_aadhar_card')
    } else {
      await axios.post('/api/approve_passport_certi')
    }
  }

  const rejectClick = async () => {
    if (certiType === 1) await axios.post('/api/reject_birth_certi')
    else if (certiType === 2) {
      await axios.post('/api/reject_aadhar_card')
    } else {
      await axios.post('/api/reject_passport_certi')
    }
  }

  const updateCerti = (data) => {
    setFetchedCerti(
      <>
        <a href={data[2]} target="_blank" rel="noreferrer">
          <button className="ui button primary">View</button>
        </a>
        <button className="ui button primary" onClick={approveClick}>
          Approve
        </button>
        <button className="negative ui button" onClick={rejectClick}>
          Reject
        </button>
      </>
    )
  }

  const handleBirthClick = async () => {
    const { data } = await axios.get('/api/top_birth_certi')
    setCertiType(1)
    updateCerti(data)
  }

  const handleAadharClick = async () => {
    const { data } = await axios.get('/api/top_aadhar_certi')
    setCertiType(2)
    updateCerti(data)
  }

  const handlePassportClick = async () => {
    const { data } = await axios.get('/api/top_passport_certi')
    setCertiType(3)
    updateCerti(data)
  }

  const ApproverDashboard = () => {
    return (
      <>
        <h1>Click below buttons to find pending approval requests!</h1>
        <button className="ui primary button" onClick={handleBirthClick}>
          Birth Certificate
        </button>
        <button className="ui primary button" onClick={handleAadharClick}>
          Aadhar Certificate
        </button>
        <button className="ui primary button" onClick={handlePassportClick}>
          Passport Certificate
        </button>
        {fetchedCerti}
      </>
    )
  }

  const jsx = isApplicant
    ? dashboard.map((certificate) => {
        return (
          <div className="item" key={certificate.id}>
            <div className="right floated content">
              <a href="certificate.ipfsHash" target="_blank" rel="noreferrer">
                <button className="ui button primary">View</button>
              </a>
            </div>
            <i className="file icon" />
            <div className="content">
              <div className="header">{certificate.description}</div>
            </div>
          </div>
        )
      })
    : ApproverDashboard()

  return jsx
}

export default Home
