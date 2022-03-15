import { getOwner } from './methods.js';
import { getHash } from '../helper/getHash.js';
import { signup } from '../controllers/userAuth.js'
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
    const data1 = await signup(body);
    console.log(data1);
        process.exit();
}
main();