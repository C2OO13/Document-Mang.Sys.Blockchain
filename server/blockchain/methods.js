import MainContract from "./MainContract.js";
import { config } from 'dotenv';
import web3 from "./web3.js";
config({ path: '../.env' });
const signer = web3.eth.accounts.privateKeyToAccount(process.env.SIGNER_PRIVATE_KEY);
web3.eth.accounts.wallet.add(signer);

export const getOwner = async () => {
    try {
        const data = await MainContract.methods
            .contractOwner()
            .call();

        return JSON.stringify(data);

    } catch (error) {
        console.log(error);
        return error.message;
    }
}


export const getCertificate = async (id) => {
    try {

        const data = await MainContract.methods
            .getCertificate(id)
            .call();

        return JSON.stringify(data);

    } catch (error) {
        console.log(error);
        return error.message;
    }
}

export const setCertificate = async (id, acc, hash, desc) => {
    try {
        const accounts = await web3.eth.getAccounts();
        await MainContract.methods
            .setCertificate(id, acc, hash, desc)
            .send({ from: signer.address, gas: "300000" });

        return JSON.stringify('Success');
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

export const setActive = async (id, state) => {
    try {
        await MainContract.methods
            .setActive(id, state)
            .send({ from: accounts[0], gas: "300000" });
        return JSON.stringify('Success');
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

export const newCertificate = async (acc, hash, desc) => {
    try {
        const accounts = await web3.eth.getAccounts();
        await MainContract.methods
            .newCertificate(acc, hash, desc)
            .send({ from: signer.address, gas: "300000" });

        const id = await MainContract.methods
            .lastID()
            .call();

        return JSON.stringify(id);
    } catch (error) {
        console.log(error);
        return error.message;
    }
}