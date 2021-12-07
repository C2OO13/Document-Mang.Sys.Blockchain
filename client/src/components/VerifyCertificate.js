import React from "react"
import axios from "../api"

const VerifyCertificate = () => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const file = event.target[0].files[0]
    if (file.type !== "application/pdf") {
      alert("Please upload file in pdf format only!")
      return
    }

    let formData = new FormData()
    formData.append("file", file)
    formData.append("name", file.name)
    const { data } = await axios.post("/api/verify_pdf", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    // data.data has info about certificate being uploaded

    if (data.verification) {
      alert("Verified!")
    } else {
      alert("Not Verified!")
    }

    // await axios.post("/api/get_certificate", keywords[0]);

    // const pdfBytes = fs.readFile('./abc.pdf').then((res) => res.arrayBuffer())
    // console.log(pdfBytes)
    // // Load the PDF document without updating its existing metadata
    // const pdfDoc = await PDFDocument.load(pdfBytes, {
    //   updateMetadata: false,
    // })

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
