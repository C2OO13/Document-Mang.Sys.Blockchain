import fetch from 'node-fetch'
import { PDFDocument } from 'pdf-lib'

export const aadharCreate = async (data) => {
  // Fetch the PDF with form fields
  const formUrl =
    'https://ipfs.io/ipfs/QmVfydetmBLamwik4bHjMQKWZQBaCVzm1zGssuN4SfoDqa' //Path of Form to Fill
  const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer())

  // Load a PDF with form fields
  const pdfDoc = await PDFDocument.load(formPdfBytes)

  // Get the form containing all the fields
  const form = pdfDoc.getForm()

  // Get all fields in the PDF by their names
  const applicantName = form.getTextField('applicant_name')
  const fatherName = form.getTextField('father_name')
  const address = form.getTextField('address')
  const contactNo = form.getTextField('contact_no')

  //Fill The Fields
  applicantName.setText(data.applicantName)
  applicantName.enableReadOnly()
  fatherName.setText(data.fatherName)
  fatherName.enableReadOnly()
  address.setText(data.address)
  address.enableReadOnly()
  contactNo.setText(data.contactNo)
  contactNo.enableReadOnly()

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save()

  // Trigger the browser to download the PDF document
  // download(pdfBytes, "pdf-lib_form_creation_example.pdf", "application/pdf");
  return pdfBytes
}
