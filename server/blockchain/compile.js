import path from 'path';
import solc from 'solc';
import fs from 'fs-extra';

const buildPath = path.resolve(process.cwd(), 'build');
// fs.removeSync(buildPath);

const contracts = [
    'Certificate.sol',
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
        'Certificate.sol': {
            content: sources[0],
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
