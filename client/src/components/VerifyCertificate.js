import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Header from './Header'
import axios from '../api'

const VerifyCertificate = () => {
  const history = useHistory()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('/api/check_auth')
      } catch (e) {
        history.push('/')
      }
    }

    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const file = e.target[0].files[0]
    if (file.type !== 'application/pdf') {
      alert('Please upload file in pdf format only!')
      return
    }

    let formData = new FormData()
    const email = e.target['email'].value
    formData.append('type', e.target['certificate'].value)
    formData.append('certificate', file)
    formData.append('email', email)
    const { data } = await axios.post('/api/verify_certi', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    if (data) {
      alert('Valid Certificate!')
    } else {
      alert('Not Valid Certificate!')
    }
  }

  return (
    <div>
      <Header />
      <h1 style={{ textAlign: 'center' }}>Verify Certificate</h1>
      <form
        className="ui form"
        style={{ width: '1000px', margin: '0 auto' }}
        onSubmit={handleSubmit}
      >
        <label>Upload Certificate:</label>
        <input type="file" accept=".pdf" required />
        <br />
        <br />
        <label>For:</label>
        <br />
        <br />
        <input
          type="radio"
          id="Birth"
          name="certificate"
          value="Birth"
          required
        />
        <label htmlFor="Birth"> Birth Certificate</label>
        <br />
        <input type="radio" id="Aadhar" name="certificate" value="Aadhar" />
        <label htmlFor="Aadhar"> Aadhar Card</label>
        <br />
        <input type="radio" id="Passport" name="certificate" value="Passport" />
        <label htmlFor="Passport"> Passport</label>
        <br />
        <br />
        <label>Email of user, whose certificate needs to be verified:</label>
        <input type="email" name="email" required />
        <br />
        <br />
        <input type="submit" className="ui button primary" value="Verify" />
      </form>
    </div>
  )
}

export default VerifyCertificate
