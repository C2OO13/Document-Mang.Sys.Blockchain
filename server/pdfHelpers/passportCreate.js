import fetch from 'node-fetch'
import { PDFDocument } from 'pdf-lib'

export const passportCreate = async (data) => {
    // Fetch the PDF with form fields
    const formUrl = 'https://ipfs.io/ipfs/QmcAxLUaxpe6GJFS7dqfbj6no8g68GFxNFf9MXr5Y7au6U' //Path of Form to Fill
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())

    // Load a PDF with form fields
    const pdfDoc = await PDFDocument.load(formPdfBytes)

    // Get the form containing all the fields
    const form = pdfDoc.getForm()

    // Get all fields in the PDF by their names
    const applicantName = form.getTextField('applicant_name')
    const fatherName = form.getTextField('father_name')
    const motherName = form.getTextField('mother_name')
    const address = form.getTextField('address')
    const contactNo = form.getTextField('contact_no')
    const dateOfBirth = form.getTextField('date_of_birth')

    //Fill The Fields
    applicantName.setText(data.applicantName)
    applicantName.enableReadOnly()
    fatherName.setText(data.fatherName)
    fatherName.enableReadOnly()
    motherName.setText(data.motherName)
    motherName.enableReadOnly()
    address.setText(data.address)
    address.enableReadOnly()
    contactNo.setText(data.contactNo)
    contactNo.enableReadOnly()
    dateOfBirth.setText(data.dateOfBirth)
    dateOfBirth.enableReadOnly()

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()


    // Trigger the browser to download the PDF document
    // download(pdfBytes, "pdf-lib_form_creation_example.pdf", "application/pdf");
    return pdfBytes;
}

