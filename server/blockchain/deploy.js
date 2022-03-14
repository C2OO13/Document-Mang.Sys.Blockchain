import Web3 from 'web3';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Dashboard } = require("./build/Dashboard.json");
import { config } from 'dotenv';
config({ path: '../.env' });
import fs from 'fs-extra';
import path from 'path';

const addressPath = path.resolve(process.cwd(), 'build');
// fs.removeSync(addressPath);

async function deploy(web3, signer) {

    const abi = Dashboard.abi;
    const bytecode = Dashboard.evm.bytecode.object;

    const contract = new web3.eth.Contract(abi);
    contract.options.data = bytecode;
    const deployTx = contract.deploy();
    try {
        const deployedContract = await deployTx
            .send({
                from: signer.address,
                gas: '12500000',
            })
            .once('transactionHash', txhash => {
                console.log(`Mining deployment transaction ...`);
                console.log(`https://mumbai.polygonscan.com/tx/${txhash}`);
            });

        console.log(`Contract deployed at ${deployedContract.options.address}`);

        fs.ensureDirSync(addressPath);
        fs.outputJSONSync(path.resolve(addressPath, 'address.json'), deployedContract.options.address);

    } catch (err) {
        console.log(err);
    }
}


async function main() {

    const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.POLYGON_MUMBAI_URL));
    const signer = web3.eth.accounts.privateKeyToAccount(process.env.SIGNER_PRIVATE_KEY);

    // Ganache - Localhost Setup
    // const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
    // const signer = web3.eth.accounts.privateKeyToAccount('6f3d0498fef33846f1f1fe3d488a08668b267c6385accaec6530ab4f8385d71c');

    web3.eth.accounts.wallet.add(signer);
    // web3.eth.getBalance(signer.address).then((balance) => {
    //     console.log("Balance:" + balance);
    // })

    await deploy(web3, signer);

    process.exit();
}
main();
