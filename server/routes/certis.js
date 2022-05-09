import express from 'express'
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
  login,
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
  logout,
  check_auth,
} from '../blockchain/methods.js'
import multer from 'multer'
const upload = multer()
const router = express.Router()

router.get('/api/get_owner', getOwner)
router.get('/api/get_user', getUser)
router.get('/api/get_approvers', getApprovers)
router.get('/api/get_admins', getAdmins)
router.get('/api/get_id', getId)
router.get('/api/login', login)
router.post('/api/register_applicant', registerApplicant)
router.post('/api/register_approver', registerApprover)
router.post('/api/register_admin', registerAdmin)
router.get('/api/check_auth', check_auth)
router.get('/api/logout', logout)
router.get('/api/is_applicant', isApplicant)
router.get('/api/is_approver', isApprover)
router.get('/api/is_admin', isAdmin)
router.post('/api/change_password', changePassword)

router.get('/api/top_birth_certificate', getTopBirthCertificate)
router.get('/api/top_aadhar_certi', getTopAadharCerti)
router.get('/api/top_passport_certificate', getTopPassportCertificate)

router.post('/api/verify_certi', upload.single('certificate'), verifyCerti)

router.post('/api/new_birth_certificate', newBirthCertificate)
router.patch('/api/set_birth_certificate', setBirthCertificate)
router.post('/api/approve_birth_certificate', approveBirthCertificate)
router.post('/api/reject_birth_certificate', rejectBirthCertificate)
router.get('/api/get_birth_certificate', getBirthCertificate)
router.get(
  '/api/get_count_pending_birth_certificate',
  getCountPendingBirthCertificate
)
router.get(
  '/api/get_all_shared_birth_certificates',
  getAllPendingBirthCertificates
)

router.post('/api/new_aadhar_card', newAadharCard)
router.patch('/api/set_aadhar_card', setAadharCard)
router.post('/api/approve_aadhar_card', approveAadharCard)
router.post('/api/reject_aadhar_card', rejectAadharCard)
router.get('/api/get_aadhar_card', getAadharCard)
router.get('/api/get_count_pending_aadhar_card', getCountPendingAadharCard)
router.get('/api/get_all_pending_aadhar_cards', getAllPendingAadharCards)

router.post('/api/share_certi', shareCerti)
router.get('/api/get_shared_certis', getSharedCertis)

router.post('/api/new_passport_certificate', newPassportCertificate)
router.patch('/api/set_passport_certificate', setPassportCertificate)
router.post('/api/approve_passport_certificate', approvePassportCertificate)
router.post('/api/reject_passport_certificate', rejectPassportCertificate)
router.get('/api/get_passport_certificate', getPassportCertificate)
router.get(
  '/api/get_count_pending_passport_certificate',
  getCountPendingPassportCertificate
)
router.get(
  '/api/get_all_pending_passport_certificates',
  getAllPendingPassportCertificates
)

router.get('/api/add_notification', addNotification)
router.get('/api/get_user_notifications', getUserNotifications)

export default router
