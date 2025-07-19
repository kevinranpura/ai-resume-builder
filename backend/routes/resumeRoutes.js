const express = require('express');
const { createResume } = require('../controllers/createResume.js');
const { getResumes } = require('../controllers/getResumes.js');
const { getById } = require('../controllers/getById.js')
const { updateResume } = require('../controllers/updateResume.js')
const { deleteResume } = require('../controllers/deleteResume.js')

const router = express.Router();


router.post('/create', createResume);
router.post('/getResumes', getResumes);
router.post('/getById', getById);
router.put('/update/:id', updateResume);
router.delete('/delete/:id', deleteResume);


module.exports = router;
