import fetch from 'node-fetch'
import { PDFDocument } from 'pdf-lib'

export const aadharRead = async (link) => {
    // Fetch the PDF with form fields
    const formUrl = link //Path of Form to Fill
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())

    // Load a PDF with form fields
    const pdfDoc = await PDFDocument.load(formPdfBytes)

    // Get the form containing all the fields
    const form = pdfDoc.getForm()

    // Read The Field  Values
    var data = {};

    const applicantName = form.getTextField('applicant_name')
    const fatherName = form.getTextField('father_name')
    const address = form.getTextField('address')
    const contactNo = form.getTextField('contact_no')

    // Read The Field  Values
    data.applicantNameValue = applicantName.getText()
    data.fatherNameValue = fatherName.getText()
    data.addressValue = address.getText()
    data.contactNoValue = contactNo.getText()

    console.log(data)

    return data;
}