import Certificate from '../models/certificate.js';
import { getCertificate, newCertificate } from '../blockchain/methods.js';
import { getHash } from '../helper/getHash.js';
import fillForm from '../helper/BirthCertiTemplateFill.js';
import getDataFromPDF from "../controllers/pdfReader.js";

export const getCertificateOne = async (req, res) => {
    const body = req.body;
    console.log('BODY', body);
    try {
        const certi = await Certificate.findOne({ name: body.name, });
        console.log(certi)
        // const b_certi = JSON.parse(await getCertificate(certi.id));

        res.status(200).json(b_certi);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}

export const getCertificate = async (req, res) => {
    try {
        const certi = await Certificate.find();
        res.status(200).json(certi);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}
export const createCertificate = async (req, res) => {
    const body = req.body;
    console.log("ASDDDDDDDDD");
    console.log(body);
    var id;
    const hash = getHash(body);
    // fillForm(body);
    try {
        id = JSON.parse(await newCertificate("0x1840A76Cd21f1c1aEC33CC6C0Ec2b42b6ed64de5", hash, body.name));
    }
    catch (e) {
        console.log(e.message);
    }
    body.blockchain_id = id;
    body.hash = hash;
    const newCertificate = new Certificate(body);
    try {
        newCertificate.save();
        newCertificate.getDataFromPDF();
        // fillForm(body);
        //creti download
        //call pdf genreate and download
        res.status(201).json(newCertificate);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};