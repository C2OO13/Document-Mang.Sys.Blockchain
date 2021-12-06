import mongoose from 'mongoose';

const certiSchema = mongoose.Schema({
    file: File,
});

const Certificate = mongoose.model('Certificate', certiSchema);

export default Certificate;
