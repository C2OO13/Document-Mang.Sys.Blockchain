import BirthCert from '../models/BirthCert.js';

export const getBirthCert = async (req, res) => {
    try {
        const certi = await BirthCert.find();
        //console.log(certi);
        res.status(200).json(certi);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}

export const createBirthCert = async (req, res) => {
    //console.log("hola");
    //console.log(req);
    const body = req.body;
    //console.log(body);
    const newBirthCert = new BirthCert(body); 
    try {
        newBirthCert.save();
        res.status(201).json(newBirthCert);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};