import express from "express";
import { getCertificateOne, getCertificate, createCertificate } from '../controllers/Certificate.js'
import getDataFromPDF from "../controllers/pdfReader.js";

const router = express.Router();

router.get('/api/get_a_certificate', getCertificate);
router.post('/api/create_a_certificate', createCertificate);
router.get('/api/read_pdf/:name', getDataFromPDF);

export default router;