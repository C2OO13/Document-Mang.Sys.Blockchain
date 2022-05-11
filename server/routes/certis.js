import express from 'express'
import passport from 'passport'
import {
  approveAadharCard,
  approveBirthCertificate,
  approvePassportCertificate,
  changePassword,
  getSharedCertis,
  getAadharCard,
  getBirthCertificate,
  getCountPendingAadharCard,
  getCountPendingBirthCertificate,
  getCountPendingPassportCertificate,
  getId,
  getOwner,
  getPassportCertificate,
  getTopAadharCerti,
  getTopBirthCertificate,
  getTopPassportCertificate,
  getUser,
  getApprovers,
  getAdmins,
  isAdmin,
  isApplicant,
  isApprover,
  newAadharCard,
  newBirthCertificate,
  newPassportCertificate,
  registerAdmin,
  registerApplicant,
  registerApprover,
  rejectAadharCard,
  rejectBirthCertificate,
  rejectPassportCertificate,
  setAadharCard,
  setBirthCertificate,
  setPassportCertificate,
  shareCerti,
  getAllPendingBirthCertificates,
  getAllPendingAadharCards,
  getAllPendingPassportCertificates,
  verifyCerti,
  addNotification,
  getUserNotifications,
} from '../blockchain/methods.js'
import multer from 'multer'

import { passportJWT } from '../middlewares/auth/passportJWT.js'

const upload = multer()
const router = express.Router()

router.get('/api/get_owner', passportJWT, getOwner)
router.get('/api/get_user', passportJWT, getUser)
router.get('/api/get_approvers', passportJWT, getApprovers)
router.get('/api/get_admins', passportJWT, getAdmins)
router.get('/api/get_id', passportJWT, getId)
router.get('/api/is_applicant', passportJWT, isApplicant)
router.get('/api/is_approver', passportJWT, isApprover)
router.get('/api/is_admin', passportJWT, isAdmin)
router.post('/api/register_applicant', registerApplicant)
router.post('/api/register_approver', registerApprover)
router.post('/api/register_admin', registerAdmin)
router.post('/api/change_password', passportJWT, changePassword)

router.get('/api/top_birth_certificate', passportJWT, getTopBirthCertificate)
router.get('/api/top_aadhar_certi', passportJWT, getTopAadharCerti)
router.get(
  '/api/top_passport_certificate',
  passportJWT,
  getTopPassportCertificate
)

router.post(
  '/api/verify_certi',
  passportJWT,
  upload.single('certificate'),
  verifyCerti
)

router.post('/api/new_birth_certificate', passportJWT, newBirthCertificate)
router.patch('/api/set_birth_certificate', passportJWT, setBirthCertificate)
router.post(
  '/api/approve_birth_certificate',
  passportJWT,
  approveBirthCertificate
)
router.post(
  '/api/reject_birth_certificate',
  passportJWT,
  rejectBirthCertificate
)
router.get('/api/get_birth_certificate', passportJWT, getBirthCertificate)
router.get(
  '/api/get_count_pending_birth_certificate',
  passportJWT,
  getCountPendingBirthCertificate
)
router.get(
  '/api/get_all_shared_birth_certificates',
  passportJWT,
  getAllPendingBirthCertificates
)

router.post('/api/new_aadhar_card', passportJWT, newAadharCard)
router.patch('/api/set_aadhar_card', passportJWT, setAadharCard)
router.post('/api/approve_aadhar_card', passportJWT, approveAadharCard)
router.post('/api/reject_aadhar_card', passportJWT, rejectAadharCard)
router.get('/api/get_aadhar_card', passportJWT, getAadharCard)
router.get(
  '/api/get_count_pending_aadhar_card',
  passportJWT,
  getCountPendingAadharCard
)
router.get(
  '/api/get_all_pending_aadhar_cards',
  passportJWT,
  getAllPendingAadharCards
)

router.post('/api/share_certi', passportJWT, shareCerti)
router.get('/api/get_shared_certis', passportJWT, getSharedCertis)

router.post(
  '/api/new_passport_certificate',
  passportJWT,
  newPassportCertificate
)
router.patch(
  '/api/set_passport_certificate',
  passportJWT,
  setPassportCertificate
)
router.post(
  '/api/approve_passport_certificate',
  passportJWT,
  approvePassportCertificate
)
router.post(
  '/api/reject_passport_certificate',
  passportJWT,
  rejectPassportCertificate
)
router.get('/api/get_passport_certificate', passportJWT, getPassportCertificate)
router.get(
  '/api/get_count_pending_passport_certificate',
  passportJWT,
  getCountPendingPassportCertificate
)
router.get(
  '/api/get_all_pending_passport_certificates',
  passportJWT,
  getAllPendingPassportCertificates
)

router.get('/api/add_notification', passportJWT, addNotification)
router.get('/api/get_user_notifications', passportJWT, getUserNotifications)

export default router
