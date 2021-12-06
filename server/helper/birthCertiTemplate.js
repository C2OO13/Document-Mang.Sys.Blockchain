import { PDFDocument } from 'pdf-lib';
import fetch from "node-fetch";
// const { PDFDocument } = PDFLib;

const createFormTemplate = async () => {
  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create()

  // Add a blank page to the document
  const page = pdfDoc.addPage()


  // Get the form so we can add fields to it
  const form = pdfDoc.getForm()

  // Fetch the Issuing Institute Logo
  const logoUrl = 'https://play-lh.googleusercontent.com/h2Y6zwqavDtdH0JmRv63SyF2JvqZTCRsZHv6Lf4qONC0KtDLGT8CRa9tLih31bTU40od' //Path of Image
  const logoImageBytes = await fetch(logoUrl).then(res => res.arrayBuffer())

  // Embed the Issuing Institute Logo
  const logoImage = await pdfDoc.embedPng(logoImageBytes)

  // Add Issuing Institute Logo button field
  const issuingInstituteLogo = form.createButton('institue_logo')
  issuingInstituteLogo.addToPage('Logo of Issuing Institue', page, {
    x: 30,
    y: 700,
    width: 100,
    height: 100
  })

  // Add Issuing Institute Logo to the button
  issuingInstituteLogo.setImage(logoImage)

  //Locking the Field
  issuingInstituteLogo.enableReadOnly()

  // Add Issuing Institute Name
  const instituteNameValue = 'Surat Municipal Corporation' //Name of Institute 
  page.drawText(instituteNameValue, {
    x: 170,
    y: 735,
    size: 30
  })

  //Add Title to The Certificate
  const certificateTypeValue = 'Birth Certificate' //Type of Certificate
  page.drawText(certificateTypeValue, {
    x: 200,
    y: 650,
    size: 30,
  })

  //Locking the Field
  //certificateType.enableReadOnly()

  // Add The Certification paragraph 
  const certificationParaValue = 'This is to certify that the following details are taken from the register of the new-borns in Surat: ' //Depends on Certificate Type 
  page.drawText(certificationParaValue, {
    x: 50,
    y: 600,
    size: 12
  })

  //Add field for details of the child (This part of code is required to be created manually everytime a new type of certificate is added.)
  //Field for Name of Child
  page.drawText('Name : ', {
    x: 100,
    y: 550,
    size: 12
  })
  const childName = form.createTextField('child_name')
  childName.addToPage(page, {
    x: 250,
    y: 550,
    size: 12,
    height: 15,
    //backgroundColor: rgb(1, 1, 1),
    borderWidth: 0
  })

  //Field for Guardian of the Child
  page.drawText('Guardian\'s Name : ', {
    x: 100,
    y: 525,
    size: 12
  })
  const guardianName = form.createTextField('guardian_name')
  guardianName.addToPage(page, {
    x: 250,
    y: 525,
    size: 12,
    height: 15,
    //backgroundColor: rgb(1, 1, 1),
    borderWidth: 0
  })

  //Field for Hospital of birth
  page.drawText('Hospital Name : ', {
    x: 100,
    y: 500,
    size: 12
  })
  const hospitalName = form.createTextField('hospital_name')
  hospitalName.addToPage(page, {
    x: 250,
    y: 500,
    size: 12,
    height: 15,
    //backgroundColor: rgb(1, 1, 1),
    borderWidth: 0
  })

  //Field for Date of Birth
  page.drawText('Date of Birth : ', {
    x: 100,
    y: 475,
    size: 12
  })
  const dateOfBirth = form.createTextField('date_of_birth')
  dateOfBirth.addToPage(page, {
    x: 250,
    y: 475,
    size: 12,
    height: 15,
    //backgroundColor: rgb(1, 1, 1),
    borderWidth: 0
  })

  //Field for Time of Birth
  page.drawText('Time of Birth : ', {
    x: 100,
    y: 450,
    size: 12
  })
  const timeOfBirth = form.createTextField('time_of_birth')
  timeOfBirth.addToPage(page, {
    x: 250,
    y: 450,
    size: 12,
    height: 15,
    //backgroundColor: rgb(1, 1, 1),
    borderWidth: 0
  })

  //Field for Location of birth
  page.drawText('Location : ', {
    x: 100,
    y: 425,
    size: 12
  })
  const location = form.createTextField('location_of_birth')
  location.addToPage(page, {
    x: 250,
    y: 425,
    size: 12,
    height: 15,
    //backgroundColor: rgb(1, 1, 1),
    borderWidth: 0
  })

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save()

  // Trigger the browser to download the PDF document
  download(pdfBytes, "pdf-lib_form_creation_example.pdf", "application/pdf");
}

export default createFormTemplate;