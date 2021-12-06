import Web3 from 'web3';

// const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_KOVAN_URL));
// const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
import { config } from 'dotenv';
config({ path: '../.env' });
const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://rpc-mumbai.maticvigil.com/ws/v1/1c81b149cafba4f154c6ced3cb69f862a8f53e63"));

export default web3;