import BirthCert from '../models/BirthCert.js';

export const getBirthCert = async (req, res) => {
    try {
        const certi = await BirthCert.find();
        res.status(200).json(certi);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}
//

export const createBirthCert = async (req, res) => {
    const body = req.body;
    const newBirthCert = new BirthCert(body);
    try {
        newBirthCert.save();
        //blockchain save
        //creti download
        //call pdf genreate and download
        res.status(201).json(newBirthCert);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};