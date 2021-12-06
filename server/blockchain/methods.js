import { config } from 'dotenv';
config({ path: '../.env' });
import MainContract from "./MainContract.js";
import web3 from "./web3.js";

// const accounts = await web3.eth.getAccounts();
// const address = accounts[0];        

const signer = web3.eth.accounts.privateKeyToAccount(process.env.SIGNER_PRIVATE_KEY);
web3.eth.accounts.wallet.add(signer);
const address = signer.address;

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

        await MainContract.methods
            .setCertificate(id, acc, hash, desc)
            .send({ from: address, gas: "300000" });

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
            .send({ from: address, gas: "300000" });
        return JSON.stringify('Success');
    } catch (error) {
        console.log(error);
        return error.message;
    }
}
