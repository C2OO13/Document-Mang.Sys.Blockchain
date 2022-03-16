import React from 'react'

const AadharCertificateForm = () => {
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
      <label>Address:</label>
      <input type="text" required />
      <br />
      <br />
      <label for="phone">Contact Number:</label>
      <input type="tel" pattern="[0-9]{10}" required />
      <br />
      <br />
    </>
  )
}

export default AadharCertificateForm
