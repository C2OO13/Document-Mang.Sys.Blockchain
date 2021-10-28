import mongoose from 'mongoose';

const birthSchema = mongoose.Schema({
    name: String,
    guardian: String,
    hospital: String,
    dob: Date,
    tob: Date,
    location: String,
    /*Save time as type: String
    const userInput = '05:20';
    const hours = userInput.slice(0, 2);
    const minutes = userInput.slice(3);
    Save date time in type: Date
    But in second option you have to create Date object and set hours and minutes:
    const date = new Date(dateString);
    date.setHours(hours, minutes); */
});

const BirthCert = mongoose.model('BirthCert', birthSchema);

export default BithCert;
