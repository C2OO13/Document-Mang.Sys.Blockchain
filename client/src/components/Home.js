import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'

import axios from '../api'
import Header from './Header'

const Home = () => {
  const history = useHistory()
  const [dashboard, setDashboard] = useState([])
  const [isApplicant, setIsApplicant] = useState(null)
  const [fetchedCerti, setFetchedCerti] = useState(null)
  const [certiType, setCertiType] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('/api/check_auth')
        setIsAuthenticated(true)
      } catch (e) {
        console.log(e)
        history.push('/')
      }
    }
    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const checkUserAndGetData = async () => {
      const { data } = await axios.get('/api/is_approver')
      if (data === false) {
        setIsApplicant(true)
        const { birthData } = await axios.get('/api/get_birth_certificate')
        const { aadharData } = await axios.get('/api/get_aadhar_card')
        const { passportData } = await axios.get(
          '/api/get_passport_certificate'
        )

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

    // const checkAuth = async () => {
    //   try {
    //     await axios.get('/api/check_auth')
    //     setIsAuthenticated(true)
    //   } catch (e) {
    //     console.log(e)
    //     history.push('/')
    //   }
    // }
    // checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const approveClick = async () => {
    if (certiType === 1) await axios.post('/api/approve_birth_certificate')
    else if (certiType === 2) {
      await axios.post('/api/approve_aadhar_card')
    } else {
      await axios.post('/api/approve_passport_certificate')
    }
  }

  const rejectClick = async () => {
    if (certiType === 1) await axios.post('/api/reject_birth_certicate')
    else if (certiType === 2) {
      await axios.post('/api/reject_aadhar_card')
    } else {
      await axios.post('/api/reject_passport_certicate')
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
    const { data } = await axios.get('/api/top_birth_certificate')
    setCertiType(1)
    updateCerti(data)
  }

  const handleAadharClick = async () => {
    const { data } = await axios.get('/api/top_aadhar_certi')
    setCertiType(2)
    updateCerti(data)
  }

  const handlePassportClick = async () => {
    const { data } = await axios.get('/api/top_passport_certificate')
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
          <>
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
          </>
        )
      })
    : ApproverDashboard()

  if (!isAuthenticated) return null

  return (
    <>
      <Header />
      {jsx}
    </>
  )
}

export default Home
