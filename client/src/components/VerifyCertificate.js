import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import axios from '../api'

const VerifyCertificate = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const file = e.target[0].files[0]
    if (file.type !== 'application/pdf') {
      alert('Please upload file in pdf format only!')
      return
    }

    let formData = new FormData()
    formData.append('type', e.target[1].value)
    formData.append('certificate', file)

    const { data } = await axios.post('/api/verify_certi', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    if (data.ok) {
      alert('Valid Certificate!')
    } else {
      alert('Not Valid Certificate!')
    }
  }

  return (
    <div>
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
        <input type="submit" className="ui button primary" value="Verify" />
      </form>
    </div>
  )
}

export default VerifyCertificate
