import Web3, { providers } from 'web3';
import { InstitutionCertificates } from './build/Certificate.json';
import { config } from 'dotenv';
config({ path: './.env' });
import fs from 'fs-extra';
import path from 'path';

const addressPath = path.resolve(process.cwd(), 'blockchain', 'build');
// fs.removeSync(addressPath);

async function main() {
    const web3 = new Web3(new providers.HttpProvider(process.env.INFURA_KOVAN_URL));

    const signer = web3.eth.accounts.privateKeyToAccount(process.env.SIGNER_PRIVATE_KEY);
    web3.eth.accounts.wallet.add(signer);

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
                console.log(`https://kovan.etherscan.io/tx/${txhash}`);
            });

        console.log(`Contract deployed at ${deployedContract.options.address}`);

        fs.ensureDirSync(addressPath);
        fs.outputJSONSync(resolve(addressPath, 'address.json'), deployedContract.options.address);
    } catch (err) {
        console.log(err);
    }
}
main();
