import React from "react"
// import { PDFDocument } from "pdf-lib"
import axios from "../api"
import getDataFromPDF from '../helper/readPDF.js';

const VerifyCertificate = () => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(event.target[1].files[0]);
    const file = event.target[1].files[0]
    if (file.type !== "application/pdf") {
      alert("Please upload file in pdf format only!")
      return
    }
    
    const data = getDataFromPDF(file.name);
    console.log("123121321")
    console.log(data)
    // await axios.post("/api/get_certificate", keywords[0]);



    // const pdfBytes = fs.readFile('./abc.pdf').then((res) => res.arrayBuffer())
    // console.log(pdfBytes)
    // // Load the PDF document without updating its existing metadata
    // const pdfDoc = await PDFDocument.load(pdfBytes, {
    //   updateMetadata: false,
    // })
    // console.log("asdasdasdasdadasdasd");



    // // Read all available metadata fields
    // const title = pdfDoc.getTitle()
    // const author = pdfDoc.getAuthor()
    // const subject = pdfDoc.getSubject()
    // const producer = pdfDoc.getProducer()
    // const creationDate = pdfDoc.getCreationDate()
    // const modificationDate = pdfDoc.getModificationDate()
    // const keywords = pdfDoc.getKeywords();
    // console.log(keywords);
    // console.log(title);
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
