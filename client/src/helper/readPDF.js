import pdfreader from "pdfreader";

let rows = {};
let data = [];

const f = (fileName) => {
    const pr = new pdfreader.PdfReader();
    return new Promise(resolve => {
        pr.parseFileItems("../certis/" + fileName,
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

const getDataFromPDF = async (name) => {
    const obj = await f(name);
    console.log(obj)
    return obj;
};

export default getDataFromPDF;