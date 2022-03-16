import fs from 'fs'
import path from 'path'
import {create} from 'ipfs-http-client'

const ipfs = create()

// const data = fs.readFileSync(path.resolve(process.cwd(),'../pdf_file/AlteredData.pdf'))
// console.log(data)

const { cid } = await ipfs.add("hello")
console.log(cid)