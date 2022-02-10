import React from 'react'
import { useHistory } from 'react-router-dom'

const VerifyEmail = () => {
  const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault()
    history.push('/dashboard')
  }

  return (
    <div>
      <form
        className="ui form"
        style={{ width: '1000px', margin: '0 auto' }}
        onSubmit={handleSubmit}
      >
        <label>Enter the verification code sent to xyz@abc.com:</label>
        <input type="text" required />
        <br />
        <br />
        <input type="submit" className="ui button primary" value="Verify" />
      </form>
    </div>
  )
}

export default VerifyEmail
