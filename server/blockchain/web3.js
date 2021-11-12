import Web3 from 'web3';

// const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_KOVAN_URL));
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

export default web3;