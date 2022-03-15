const { createHash } = await import('crypto');

export const getHash = (data) => {

    var input = '';

    const orderedData = Object.keys(data).sort().reduce(
        (obj, key) => {
            obj[key] = data[key];
            return obj;
        },
        {}
    );
    // if (orderedData.dob.length > 10) orderedData.dob = orderedData.dob.split('T')[0];
    // orderedData.tob = '';
    for (var x in orderedData) {
        input += orderedData[x];
    }
    console.log("Hash Input: ", input);
    try {
        const hash = createHash('sha256');
        hash.update(input.toString());
        const value = hash.digest('hex');
        return value;
    }
    catch (e) {
        console.log(e);
        return e;
    }

}
// Usage Example =>
// import { getHash } from './getHash.js';
// const data = ["Smit", "Patel"];
// console.log(getHash(data));