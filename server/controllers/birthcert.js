import BirthCert from '../models/BirthCert.js';
import { getCertificate, newCertificate } from '../blockchain/methods.js';
import { getHash } from '../helper/getHash.js';

export const getBirthCertOne = async (req, res) => {
    const body = req.body;
    try {
        const certi = await BirthCert.findOne({ name: body.name, guardian: body.guardian });
        const b_certi = JSON.parse(await getCertificate(certi.id));

        res.status(200).json(b_certi);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}

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
export const createBirthCert = async (req, res) => {
    const body = req.body;
    var id;
    const hash = getHash(body);
    try {
        id = JSON.parse(await newCertificate("0x1840A76Cd21f1c1aEC33CC6C0Ec2b42b6ed64de5", hash, body.name));
    }
    catch (e) {
        console.log(e.message);
    }
    body.blockchain_id = id;
    body.hash = hash;
    const newBirthCert = new BirthCert(body);
    try {
        newBirthCert.save();
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