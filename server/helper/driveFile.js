const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

const filePath = path.join(__dirname, 'filename.format');

async function uploadFile() {
    try{
      const response = await drive.files.create({
            requestBody: {
                name: 'BirthCertificate.pdf', //file name
                mimeType: 'application/pdf',
            },
            media: {
                mimeType: 'application/pdf',
                body: fs.createReadStream(filePath),
            },
        });  
        // report the response from the request
        console.log(response.data);
    }catch (error) {
        //report the error message
        console.log(error.message);
    }
} 

async function deleteFile() {
    try {
        const response = await drive.files.delete({
            fileId: 'File_id',// file id
        });
        console.log(response.data, response.status);
    } catch (error) {
        console.log(error.message);
    }
}

async function generatePublicUrl() {
    try {
        const fileId = '19VpEOo3DUJJgB0Hzj58E6aZAg10MOgmv';
        //change file permisions to public.
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
            role: 'owner',
            type: 'anyone',
            },
        });

        //obtain the webview and webcontent links
        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink',
        });
      console.log(result.data);
    } catch (error) {
      console.log(error.message);
    }
  }

/*const { createHash } = await import('crypto');

const hash = createHash('sha256');

export const getHash = (data) => {

    var input = '';

    for (var x in data) {
        input += data[x];
    }

    try {
        hash.update(input.toString());
        const value = hash.digest('hex');
        return value;
    }
    catch (e) {
        console.log(e);
        return e;
    }

}
// Usage Example =>
// import { getHash } from './getHash.js';
// const data = ["Smit", "Patel"];
// console.log(getHash(data));*/