import fetch from 'node-fetch'
import {PDFDocument} from 'pdf-lib'

export const birthRead = async (link) => {
    // Fetch the PDF with form fields
    const formUrl = link //Path of Form to Fill
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
    
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

    // Read The Field  Values
    var data = {};
    data.childNameValue = childName.getText()
    data.guardianNameValue = guardianName.getText()
    data.hospitalNameValue = hospitalName.getText()
    data.dateOfBirthValue = dateOfBirth.getText()
    data.timeOfBirthValue = timeOfBirth.getText()
    data.locationValue = location.getText()

    console.log(data)

    return data;
}