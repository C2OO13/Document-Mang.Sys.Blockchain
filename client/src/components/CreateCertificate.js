import React, { useState } from 'react'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import downloadjs from 'downloadjs'
import axios from '../api'
import BirthCertificateForm from './forms/BirthCertificateForm'
import AadharCertificateForm from './forms/AadharCertificateForm'
import PassportCertificateForm from './forms/PassportCertificateForm'

const CreateCertificate = () => {
  const [certificate, setCertificate] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    alert('Created')

    // const pdfDoc = await PDFDocument.create()
    // const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

    // const page = pdfDoc.addPage()
    // // eslint-disable-next-line no-unused-vars
    // const { width, height } = page.getSize()
    // const fontSize = 30

    // const formValues = event.target
    // const userName = formValues[0].value
    // const guardianName = formValues[1].value
    // const hospitalName = formValues[2].value
    // const dateOfBirth = formValues[3].value
    // const timeOfBirth = formValues[4].value
    // const location = formValues[5].value
    // page.drawText(
    //   `Name: ${userName}\n\nGuardian's Name: ${guardianName}\n\nHospital: ${hospitalName}\n\nDate of Birth: ${dateOfBirth}\n\nTime of Birth: ${timeOfBirth}\n\nLocation: ${location}`,
    //   {
    //     x: 50,
    //     y: height - 4 * fontSize,
    //     size: fontSize,
    //     font: timesRomanFont,
    //     color: rgb(0, 0.53, 0.71),
    //   }
    // )
    // let data = {}
    // data.name = userName
    // data.guardian = guardianName
    // data.hospital = hospitalName
    // data.location = location
    // data.tob = new Date(`${dateOfBirth}T${timeOfBirth}`)
    // data.dob = new Date(dateOfBirth)

    // pdfDoc.setKeywords([
    //   userName,
    //   guardianName,
    //   hospitalName,
    //   dateOfBirth,
    //   timeOfBirth,
    //   location,
    // ])

    // pdfDoc.setTitle(userName)
    // pdfDoc.setAuthor(guardianName)
    // pdfDoc.setSubject(hospitalName)
    // pdfDoc.setProducer(location)
    // pdfDoc.setCreationDate(new Date(dateOfBirth))
    // pdfDoc.setModificationDate(new Date(`${dateOfBirth}T${timeOfBirth}`))
    // pdfDoc.setKeywords([data])
    // const pdfBytes = await pdfDoc.save()

    // await axios.post('/api/create_certificate', data)

    // downloadjs(pdfBytes, `${userName}_Certificate`, 'application/pdf')
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Create Certificate</h1>
      <form
        className="ui form"
        style={{ width: '1000px', margin: '0 auto' }}
        onSubmit={handleSubmit}
      >
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
        {!certificate ? null : certificate === 1 ? (
          <BirthCertificateForm />
        ) : certificate === 2 ? (
          <AadharCertificateForm />
        ) : (
          <PassportCertificateForm />
        )}
      </form>
    </div>
  )
}

export default CreateCertificate
