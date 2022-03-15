import React from 'react'

const PassportCertificateForm = () => {
  return (
    <>
      <label>Name:</label>
      <input type="text" required />
      <br />
      <br />
      <label>Guardian's Name:</label>
      <input type="text" required />
      <br />
      <br />
      <label>Hospital:</label>
      <input type="text" required />
      <br />
      <br />
      <label>Date of Birth:</label>
      <input type="date" required />
      <br />
      <br />
      <label>Time of Birth:</label>
      <input type="time" required />
      <br />
      <br />
      <label>Location:</label>
      <input type="text" required />
      <br />
      <br />
      <input type="submit" className="ui button primary" value="Create" />
    </>
  )
}

export default PassportCertificateForm
