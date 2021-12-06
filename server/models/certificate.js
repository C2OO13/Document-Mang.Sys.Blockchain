import mongoose from 'mongoose';

const certiSchema = mongoose.Schema({
    name: String,
    file: File,
});

const Certificate = mongoose.model('Certificate', certiSchema);

export default Certificate;
