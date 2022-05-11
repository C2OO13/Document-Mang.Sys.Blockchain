import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from '../api'
import BirthCertificateForm from './forms/BirthCertificateForm'
import AadharCertificateForm from './forms/AadharCertificateForm'
import PassportCertificateForm from './forms/PassportCertificateForm'
import Header from './Header'

const CreateCertificate = () => {
  const [certificate, setCertificate] = useState(null)

  const history = useHistory()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('/api/check_auth')
      } catch (e) {
        console.log(e)
        history.push('/')
      }
    }
    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (certificate === 1) {
      console.log('Birth!')
      const childName = event.target[0].value
      const guardianName = event.target[1].value
      const hospitalName = event.target[2].value
      const dateOfBirth = event.target[3].value
      const timeOfBirth = event.target[4].value
      const location = event.target[5].value
      const { data } = await axios.post('/api/new_birth_certificate', {
        dateOfBirth,
        childName,
        guardianName,
        hospitalName,
        timeOfBirth,
        location,
      })
      if (data === 'true') {
        alert('Birth Certificate Sent for Approval!')
        history.push('/dashboard')
      } else {
        alert('Something went wrong! Please try again!')
      }
    } else if (certificate === 2) {
      const applicantName = event.target[0].value
      const fatherName = event.target[1].value
      const address = event.target[2].value
      const contactNo = event.target[3].value
      const { data } = await axios.post('/api/new_aadhar_card', {
        applicantName,
        fatherName,
        address,
        contactNo,
      })
      if (data === 'true') {
        alert('AadharCard certificate sent for approval!')
        history.push('/dashboard')
      } else {
        alert('Something went wrong! Please try again!')
      }
    } else {
      const applicantName = event.target[0].value
      const fatherName = event.target[1].value
      const motherName = event.target[2].value
      const address = event.target[3].value
      const contactNumber = event.target[4].value
      const dateOfBirth = event.target[5].value
      const { data } = await axios.post('/api/new_passport_certificate', {
        applicantName,
        fatherName,
        motherName,
        address,
        contactNumber,
        dateOfBirth,
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
      <Header />
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
