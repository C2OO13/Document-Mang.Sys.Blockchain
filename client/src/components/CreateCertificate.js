import React from 'react'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import downloadjs from 'downloadjs'

const CreateCertificate = props => {

    const handleSubmit = async event => {
        event.preventDefault()
        const pdfDoc = await PDFDocument.create()
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
    
        const page = pdfDoc.addPage()
        // eslint-disable-next-line no-unused-vars
        const { width, height } = page.getSize()
        const fontSize = 30
        page.drawText(`Name: ${event.target[0].value}\n\nGuardian's Name: ${event.target[1].value}\n\nHospital: ${event.target[2].value}\n\nDate of Birth: ${event.target[3].value}\n\nTime of Birth: ${event.target[4].value}\n\nLocation: ${event.target[5].value}`, {
          x: 50,
          y: height - 4 * fontSize,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0.53, 0.71),
        })
    
        const pdfBytes = await pdfDoc.save()
        downloadjs(pdfBytes, "pdf-lib_creation_example.pdf", "application/pdf")
      }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Create Certificate</h1>
            <form className = "ui form" style={{width: '1000px', margin: '0 auto'}} onSubmit = {handleSubmit}>
                <label>Name:</label>
                <input type="text" required /><br /><br />
                <label>Guardian's Name:</label>
                <input type="text" required /><br /><br />
                <label>Hospital:</label>
                <input type="text" required /><br /><br />
                <label>Date of Birth:</label>
                <input type="date" required /><br /><br />
                <label>Time of Birth:</label>
                <input type="time" required /><br /><br />
                <label>Location:</label>
                <input type="text" required /><br /><br />
                <input type="submit" className="ui button primary" value="Create" />
            </form>
        </div>
    )
}

export default CreateCertificate