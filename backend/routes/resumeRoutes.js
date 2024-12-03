const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const ResumeController = require('../controllers/ResumeController');
const checkAuth = require('../middlewares/checkAuth');

router.post('/create', checkAuth, ResumeController.createResume);
router.get('/resume_details/:temp_id', checkAuth, ResumeController.getResumeDataById);
router.get('/my_resume', checkAuth, ResumeController.getResumeByUserId);
router.post('/delete', checkAuth, ResumeController.deleteResumeById);

module.exports = router;