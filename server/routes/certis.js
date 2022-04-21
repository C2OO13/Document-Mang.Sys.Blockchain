import express from "express";
import { approveAadharCard, approveBirthCerti, approvePassportCerti, changePassword, checkIfSharedCerti, getAadharCard, getBirthCerti, getCountPendingAadharCard, getCountPendingBirthCerti, getCountPendingPassportCerti, getId, getOwner, getPassportCerti, getTopAadharCerti, getTopBirthCerti, getTopPassportCerti, getUser, isAdmin, isApplicant, isApprover, login, newAadharCard, newBirthCerti, newPassportCerti, registerAdmin, registerApplicant, registerApprover, rejectAadharCard, rejectBirthCerti, rejectPassportCerti, setAadharCard, setBirthCerti, setPassportCerti, shareCerti, verifyCerti } from '../blockchain/methods.js'
import multer from 'multer';
const upload = multer();
const router = express.Router();

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


router.post('/api/verify_certi', upload.single('certificate'), verifyCerti);

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