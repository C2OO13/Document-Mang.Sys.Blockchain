import React from 'react'

const PassportCertificateForm = () => {
  return (
    <>
      <label>Name:</label>
      <input type="text" required />
      <br />
      <br />
      <label>Father's Name:</label>
      <input type="text" required />
      <br />
      <br />
      <label>Mother's Name:</label>
      <input type="text" required />
      <br />
      <br />
      <label>Address:</label>
      <input type="text" required />
      <br />
      <br />
      <label htmlFor="phone">Contact Number:</label>
      <input type="tel" pattern="[0-9]{10}" required />
      <br />
      <br />
      <label>Date of Birth:</label>
      <input type="date" required />
      <br />
      <br />
    </>
  )
}

export default PassportCertificateForm
