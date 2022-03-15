import express from "express";
import {getTemplate, createTemplate} from '../controllers/template.js'

const router = express.Router();

router.get('/api/get_template', getTemplate);
router.post('/api/create_certificate', createTemplate);

export default router;