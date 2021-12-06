import Web3 from 'web3';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { InstitutionCertificates } = require("./build/Certificate.json");
import { config } from 'dotenv';
config({ path: '../.env' });
import fs from 'fs-extra';
import path from 'path';

const addressPath = path.resolve(process.cwd(), 'build');
// fs.removeSync(addressPath);

async function main() {
    // https://rpc.maticvigil.com/apps/1c81b149cafba4f154c6ced3cb69f862a8f53e63

    const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://rpc-mumbai.maticvigil.com/ws/v1/1c81b149cafba4f154c6ced3cb69f862a8f53e63"));
    // const web3 = new Web3(new Web3.providers.HttpProvider("https://rpc.maticvigil.com/apps/1c81b149cafba4f154c6ced3cb69f862a8f53e63"));
    const signer = web3.eth.accounts.privateKeyToAccount(process.env.SIGNER_PRIVATE_KEY);

    // const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
    // const signer = web3.eth.accounts.privateKeyToAccount('6f3d0498fef33846f1f1fe3d488a08668b267c6385accaec6530ab4f8385d71c');
    web3.eth.accounts.wallet.add(signer);
    console.log(signer);
    web3.eth.getBalance(signer.address).then((balance) => {
        console.log("Balance:" + balance);
    })

    const abi = InstitutionCertificates.abi;
    const bytecode = InstitutionCertificates.evm.bytecode.object;

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
                console.log(txhash);
                // console.log(`https://kovan.etherscan.io/tx/${txhash}`);
            });

        console.log(`Contract deployed at ${deployedContract.options.address}`);

        fs.ensureDirSync(addressPath);
        fs.outputJSONSync(path.resolve(addressPath, 'address.json'), deployedContract.options.address);

    } catch (err) {
        console.log(err);
    }
    process.exit();
}
main();
