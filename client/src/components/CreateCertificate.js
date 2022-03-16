import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from '../api'
import BirthCertificateForm from './forms/BirthCertificateForm'
import AadharCertificateForm from './forms/AadharCertificateForm'
import PassportCertificateForm from './forms/PassportCertificateForm'

const CreateCertificate = () => {
  const [certificate, setCertificate] = useState(null)

  const history = useHistory()

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await axios.get('/check-auth')
      if (!data.isAuthenticated) {
        history.push('/')
      }
    }

    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(certificate)

    let formData = new FormData()

    if (certificate === 1) {
      formData.append('childName', event.target[0].value)
      formData.append('guardianName', event.target[1].value)
      formData.append('hospitalName', event.target[2].value)
      formData.append('dateOfBirth', event.target[3].value)
      formData.append('timeOfBirth', event.target[4].value)
      formData.append('location', event.target[5].value)
      const { data } = await axios.post('/api/new_birth_certi', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (data === 'true') {
        alert('Birth Certificate Sent for Approval!')
        history.push('/dashboard')
      } else {
        alert('Something went wrong! Please try again!')
      }
    } else if (certificate === 2) {
      formData.append('applicantName', event.target[0].value)
      formData.append('fatherName', event.target[1].value)
      formData.append('address', event.target[2].value)
      formData.append('contactNumber', event.target[3].value)
      const { data } = await axios.post('/api/new_aadhar_card', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (data === 'true') {
        alert('AadharCard certificate sent for approval!')
        history.push('/dashboard')
      } else {
        alert('Something went wrong! Please try again!')
      }
    } else {
      formData.append('applicantName', event.target[0].value)
      formData.append('fatherName', event.target[1].value)
      formData.append('motherName', event.target[2].value)
      formData.append('address', event.target[3].value)
      formData.append('contactNumber', event.target[4].value)
      formData.append('dateOfBirth', event.target[5].value)
      const { data } = await axios.post('/api/new_passport_certi', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (data === 'true') {
        alert('Passport certificate sent for approval!')
        history.push('/dashboard')
      } else {
        alert('Something went wrong! Please try again!')
      }
    }
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Create Certificate</h1>
      <form className="ui form" style={{ width: '1000px', margin: '0 auto' }}>
        <label>For:</label>
        <br />
        <br />
        <input
          type="radio"
          id="Birth"
          name="certificate"
          value="Birth"
          onChange={() => setCertificate(1)}
          required
        />
        <label htmlFor="Birth"> Birth Certificate</label>
        <br />
        <input
          type="radio"
          id="Aadhar"
          name="certificate"
          value="Aadhar"
          onChange={() => setCertificate(2)}
        />
        <label htmlFor="Aadhar"> Aadhar Card</label>
        <br />
        <input
          type="radio"
          id="Passport"
          name="certificate"
          value="Passport"
          onChange={() => setCertificate(3)}
        />
        <label htmlFor="Passport"> Passport</label>
        <br />
        <br />
      </form>
      <form
        className="ui form"
        style={{ width: '1000px', margin: '0 auto' }}
        onSubmit={handleSubmit}
      >
        {!certificate ? null : certificate === 1 ? (
          <BirthCertificateForm />
        ) : certificate === 2 ? (
          <AadharCertificateForm />
        ) : (
          <PassportCertificateForm />
        )}
        <input type="submit" className="ui button primary" value="Create" />
      </form>
    </div>
  )
}

export default CreateCertificate
