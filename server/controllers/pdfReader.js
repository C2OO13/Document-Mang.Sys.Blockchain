import pdfreader from "pdfreader";
import path from 'path';
import {fileURLToPath} from 'url';
import { dirname } from 'path';
let rows = {};
let data = [];

const f = (fileName) => {
    const pr = new pdfreader.PdfReader();
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename) 
    const filePath = path.join(__dirname,'../pdf_file',fileName)
    console.log('File Path', filePath)
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

const getDataFromPDF = async (req, res) => {
    console.log('NAME', req.params.name);
    const name = req.params.name;
    const obj = await f(name);
    res.status(200).json(obj);
};

export default getDataFromPDF;