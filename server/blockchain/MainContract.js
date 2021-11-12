import web3 from './web3.js';

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const InstitutionCertificates = require("./build/Certificate.json");
const address = require('./build/address.json');

const abi = InstitutionCertificates['InstitutionCertificates'].abi;

export default new web3.eth.Contract(abi, address);