const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(process.cwd(), 'server', 'blockchain', 'build');
// fs.removeSync(buildPath);

const contracts = [
    'MainContract.sol',
    'EIP20Interface.sol',
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
        'MainContract.sol': {
            content: sources[0],
        },
        'EIP20Interface.sol': {
            content: sources[1],
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
    if (path === contracts[0])
        return {
            contents: sources[0],
        };
    else return { error: 'File not found' };
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
