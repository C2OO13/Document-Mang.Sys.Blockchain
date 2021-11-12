import { getOwner, newCertificate, getCertificate } from './methods.js';

const main = async () => {

    const data2 = await getOwner();
    console.log(data2);
    const id = JSON.parse(await newCertificate("0xF74bb60dB88e177389E98EC87dD14908442c0232", "Smit", "patel"));
    console.log(id);
    const data = JSON.parse(await getCertificate(id));
    console.log(data);
}
main();