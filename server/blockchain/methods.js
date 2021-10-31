import MainContract from "./MainContract";
import { config } from 'dotenv';
config({ path: '../.env' });
import Web3 from 'web3';
const { providers } = Web3;

const web3 = new Web3(new providers.HttpProvider(process.env.INFURA_KOVAN_URL));
const signer = web3.eth.accounts.privateKeyToAccount(process.env.SIGNER_PRIVATE_KEY);
web3.eth.accounts.wallet.add(signer);

export const getCertificate = async (id) => {
    try {

        const data = await MainContract.methods
            .getCertificate(id)
            .call();

        console.log(data);
        return data;

    } catch (error) {
        console.log(error);
        return error.message;
    }
}

export const setCertificate = async (id, acc, hash, desc) => {
    try {
        await MainContract.methods
            .setCertificate(id, acc, hash, desc)
            .send({ from: signer.address });
        return "Success";
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

export const setActive = async (id, state) => {
    try {
        await MainContract.methods
            .setActive(id, state)
            .send({ from: signer.address });
        return 'Success';
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

export const newCertificate = async (acc, hash, desc) => {
    try {
        await MainContract.methods
            .newCertificate(acc, hash, desc)
            .send({ from: signer.address });
        const id = await MainContract.methods
            .lastID()
            .call();
        return id;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}