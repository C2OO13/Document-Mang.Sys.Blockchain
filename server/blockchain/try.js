import { getOwner } from './methods.js';
import { getHash } from '../helper/getHash.js';
import { signup } from '../controllers/userAuth.js'
import { config } from 'dotenv';
import MainContract from "./MainContract.js";
import web3 from "./web3.js";

const signer = web3.eth.accounts.privateKeyToAccount(process.env.SIGNER_PRIVATE_KEY);
web3.eth.accounts.wallet.add(signer);
const address = signer.address;

config({ path: '../.env' });

const main = async () => {

    const data2 = await getOwner();
    console.log(data2);
    // const id = JSON.parse(await newCertificate("0x1840A76Cd21f1c1aEC33CC6C0Ec2b42b6ed64de5", "Smt", "patel"));
    // console.log(id);
    // const data = JSON.parse(await getCertificate(id));
    // console.log(data);
    console.log(getHash(data2));

    const body = {
        email: 'a',
        name: 'a',
        password: 'a',
        cpassword: 'a' 
    };
    console.log(`print 1`);
    console.log(body)
    const data3 = await MainContract.methods.registerApplicant(body.email, body.name, body.password).send({ from: address, gas: "300000" });
    console.log(`print 1.2`);
    console.log(data3)
    const data1 = await signup(body);
    console.log(`print 2`);
    console.log(data1);
    process.exit();
}
main();