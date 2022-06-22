import fs from 'fs'
import path from 'path'
import { PDFDocument } from 'pdf-lib'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
// import axios from 'axios'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const uploadDir = path.join(__dirname, '../pdf_file')
const template = path.join(__dirname, '../pdfHelpers/birthTemplate.pdf')

export const birthCreate = async (data) => {
  // Fetch the PDF with form fields
  // const formUrl =
  //   'https://ipfs.io/ipfs/QmdqmPxb1g4hoKJijNpb4hm5zPtx8enuQTGq12wBHx6dEz' //Path of Form to Fill

  
  const formPdfBytes = fs.readFileSync(template)

  // Load a PDF with form fields
  const pdfDoc = await PDFDocument.load(formPdfBytes)
  
  // Get the form containing all the fields
  const form = pdfDoc.getForm()
  
  // Get all fields in the PDF by their names
  const childName = form.getTextField('child_name')
  const guardianName = form.getTextField('guardian_name')
  const hospitalName = form.getTextField('hospital_name')
  const dateOfBirth = form.getTextField('date_of_birth')
  const timeOfBirth = form.getTextField('time_of_birth')
  const location = form.getTextField('location_of_birth')

  //Fill The Fields
  childName.setText(data.childName)
  childName.enableReadOnly()
  guardianName.setText(data.guardianName)
  guardianName.enableReadOnly()
  hospitalName.setText(data.hospitalName)
  hospitalName.enableReadOnly()
  dateOfBirth.setText(data.dateOfBirth)
  dateOfBirth.enableReadOnly()
  timeOfBirth.setText(data.timeOfBirth)
  timeOfBirth.enableReadOnly()
  location.setText(data.location)
  location.enableReadOnly()

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save()
  // console.log(pdfBytes);// answer below
  
  // Trigger the browser to download the PDF document
  // download(pdfBytes, "pdf-lib_form_creation_example.pdf", "application/pdf");
  fs.writeFileSync(
    path.join(uploadDir, `${data.email}_birth.pdf`),
    pdfBytes
  )
}
