
import fetch from 'node-fetch'
import {PDFDocument} from 'pdf-lib'


async function readForm() {
    // Fetch the PDF with form fields
    const formUrl = 'https://ipfs.io/ipfs/QmZNQ1sFNR4qQpXmQqt7suz65dTSNTMcRkYPdcnhmBbxkD' //Path of Form to Fill
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

    //Set Meta Data for Verification
    //pdfDoc.setKeywords([, , , , , ])

    //Read The Fields
    const childNameValue = childName.getText()
    const guardianNameValue = guardianName.getText()
    const hospitalNameValue = hospitalName.getText()
    const dateOfBirthValue = dateOfBirth.getText()
    const timeOfBirthValue = timeOfBirth.getText()
    const locationValue = location.getText()

    console.log(childNameValue)
    console.log(guardianNameValue)
    console.log(hospitalNameValue)
    console.log(dateOfBirthValue)
    console.log(timeOfBirthValue)
    console.log(locationValue)
        
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()

    // Trigger the browser to download the PDF document
    // download(pdfBytes, "pdf-lib_form_creation_example.pdf", "application/pdf");
}

readForm();