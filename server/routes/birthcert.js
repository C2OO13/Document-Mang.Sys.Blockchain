import express from "express";
import {getBirthCert, createBirthCert} from '../controllers/birthcert.js'

const router = express.Router();

router.get('/api/get_certificate', getBirthCert);
router.post('/api/create_certificate', createBirthCert);

export default router;