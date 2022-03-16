import express from "express";
// import { getBirthCert, createBirthCert } from '../controllers/birthcert.js'
// import getDataFromPDF from "../controllers/pdfReader.js";

import { approveAadharCard, approveBirthCerti, approvePassportCerti, changePassword, checkIfSharedCerti, getAadharCard, getBirthCerti, getCountPendingAadharCard, getCountPendingBirthCerti, getCountPendingPassportCerti, getId, getOwner, getPassportCerti, getTopAadharCerti, getTopBirthCerti, getTopPassportCerti, getUser, isAdmin, isApplicant, isApprover, login, newAadharCard, newBirthCerti, newPassportCerti, registerAdmin, registerApplicant, registerApprover, rejectAadharCard, rejectBirthCerti, rejectPassportCerti, setAadharCard, setBirthCerti, setPassportCerti, shareCerti, verifyAadharCerti, verifyBirthCerti, verifyPassportCerti } from '../blockchain/methods.js'

const router = express.Router();

// router.get('/api/get_certificate', getBirthCert);
// router.post('/api/create_certificate', createBirthCert);
// router.post('/api/verify_pdf', getDataFromPDF);

router.get('/api/get_owner', getOwner);
router.get('/api/get_user', getUser);
router.get('/api/get_id', getId);
router.get('/api/login', login);
router.get('/api/is_applicant', isApplicant);
router.get('/api/is_approver', isApprover);
router.get('/api/is_admin', isAdmin);
router.post('/api/register_applicant', registerApplicant);
router.post('/api/register_approver', registerApprover);
router.post('/api/register_admin', registerAdmin);
router.post('/api/change_pasword', changePassword);



router.get('/api/top_birth_certi', getTopBirthCerti);
router.get('/api/top_aadhar_certi', getTopAadharCerti);
router.get('/api/top_passport_certi', getTopPassportCerti);


router.post('/api/verify_birth_certi', verifyBirthCerti);
router.post('/api/verify_aadhar_certi', verifyAadharCerti);
router.post('/api/verify_passport_certi', verifyPassportCerti);

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