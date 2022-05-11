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
  const [activeIndex, setActiveIndex] = useState(null)

  const onTitleClick = (index) => {
    setActiveIndex(index)
  }

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

        const { data: birthData } = await axios.get(
          '/api/get_birth_certificate'
        )
        const { data: aadharData } = await axios.get('/api/get_aadhar_card')
        console.log(aadharData)
        const { data: passportData } = await axios.get(
          '/api/get_passport_certificate'
        )
        const { data: sharedCertificates } = await axios.get(
          '/api/get_shared_certis'
        )
        console.log(sharedCertificates)
        let certis = []

        if (aadharData[4] !== '') {
          certis.push([...aadharData, 'aadhar'])
        }

        if (birthData[4] !== '') {
          certis.push([...birthData, 'birth'])
        }

        if (passportData[4] !== '') {
          certis.push([...passportData, 'passport'])
        }
        sharedCertificates.forEach((sharedCertificate) => {
          if (
            !(
              Date.now() - parseInt(sharedCertificate[2]) >
              parseInt(sharedCertificate[1]) * 24 * 60 * 60 * 1000
            )
          ) {
            certis.push([...sharedCertificate, 'shared'])
          }
        })
        setDashboard([...dashboard, ...certis])
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

  const jsx = isApplicant ? (
    <div className="ui styled accordion" style={{ width: '100%' }}>
      {dashboard.map((certificate, index) => {
        const active = index === activeIndex ? 'active' : ''

        return (
          <React.Fragment key={certificate[2]}>
            <div
              onClick={() => onTitleClick(index)}
              className={`title ${active}`}
            >
              <i className="dropdown icon"></i>
              {certificate.length === 6
                ? `Shared With You `
                : certificate[6] === 'aadhar'
                ? 'Aadhar Certificate'
                : certificate[6] === 'birth'
                ? 'Birth Certificate'
                : 'Passport Certificate'}
              {certificate.length === 6
                ? `(by ${certificate[3]})`
                : certificate[5] === '0'
                ? ' (Pending Approval)'
                : certificate[5] === '2'
                ? ' (Approved)'
                : ' (Rejected)'}
            </div>
            <div className={`content ${active}`}>
              <a
                href={
                  certificate.length === 6
                    ? `${certificate[certificate.length - 2]}`
                    : `${certificate[2]}`
                }
                target="_blank"
                rel="noreferrer"
              >
                <button className="ui button primary">View</button>
              </a>
              <button
                className="ui button primary"
                onClick={async () => {
                  if (certificate.length === 6 || certificate[5] !== '2') {
                    alert('Not Allowed to Share certificate!')
                    return
                  }
                  const toShareEmail = prompt(
                    'Enter the email to share the certificate with: '
                  )
                  const timeperiod = parseInt(
                    prompt(
                      'Enter the time period for which you wish to share(in days): '
                    )
                  )

                  const { data } = await axios.post('/api/share_certi', {
                    toShareEmail,
                    type:
                      certificate[6] === 'aadhar'
                        ? 2
                        : certificate[6] === 'birth'
                        ? 1
                        : 3,
                    timeperiod,
                  })
                  if (data) {
                    alert('Shared Successfully!!')
                  } else {
                    alert('Something went wrong!!')
                  }
                }}
              >
                Share
              </button>
            </div>
          </React.Fragment>
        )
      })}
    </div>
  ) : (
    ApproverDashboard()
  )

  if (!isAuthenticated) return null

  return (
    <>
      <Header />
      {jsx}
    </>
  )
}

export default Home
