import React from 'react'
import axios from '../api'

const VerifyCertificate = () => {
  // const getBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader()
  //     reader.readAsDataURL(file)
  //     reader.onload = () => resolve(reader.result)
  //     reader.onerror = (error) => reject(error)
  //   })
  // }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const file = event.target[0].files[0]
    console.log(file)
    console.log(event.target[1].value)
    if (file.type !== 'application/pdf') {
      alert('Please upload file in pdf format only!')
      return
    }

    let formData = new FormData()

    // console.log(event)
    formData.append('type', event.target[1].value)
    formData.append('certificate', file)

    await axios.post('/verify', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    // const d = await getBase64(file)
    // // console.log('Data', d)
    // console.log({ name: file.name, data: JSON.stringify(d) })
    // const { data } = await axios.post('/api/verify_pdf', {
    //   name: file.name,
    //   data: JSON.stringify(d),
    // })
    // console.log(data)

    // if (data.verification) {
    //   alert('Verified!')
    // } else {
    //   alert('Not Verified!')
    // }

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
      <h1 style={{ textAlign: 'center' }}>Verify Certificate</h1>
      <form
        className="ui form"
        style={{ width: '1000px', margin: '0 auto' }}
        onSubmit={handleSubmit}
      >
        <label>Upload Certificate:</label>
        <input type="file" accept=".pdf" required />
        <br />
        <br />
        <label>For:</label>
        <br />
        <br />
        <input
          type="radio"
          id="Birth"
          name="certificate"
          value="Birth"
          required
        />
        <label htmlFor="Birth"> Birth Certificate</label>
        <br />
        <input type="radio" id="Aadhar" name="certificate" value="Aadhar" />
        <label htmlFor="Aadhar"> Aadhar Card</label>
        <br />
        <input type="radio" id="Passport" name="certificate" value="Passport" />
        <label htmlFor="Passport"> Passport</label>
        <br />
        <br />
        <input type="submit" className="ui button primary" value="Verify" />
      </form>
    </div>
  )
}

export default VerifyCertificate
