import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import { PDFDocument } from 'pdf-lib'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
// import multer from 'multer'
// const upload = multer()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const uploadDir = path.join(__dirname, '../pdf_file')

export const birthCreate = async (data) => {
  // Fetch the PDF with form fields
  console.log('Here32')
  const formUrl =
    'https://ipfs.io/ipfs/QmdqmPxb1g4hoKJijNpb4hm5zPtx8enuQTGq12wBHx6dEz' //Path of Form to Fill
  const formPdfBytes = await fetch(formUrl).then((res) => {
    console.log(res)
    res.arrayBuffer()
  })
  console.log('Here33')
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
  // Uint8Array(70271) [
  //    37,  80,  68, 70,  45,  49,  46,  55,  10,  37, 129, 129,
  //    129, 129,  10, 10,  54,  32,  48,  32, 111,  98, 106,  10,
  //     60,  60,  10, 47,  84, 121, 112, 101,  32,  47,  88,  79,
  //     98, 106, 101, 99, 116,  10,  47,  83, 117,  98, 116, 121,
  //    112, 101,  32, 47,  73, 109,  97, 103, 101,  10,  47,  66,
  //    105, 116, 115, 80, 101, 114,  67, 111, 109, 112, 111, 110,
  //    101, 110, 116, 32,  56,  10,  47,  87, 105, 100, 116, 104,
  //     32,  53,  49, 50,  10,  47,  72, 101, 105, 103, 104, 116,
  //     32,  53,  49, 50,
  //    ... 70171 more items
  //  ]

  // Trigger the browser to download the PDF document
  // download(pdfBytes, "pdf-lib_form_creation_example.pdf", "application/pdf");
  fs.writeFileSync(
    path.join(uploadDir, `${data.email}.pdf`),
    pdfBytes
    // req.file.buffer
  )
}
