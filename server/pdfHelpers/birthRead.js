import fetch from 'node-fetch'
import { PDFDocument } from 'pdf-lib'
import axios from 'axios'

export const birthRead = async (link) => {
  // Fetch the PDF with form fields
  const formUrl = link //Path of Form to Fill
  const formPdfBytes = await axios.get(formUrl, {
    responseType: 'arraybuffer',
  })

  // Load a PDF with form fields
  const pdfDoc = await PDFDocument.load(formPdfBytes.data)

  // Get the form containing all the fields
  const form = pdfDoc.getForm()

  // Get all fields in the PDF by their names
  const childName = form.getTextField('child_name')
  const guardianName = form.getTextField('guardian_name')
  const hospitalName = form.getTextField('hospital_name')
  const dateOfBirth = form.getTextField('date_of_birth')
  const timeOfBirth = form.getTextField('time_of_birth')
  const location = form.getTextField('location_of_birth')

  // Read The Field  Values
  var data = []
  data.push(childName.getText())
  data.push(guardianName.getText())
  data.push(hospitalName.getText())
  data.push(dateOfBirth.getText())
  data.push(timeOfBirth.getText())
  data.push(location.getText())

  console.log(data)

  return data
}
