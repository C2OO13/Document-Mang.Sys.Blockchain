import express from "express";
import { getBirthCertOne, getBirthCert, createBirthCert } from '../controllers/birthcert.js'
import getDataFromPDF from "../controllers/pdfReader.js";

const router = express.Router();

router.get('/api/get_certificate', getBirthCert);
router.post('/api/create_certificate', createBirthCert);
router.get('/api/read_pdf/:name', getDataFromPDF);

export default router;