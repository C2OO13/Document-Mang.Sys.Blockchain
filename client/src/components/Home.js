import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

import axios from '../api'
import Header from './Header'

const Home = () => {
  const history = useHistory()
  const [dataFetched, setDataFetched] = useState(false)
  const [dashboard, setDashboard] = useState([])
  const [isApplicant, setIsApplicant] = useState(null)
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
      if (!data) {
        setIsApplicant(true)

        const { data: birthData } = await axios.get(
          '/api/get_birth_certificate'
        )
        const { data: aadharData } = await axios.get('/api/get_aadhar_card')
        const { data: passportData } = await axios.get(
          '/api/get_passport_certificate'
        )
        const { data: sharedCertificates } = await axios.get(
          '/api/get_shared_certis'
        )

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
        setDataFetched(true)
      } else {
        setIsApplicant(false)
        const { data: pendingBirthCertis } = await axios.get(
          '/api/get_all_pending_birth_certificates'
        )
        const { data: pendingAadharCertis } = await axios.get(
          '/api/get_all_pending_aadhar_cards'
        )
        const { data: pendingPassportCertis } = await axios.get(
          '/api/get_all_pending_passport_certificates'
        )
        let certis = []
        for (const pendingBirthCerti of pendingBirthCertis) {
          if (
            typeof pendingBirthCerti === 'string' ||
            pendingBirthCerti[4] === ''
          ) {
            continue
          }
          certis.push([...pendingBirthCerti, 'birth'])
        }
        for (const pendingAadharCerti of pendingAadharCertis) {
          if (
            typeof pendingAadharCerti === 'string' ||
            pendingAadharCerti[4] === ''
          ) {
            continue
          }
          certis.push([...pendingAadharCerti, 'aadhar'])
        }
        for (const pendingPassportCerti of pendingPassportCertis) {
          if (
            typeof pendingPassportCerti === 'string' ||
            pendingPassportCerti[4] === ''
          ) {
            continue
          }
          certis.push([...pendingPassportCerti, 'passport'])
        }
        setDashboard([...dashboard, ...certis])
        setDataFetched(true)
      }
    }

    checkUserAndGetData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createNotification = async (email, message) => {
    message = message[0].toUpperCase() + message.slice(1)
    await axios.post('/api/add_notification', {
      email,
      message,
    })
  }

  const ApproverDashboard = () => {
    console.log(dashboard)
    return (
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
                {certificate[6] === 'birth'
                  ? 'Birth Certificate'
                  : certificate[6] === 'aadhar'
                  ? 'Aadhar Certificate'
                  : 'Passport Certificate'}
                {` (by ${certificate[4]})`}
              </div>
              <div className={`content ${active}`}>
                <a href={`${certificate[2]}`} target="_blank" rel="noreferrer">
                  <button className="ui button primary">View</button>
                </a>
                <button
                  className="ui button primary"
                  onClick={async () => {
                    if (certificate[6] === 'birth') {
                      const { data } = await axios.post(
                        '/api/approve_birth_certificate',
                        {
                          email: certificate[4],
                        }
                      )
                      if (data) {
                        alert('Approved successfully!')
                        await createNotification(
                          certificate[4],
                          `${certificate[6]} certificate is Approved. View it on Dashboard!`
                        )
                        window.location.reload()
                      } else {
                        alert('Something went wrong!')
                      }
                    } else if (certificate[6] === 'aadhar') {
                      const { data } = await axios.post(
                        '/api/approve_aadhar_card',
                        {
                          email: certificate[4],
                        }
                      )
                      if (data) {
                        alert('Approved successfully!')
                        await createNotification(
                          certificate[4],
                          `${certificate[6]} certificate is Approved. View it on Dashboard!`
                        )
                        window.location.reload()
                      } else {
                        alert('Something went wrong!')
                      }
                    } else {
                      const { data } = await axios.post(
                        '/api/approve_passport_certificate',
                        {
                          email: certificate[4],
                        }
                      )
                      if (data) {
                        alert('Approved successfully!')
                        await createNotification(
                          certificate[4],
                          `${certificate[6]} certificate is Approved. View it on Dashboard!`
                        )
                        window.location.reload()
                      } else {
                        alert('Something went wrong!')
                      }
                    }
                  }}
                >
                  Approve
                </button>
                <button
                  className="ui button negative"
                  onClick={async () => {
                    if (certificate[6] === 'birth') {
                      const { data } = await axios.post(
                        '/api/reject_birth_certificate',
                        {
                          email: certificate[4],
                        }
                      )
                      if (data) {
                        alert('Rejected successfully!')
                        await createNotification(
                          certificate[4],
                          `${certificate[6]} certificate is Rejected. Request again with correct details!`
                        )
                        window.location.reload()
                      } else {
                        alert('Something went wrong!')
                      }
                    } else if (certificate[6] === 'aadhar') {
                      const { data } = await axios.post(
                        '/api/reject_aadhar_card',
                        {
                          email: certificate[4],
                        }
                      )
                      if (data) {
                        alert('Rejected successfully!')
                        await createNotification(
                          certificate[4],
                          `${certificate[6]} certificate is Rejected. Request again with correct details!`
                        )
                        window.location.reload()
                      } else {
                        alert('Something went wrong!')
                      }
                    } else {
                      const { data } = await axios.post(
                        '/api/reject_passport_certificate',
                        {
                          email: certificate[4],
                        }
                      )
                      if (data) {
                        alert('Rejected successfully!')
                        await createNotification(
                          certificate[4],
                          `${certificate[6]} certificate is Rejected. Request again with correct details!`
                        )
                        window.location.reload()
                      } else {
                        alert('Something went wrong!')
                      }
                    }
                  }}
                >
                  Reject
                </button>
              </div>
            </React.Fragment>
          )
        })}
      </div>
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
                    await createNotification(
                      toShareEmail,
                      `${certificate[6]} certificate is shared with you by ${certificate[4]}`
                    )
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

  if (!dataFetched) {
    return (
      <>
        <Header />
        <Segment style={{ marginTop: '100px' }}>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>

          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      </>
    )
  }

  if (!isAuthenticated) return null

  if (!dashboard.length) {
    if (isApplicant) {
      return (
        <>
          <Header />
          <h1>No Certificates yet! Try creating one:)</h1>
        </>
      )
    } else {
      return (
        <>
          <Header />
          <h1>No Certificates to verify yet! Hold On:)</h1>
        </>
      )
    }
  }

  return (
    <>
      <Header />
      {jsx}
    </>
  )
}

export default Home
