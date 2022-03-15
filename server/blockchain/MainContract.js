import web3 from './web3.js';

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Dashboard = require("./build/Dashboard.json");
const address = require('./build/address.json');

const abi = Dashboard['Dashboard'].abi;

export default new web3.eth.Contract(abi, address);