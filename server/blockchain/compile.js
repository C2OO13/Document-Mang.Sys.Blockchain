import path from 'path';
import solc from 'solc';
import fs from 'fs-extra';

const buildPath = path.resolve(process.cwd(), 'build');
// fs.removeSync(buildPath);

const contracts = [
    'AadharCardContract.sol',
    'Login.sol',
    'BirthCertiContract.sol',
    'ShareCertificateContract.sol',
    'PassportCertiContract.sol',
    'Dashboard.sol'
];
const paths = [];
const sources = [];

contracts.forEach((contract, index) => {
    paths.push(path.resolve(process.cwd(), 'contracts', contract));
    sources.push(fs.readFileSync(paths[index], 'utf8'));
});

const input = {
    language: 'Solidity',
    sources: {
        'AadharCardContract.sol': {
            content: sources[0],
        },
        'Login.sol': {
            content: sources[1],
        },
        'BirthCertiContract.sol': {
            content: sources[2],
        },
        'ShareCertificateContract.sol': {
            content: sources[3],
        },
        'PassportCertiContract.sol': {
            content: sources[4],
        },
        'Dashboard.sol': {
            content: sources[5],
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

function findImports(path) {
    for (var i = 0; i < contracts.length; i++) {
        if (path === contracts[i]) {
            return { contents: sources[i], };
        }
    }
    return { error: 'File not found' };
}

const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));

// console.log(output);

fs.ensureDirSync(buildPath);
for (const contract in output.contracts) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace('.sol', '') + '.json'),
        output.contracts[contract]
    );
    // console.log(contract);
}
