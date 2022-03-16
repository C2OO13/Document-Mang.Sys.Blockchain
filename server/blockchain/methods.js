import { config } from 'dotenv';
config({ path: '../.env' });
import MainContract from "./MainContract.js";
import web3 from "./web3.js";
import { getIpfsLink } from './getIpfsLink.js';
import { birthCreate } from '../pdfHelpers/birthCreate.js';
import { aadharCreate } from '../pdfHelpers/aadharCreate.js';
import { passportCreate } from '../pdfHelpers/passportCreate.js';
import { birthRead } from '../pdfHelpers/birthRead.js';
import { aadharRead } from '../pdfHelpers/aadharRead.js';
import { passportRead } from '../pdfHelpers/passportRead.js';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
const uploadDir = path.join(__dirname, '../pdf_file')

const signer = web3.eth.accounts.privateKeyToAccount(process.env.SIGNER_PRIVATE_KEY);
web3.eth.accounts.wallet.add(signer);
const address = signer.address;


export const verifyCerti = async (req, res) => {
    try {
        const { type, email } = req.body;
        const file = req.file.buffer;
        var inputData, storedData;
        fs.writeFileSync(path.join(uploadDir, `Input${email}.pdf`))
        const link = await getIpfsLink(`Input${email}`);
        switch (type) {
            case 1: {
                inputData = birthRead(link);
                storedData = await MainContract.methods
                    .getBirthCerti(email)
                    .call();
                storedData = birthRead(storedData[2])
                break;
            }
            case 2: {
                inputData = aadharRead(link);
                storedData = await MainContract.methods
                    .getAadharCard(email)
                    .call();
                storedData = aadharRead(storedData[2])
                break;
            }
            case 3: {
                inputData = passportRead(link);
                storedData = await MainContract.methods
                    .getPassportCerti(email)
                    .call();
                storedData = passportRead(storedData[2])
                break;
            }
        }

        var chk = true;
        for (var i = 0; i < inputData.length; i++) {
            if (inputData[i] != storedData[i]) {
                chk = false;
                break;
            }
        }
        return res.send(JSON.stringify(chk));

    } catch (error) {
        console.log(error);
        return res.send(JSON.stringify(false));
    }
}

export const newBirthCerti = async (req, res) => {
    try {
        var data = req.body;
        await birthCreate(data);
        const link = await getIpfsLink(data.email);
        await MainContract.methods
            .newBirthCerti(req.body.email, req.body.childName, req.body.dateOfBirth, link, "")
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(true));

    } catch (error) {
        console.log(error);
        return res.send(JSON.stringify(false));
    }
}

export const setBirthCerti = async (req, res) => {
    try {
        var data = req.body;
        await birthCreate(data);
        const link = await getIpfsLink(data.email);
        await MainContract.methods
            .setBirthCerti(req.body.email, req.body.childName, req.body.dateOfBirth, link, "")
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(true));

    } catch (error) {
        console.log(error);
        return res.send(false);
    }
}

export const approveBirthCerti = async (req, res) => {
    try {
        await MainContract.methods
            .approveBirthCerti(req.body.email)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(true));

    } catch (error) {
        console.log(error);
        return res.send(false);
    }
}



export const rejectBirthCerti = async (req, res) => {
    try {
        await MainContract.methods
            .rejectBirthCerti(req.body.email)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(true));

    } catch (error) {
        console.log(error);
        return res.send(false);
    }
}
//req.file.buffer ma file avse
// req.body.type

