import { config } from 'dotenv';
config({ path: '../.env' });
import Web3 from 'web3';

// const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.POLYGON_MUMBAI_URL));

export default web3;