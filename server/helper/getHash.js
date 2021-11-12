const { createHash } = await import('crypto');

const hash = createHash('sha256');

export const getHash = (data) => {

    var input = '';

    data.forEach(i => {
        input += i;
    });
    try {
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