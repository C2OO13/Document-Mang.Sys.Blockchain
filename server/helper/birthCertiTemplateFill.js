import { PDFDocument } from 'pdf-lib';
import fetch from "node-fetch";
// const { PDFDocument } = PDFLib;

const fillForm = async (data) => {
    // Fetch the PDF with form fields
    const formUrl = 'https://drive.google.com/file/d/1lNLZG9LbwXvZXenVXKaCNB3KUUwT1yVN/view?usp=sharing'; //Path of Form to Fill
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());

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

    //Set Meta Data for Verification
    pdfDoc.setKeywords([data])

    //Fill The Fields
    childName.setText(data.name)
    guardianName.setText(data.guardian)
    hospitalName.setText(data.hospital)
    dateOfBirth.setText(data.dob)
    timeOfBirth.setText(data.tob)
    location.setText(data.location)

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()

    // Trigger the browser to download the PDF document
    download(pdfBytes, "pdf-lib_form_creation_example.pdf", "application/pdf");
}

export default fillForm;
