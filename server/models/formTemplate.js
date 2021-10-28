import mongoose from 'mongoose';

const formSchema = mongoose.Schema({
    clientID: String,
    formName: String,
    formFields: Array,
    formTemplate: File,
    /*https://www.codementor.io/@prasadsaya/working-with-arrays-in-mongodb-16s303gkd3 */
});

const FormTemplate = mongoose.model('FormTemplate', formSchema);

export default FormTemplate;
