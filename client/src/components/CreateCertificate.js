import React from "react"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import downloadjs from "downloadjs"
import axios from "../api"

const CreateCertificate = () => {
  const handleSubmit = async (event) => {
    event.preventDefault()

    const pdfDoc = await PDFDocument.create()
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

    const page = pdfDoc.addPage()
    // eslint-disable-next-line no-unused-vars
    const { width, height } = page.getSize()
    const fontSize = 30

    const formValues = event.target
    const userName = formValues[0].value
    const guardianName = formValues[1].value
    const hospitalName = formValues[2].value
    const dateOfBirth = formValues[3].value
    const timeOfBirth = formValues[4].value
    const location = formValues[5].value
    page.drawText(
      `Name: ${userName}\n\nGuardian's Name: ${guardianName}\n\nHospital: ${hospitalName}\n\nDate of Birth: ${dateOfBirth}\n\nTime of Birth: ${timeOfBirth}\n\nLocation: ${location}`,
      {
        x: 50,
        y: height - 4 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
      }
    )

    pdfDoc.setKeywords([
      userName,
      guardianName,
      hospitalName,
      dateOfBirth,
      timeOfBirth,
      location,
    ])

    pdfDoc.setTitle(userName)
    pdfDoc.setAuthor(guardianName)
    pdfDoc.setSubject(hospitalName)
    pdfDoc.setProducer(location)
    pdfDoc.setCreationDate(new Date(dateOfBirth))
    pdfDoc.setModificationDate(new Date(`${dateOfBirth}T${timeOfBirth}`))

    console.log(pdfDoc.getTitle())

    const pdfBytes = await pdfDoc.save()

    let formData = new FormData()
    formData.append("userName", userName)
    formData.append("guardianName", guardianName)
    formData.append("hospitalName", hospitalName)
    formData.append("location", location)
    formData.append("dateOfBirth", dateOfBirth)
    formData.append("timeOfBirth", timeOfBirth)

    const { data } = await axios.post("/api/create_certificate", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    downloadjs(pdfBytes, `${userName}_Certificate`, "application/pdf")
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Create Certificate</h1>
      <form
        className="ui form"
        style={{ width: "1000px", margin: "0 auto" }}
        onSubmit={handleSubmit}
      >
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
      </form>
    </div>
  )
}

export default CreateCertificate
