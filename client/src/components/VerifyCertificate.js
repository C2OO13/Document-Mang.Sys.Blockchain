import React from "react"
import { PDFDocument } from "pdf-lib"

const VerifyCertificate = () => {
  const handleSubmit = async (event) => {
    event.preventDefault()

    const file = event.target[0].files[0]
    if (file.type !== "application/pdf") {
      alert("Please upload file in pdf format only!")
      return
    }

    const fileURL = event.target[0].value

    // read Metadata and verify if such certificate exists
    // pdf url required to read meta data: https://jsfiddle.net/Hopding/eg8rfz3k/16/
    const pdfUrl = fileURL
    const pdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer())

    // Load the PDF document without updating its existing metadata
    const pdfDoc = await PDFDocument.load(pdfBytes, {
      updateMetadata: false,
    })

    // Read all available metadata fields
    const title = pdfDoc.getTitle()
    const author = pdfDoc.getAuthor()
    const subject = pdfDoc.getSubject()
    const producer = pdfDoc.getProducer()
    const creationDate = pdfDoc.getCreationDate()
    const modificationDate = pdfDoc.getModificationDate()
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Verify Certificate</h1>
      <form
        className="ui form"
        style={{ width: "1000px", margin: "0 auto" }}
        onSubmit={handleSubmit}
      >
        <label>Enter a shareable link to the certificate:</label>
        <input type="url" required />
        <br />
        <br />
        <label>Upload Certificate:</label>
        <input type="file" accept=".pdf" required />
        <br />
        <br />
        <input type="submit" className="ui button primary" value="Verify" />
      </form>
    </div>
  )
}

export default VerifyCertificate