export const getTopBirthCerti = async (req, res) => {
    try {
        const data = await MainContract.methods
            .topBirthCerti()
            .call();

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const getBirthCerti = async (req, res) => {
    try {
        const data = await MainContract.methods
            .getBirthCerti(req.body.email)
            .call();

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const getCountPendingBirthCerti = async (req, res) => {
    try {
        const data = await MainContract.methods
            .getCountPendingBirthCerti()
            .call();

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const newAadharCard = async (req, res) => {
    try {
        var data = req.body;
        await aadharCreate(data);
        const link = await getIpfsLink(data.email);
        await MainContract.methods
            .newAadharCard(req.body.email, req.body.applicantName, req.body.contactNo, link, "")
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(true));

    } catch (error) {
        console.log(error);
        return res.send(false);
    }
}

export const setAadharCard = async (req, res) => {
    try {
        var data = req.body;
        await aadharCreate(data);
        const link = await getIpfsLink(data.email);
        await MainContract.methods
            .setAadharCard(req.body.email, req.body.applicantName, req.body.contactNo, link, "")
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(true));

    } catch (error) {
        console.log(error);
        return res.send(false);
    }
}

export const approveAadharCard = async (req, res) => {
    try {
        await MainContract.methods
            .approveAadharCard(req.body.email)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(true));

    } catch (error) {
        console.log(error);
        return res.send(false);
    }
}

export const getTopAadharCerti = async (req, res) => {
    try {
        const data = await MainContract.methods
            .topAadharCerti()
            .call();

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}


export const rejectAadharCard = async (req, res) => {
    try {
        await MainContract.methods
            .rejectAadharCard(req.body.email)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(true));

    } catch (error) {
        console.log(error);
        return res.send(false);
    }
}

export const getAadharCard = async (req, res) => {
    try {
        const data = await MainContract.methods
            .getAadharCard(req.body.acc)
            .call();

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const getCountPendingAadharCard = async (req, res) => {
    try {
        const data = await MainContract.methods
            .getCountPendingAadharCard()
            .call();

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const shareCerti = async (req, res) => {
    try {
        await MainContract.methods
            .shareCerti(req.body.email, req.body.toShareEmail, req.body.type, 5)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(true));

    } catch (error) {
        console.log(error);
        return res.send(false);
    }
}

export const checkIfSharedCerti = async (req, res) => {
    try {
        const data = await MainContract.methods
            .checkIfSharedCerti(req.body.email, req.body.toShareEmail, req.body.type)
            .call();

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const newPassportCerti = async (req, res) => {
    try {
        var data = req.body;
        await passportCreate(data);
        const link = await getIpfsLink(data.email);
        await MainContract.methods
            .newPassportCerti(req.body.email, req.body.applicantName, req.body.dateOfBirth, link, '')
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(true));

    } catch (error) {
        console.log(error);
        return res.send(false);
    }
}

export const setPassportCerti = async (req, res) => {
    try {
        var data = req.body;
        await passportCreate(data);
        const link = await getIpfsLink(data.email);
        await MainContract.methods
            .setPassportCerti(req.body.email, req.body.applicantName, req.body.dateOfBirth, link, '')
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(true));

    } catch (error) {
        console.log(error);
        return res.send(false);
    }
}

export const approvePassportCerti = async (req, res) => {
    try {
        await MainContract.methods
            .approvePassportCerti(req.body.email)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(true));

    } catch (error) {
        console.log(error);
        return res.send(false);
    }
}

export const getTopPassportCerti = async (req, res) => {
    try {
        const data = await MainContract.methods
            .topPassportCerti()
            .call();

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const rejectPassportCerti = async (req, res) => {
    try {
        await MainContract.methods
            .rejectPassportCerti(req.body.acc)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(true));

    } catch (error) {
        console.log(error);
        return res.send(false);
    }
}

export const getPassportCerti = async (req, res) => {
    try {
        const data = await MainContract.methods
            .getPassportCerti(req.body.acc)
            .call();

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const getCountPendingPassportCerti = async (req, res) => {
    try {
        const data = await MainContract.methods
            .getCountPendingPassportCerti()
            .call();

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const getOwner = async (req, res) => {
    console.log("Request owner received!");
    try {
        const data = await MainContract.methods
            .owner()
            .call();
        // console.log(data);
        res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        // res.send(error.message);
    }
}

export const getUser = async (req, res) => {
    try {
        const data = await MainContract.methods
            .getUser(req.body.accName)
            .call();
        // console.log(data);
        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}

export const getId = async (req, res) => {
    try {
        const data = await MainContract.methods
            .getId(req.body.accName)
            .call();
        // console.log(data);
        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}

export const isAdmin = async (req, res) => {
    try {
        const data = await MainContract.methods
            .isAdmin(req.body.accName)
            .call();
        // console.log(data);
        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}


export const isApprover = async (req, res) => {
    try {
        const data = await MainContract.methods
            .isApprover(req.body.accName)
            .call();

        return res.send(JSON.stringify(data));
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}


export const isApplicant = async (req, res) => {
    try {
        var data = await MainContract.methods
            .getUser(req.body.accName)
            .call();
        if (data[3] == 1) data = true;
        else data = false;
        return res.send(JSON.stringify(data));
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}

export const login = async (req, res) => {
    try {
        console.log('=====================================', req.body);
        const data = await MainContract.methods
            .login(req.body.accName, req.body.password)
            .call();
        return res.send(JSON.stringify(data));
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}

export const registerApplicant = async (req, res) => {
    console.log("register applicant")
    try {
        await MainContract.methods
            .registerApplicant(req.body.accName, req.body.name, req.body.password)
            .send({ from: address, gas: "300000" });
        // console.log(data)
        return res.send(JSON.stringify(true));

    } catch (error) {
        console.log(error);
        return res.send(false);
    }
}

export const registerApprover = async (req, res) => {
    try {
        await MainContract.methods
            .registerApplicant(req.body.accNameAdmin, req.body.passwordAdmin, req.body.accName, req.body.name, req.body.password)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(true));

    } catch (error) {
        console.log(error);
        return res.send(false);
    }
}

export const registerAdmin = async (req, res) => {
    try {
        await MainContract.methods
            .registerAdmin(req.body.accName, req.body.name, req.body.password)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(true));

    } catch (error) {
        console.log(error);
        return res.send(false);
    }
}

export const changePassword = async (req, res) => {
    try {
        await MainContract.methods
            .changePassword(req.body.accName, req.body.password, req.body.newPassword)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(true));

    } catch (error) {
        console.log(error);
        return res.send(false);
    }
}
/*
export const newCertificate = async (acc, hash, desc) => {
    try {

        await MainContract.methods
            .newCertificate(acc, hash, desc)
            .send({ from: address, gas: "300000" });

        const id = await MainContract.methods
            .lastID()
            .call();

        return JSON.stringify(id);
    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const getCertificate = async (id) => {
    try {

        const data = await MainContract.methods
            .getCertificate(id)
            .call();

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const setCertificate = async (id, acc, hash, desc) => {
    try {

        await MainContract.methods
            .setCertificate(id, acc, hash, desc)
            .send({ from: address, gas: "300000" });

        return JSON.stringify('Success');
    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const setActive = async (id, state) => {
    try {
        await MainContract.methods
            .setActive(id, state)
            .send({ from: address, gas: "300000" });
        return JSON.stringify('Success');
    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}
*/