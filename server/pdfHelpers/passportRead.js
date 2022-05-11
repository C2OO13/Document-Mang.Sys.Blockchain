import fetch from 'node-fetch'
import { PDFDocument } from 'pdf-lib'
import axios from 'axios'

export const passportRead = async (link) => {
  // Fetch the PDF with form fields
  const formUrl = link //Path of Form to Fill
  const formPdfBytes = await axios.get(formUrl, {
    responseType: 'arraybuffer',
  })

  // Load a PDF with form fields
  const pdfDoc = await PDFDocument.load(formPdfBytes.data)

  // Get the form containing all the fields
  const form = pdfDoc.getForm()

  const applicantName = form.getTextField('applicant_name')
  const fatherName = form.getTextField('father_name')
  const motherName = form.getTextField('mother_name')
  const address = form.getTextField('address')
  const contactNo = form.getTextField('contact_no')
  const dateOfBirth = form.getTextField('date_of_birth')

  // Read The Field  Values
  var data = []
  data.push(applicantName.getText())
  data.push(fatherName.getText())
  data.push(motherName.getText())
  data.push(address.getText())
  data.push(contactNo.getText())
  data.push(dateOfBirth.getText())

  console.log(data)

  return data
}
