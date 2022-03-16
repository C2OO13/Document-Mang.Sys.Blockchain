import { getOwner } from './methods.js';
import { getHash } from '../helper/getHash.js';
// import { signup } from '../controllers/userAuth.js'
const main = async () => {

    const data2 = await getOwner();
    console.log(data2);
    // console.log(getHash(data2));        
    process.exit();
}
main();