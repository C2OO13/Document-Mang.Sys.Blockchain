import fs from 'fs'
import path from 'path'
import { create } from 'ipfs-http-client'

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
const loadDir = path.join(__dirname, '../pdf_file')


export const getIpfsLink = async (input) => {
    const ipfs = create('http://127.0.0.1:5002')

    const data = fs.readFileSync(path.join(loadDir, `${input}.pdf`))
    // console.log(data)

    const { cid } = await ipfs.add(data)

    const link = `https://ipfs.io/ipfs/${cid}`;
    return link;
}

