import express from "express";
// import { getBirthCert, createBirthCert } from '../controllers/birthcert.js'
// import getDataFromPDF from "../controllers/pdfReader.js";

import { approveAadharCard, approveBirthCerti, approvePassportCerti, checkIfSharedCerti, getAadharCard, getBirthCerti, getCountPendingAadharCard, getCountPendingBirthCerti, getCountPendingPassportCerti, getOwner, getPassportCerti, newAadharCard, newBirthCerti, newPassportCerti, rejectAadharCard, rejectBirthCerti, rejectPassportCerti, setAadharCard, setBirthCerti, setPassportCerti, shareCerti } from '../blockchain/methods.js'

const router = express.Router();

// router.get('/api/get_certificate', getBirthCert);
// router.post('/api/create_certificate', createBirthCert);
// router.post('/api/verify_pdf', getDataFromPDF);

router.get('/api/get_owner', getOwner);

router.post('/api/new_birth_certi', newBirthCerti);
router.patch('/api/set_birth_certi', setBirthCerti);
router.post('/api/approve_birth_certi', approveBirthCerti);
router.post('/api/reject_birth_certi', rejectBirthCerti);
router.get('/api/get_birth_certi', getBirthCerti);
router.get('/api/get_count_pending_birth_certi', getCountPendingBirthCerti);

router.post('/api/new_aadhar_card', newAadharCard);
router.patch('/api/set_aadhar_card', setAadharCard);
router.post('/api/approve_aadhar_card', approveAadharCard);
router.post('/api/reject_aadhar_card', rejectAadharCard);
router.get('/api/get_aadhar_card', getAadharCard);
router.get('/api/get_count_pending_aadhar_card', getCountPendingAadharCard);

router.post('/api/share_certi', shareCerti);
router.get('/api/check_if_shared_certi', checkIfSharedCerti);

router.post('/api/new_passport_certi', newPassportCerti);
router.patch('/api/set_passport_certi', setPassportCerti);
router.post('/api/approve_passport_certi', approvePassportCerti);
router.post('/api/reject_passport_certi', rejectPassportCerti);
router.get('/api/get_passport_certi', getPassportCerti);
router.get('/api/get_count_pending_passport_certi', getCountPendingPassportCerti);

export default router;