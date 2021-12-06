import formTemplate from '../models/formTemplate.js';

export const getTemplate = async (req, res) => {
    try {
        const temp = await formTemplate.find();
        res.status(200).json(temp);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}

export const createTemplate = async (req, res) => {
    const body = req.body;
    const newTemplate = new formTemplate(body); 
    try {
        newTemplate.save();
        res.status(201).json(newTemplate);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};