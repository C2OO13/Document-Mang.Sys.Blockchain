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