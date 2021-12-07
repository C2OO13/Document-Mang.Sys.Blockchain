import pdfreader from "pdfreader";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { writeFile } from 'fs';
import { verifyBirthCertOne } from './birthcert.js';

let rows = {};
let data = [];

const f = (fileName) => {
    const pr = new pdfreader.PdfReader();
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename)
    const filePath = path.join(__dirname, '../pdf_file', fileName)
    // console.log('File Path', filePath)
    return new Promise(resolve => {
        pr.parseFileItems(filePath,
            (err, item) => {
                if (!item) {
                    resolve(printRows());
                }
                else if (item.text) {
                    (rows[item.y] = rows[item.y] || []).push(item.text);
                }
            }
        )
    });
};


const printRows = () => {
    let output = {};
    Object.keys(rows)
        .sort((y1, y2) => parseFloat(y1) - parseFloat(y2))
        .forEach((y) => {
            data.push(rows[y][0].split(': ')[1]);
        });

    output.name = data[0];
    output.guardian = data[1];
    output.hospital = data[2];
    output.dob = data[3];
    output.tob = data[4];
    output.location = data[5];
    data = []
    return output;
}

const blobToFile = (theBlob, fileName) => {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}

const getDataFromPDF = async (req, res) => {
    const body = req.body;

    const stringval = body.data;
    const fileName = body.name;

    let encodedString = stringval.split(',')[1].split('"')[0]; //getting the base64 hash
    let mimetype = stringval.split(',')[0].split(':')[1].split(';')[0]; //getting the mime type

    let data = atob(encodedString); //ascii to binary

    var ab = new ArrayBuffer(data.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < data.length; i++) {
        ia[i] = data.charCodeAt(i);
    }

    const buffer = Buffer.from(ab)
    writeFile(`pdf_file/${fileName}`, buffer, () => {
        console.log("File saved");
    });

    let name = fileName;
    console.log("fileName", fileName);
    const obj = await f(name);
    // console.log(obj);
    const verify = await verifyBirthCertOne(obj);
    const ans = { data: obj, verification: verify }
    console.log(ans);
    res.status(200).json(ans);
};

export default getDataFromPDF;