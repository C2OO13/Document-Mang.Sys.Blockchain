import BirthCert from '../models/BirthCert.js';
import { getCertificate, newCertificate } from '../blockchain/methods.js';
import { getHash } from '../helper/getHash.js';

export const verifyBirthCertOne = async (data) => {
    console.log("Mydata", data);
    try {
        const certi = await BirthCert.findOne({ name: data.name, guardian: data.guardian });
        console.log(certi)
        const b_certi = JSON.parse(await getCertificate(certi.blockchain_id));
        console.log(b_certi);
        const hash = getHash(data);
        console.log('Calculated hash: ', hash);
        if (hash == b_certi[1]) return true;
        else return false;
        // res.status(200).json(true);
    } catch (error) {
        console.log(error);
        return false;
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
    console.log(body);
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
        res.status(201).json(newBirthCert);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};