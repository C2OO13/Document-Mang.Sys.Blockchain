import { config } from 'dotenv';
config({ path: '../.env' });
import MainContract from "./MainContract.js";
import web3 from "./web3.js";

const signer = web3.eth.accounts.privateKeyToAccount(process.env.SIGNER_PRIVATE_KEY);
web3.eth.accounts.wallet.add(signer);
const address = signer.address;

export const newBirthCerti = async (req, res) => {
    try {
        const data = await MainContract.methods
            .newBirthCerti(req.body.acc, req.body.name, req.body.dob, req.body.ipfsHash, req.body.desc)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const setBirthCerti = async (req, res) => {
    try {
        const data = await MainContract.methods
            .setBirthCerti(req.body.acc, req.body.name, req.body.dob, ipfsHash, req.body.desc)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const approveBirthCerti = async (req, res) => {
    try {
        const data = await MainContract.methods
            .approveBirthCerti(req.body.acc)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const rejectBirthCerti = async (req, res) => {
    try {
        const data = await MainContract.methods
            .rejectBirthCerti(req.body.acc)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const getBirthCerti = async (req, res) => {
    try {
        const data = await MainContract.methods
            .getBirthCerti(req.body.acc)
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
        const data = await MainContract.methods
            .newAadharCard(req.body.acc, req.body.name, req.body.number, ipfsHash, req.body.desc)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const setAadharCard = async (req, res) => {
    try {
        const data = await MainContract.methods
            .setAadharCard(req.body.acc, req.body.name, req.body.number, ipfsHash, req.body.desc)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const approveAadharCard = async (req, res) => {
    try {
        const data = await MainContract.methods
            .approveAadharCard(req.body.acc)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const rejectAadharCard = async (req, res) => {
    try {
        const data = await MainContract.methods
            .rejectAadharCard(req.body.acc)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
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
        const data = await MainContract.methods
            .shareCerti(req.body.acc, req.body.viewer, req.body.type, req.body.time)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const checkIfSharedCerti = async (req, res) => {
    try {
        const data = await MainContract.methods
            .checkIfSharedCerti(req.body.acc, req.body.viewer, req.body.type)
            .call();

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const newPassportCerti = async (req, res) => {
    try {
        const data = await MainContract.methods
            .newPassportCerti(req.body.acc, req.body.name, req.body.dob, ipfsHash, req.body.desc)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const setPassportCerti = async (req, res) => {
    try {
        const data = await MainContract.methods
            .setPassportCerti(req.body.acc, req.body.name, req.body.dob, ipfsHash, req.body.desc)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const approvePassportCerti = async (req, res) => {
    try {
        const data = await MainContract.methods
            .approvePassportCerti(req.body.acc)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const rejectPassportCerti = async (req, res) => {
    try {
        const data = await MainContract.methods
            .rejectPassportCerti(req.body.acc)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
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
        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        res.send(error.message);
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
    try {
        const data = await MainContract.methods
            .registerApplicant(req.body.accName, req.body.name, req.body.password)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const registerApprover = async (req, res) => {
    try {
        const data = await MainContract.methods
            .registerApplicant(req.body.accNameAdmin, req.body.passwordAdmin, req.body.accName, req.body.name, req.body.password)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const registerAdmin = async (req, res) => {
    try {
        const data = await MainContract.methods
            .registerAdmin(req.body.accName, req.body.name, req.body.password)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

export const changePassword = async (req, res) => {
    try {
        const data = await MainContract.methods
            .changePassword(req.body.accName, req.body.password, req.body.newPassword)
            .send({ from: address, gas: "300000" });

        return res.send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.send(error.message);
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