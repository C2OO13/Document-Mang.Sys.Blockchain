import fetch from 'node-fetch'
import { PDFDocument } from 'pdf-lib'
import axios from 'axios'

export const aadharRead = async (link) => {
  // Fetch the PDF with form fields
  const formUrl = link //Path of Form to Fill
  const formPdfBytes = await axios.get(formUrl, {
    responseType: 'arraybuffer',
  })

  // Load a PDF with form fields
  const pdfDoc = await PDFDocument.load(formPdfBytes.data)

  // Get the form containing all the fields
  const form = pdfDoc.getForm()

  // Read The Field  Values
  var data = []

  const applicantName = form.getTextField('applicant_name')
  const fatherName = form.getTextField('father_name')
  const address = form.getTextField('address')
  const contactNo = form.getTextField('contact_no')

  // Read The Field  Values
  data.push(applicantName.getText())
  data.push(fatherName.getText())
  data.push(address.getText())
  data.push(contactNo.getText())

  console.log(data)

  return data
}
