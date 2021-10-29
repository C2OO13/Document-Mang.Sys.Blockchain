import web3 from 'web3';
import InstitutionCertificates from './build/Certificate.json';
import address from './build/address.json';

const abi = InstitutionCertificates['InstitutionCertificates'].abi;

export default new web3.eth.Contract(abi, address);