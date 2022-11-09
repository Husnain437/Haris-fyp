const express = require('express');
// const { signup } = require('../client/src/api/auth');
const router = express.Router();
const {signupValidator,signinValidator, validationResult} = require('../middleware/validator');
const {signupController,signinController,getUserInfo,EditUserInfo,addUserImage,addPost,getAllPost, getAllCase, getAllRam, getAllSsd, getAllGpu, getAllPsu, getAllCpu, getAllMobo} = require('../controllers/auth');


router.post('/signup', signupValidator, validationResult, signupController);
router.post('/signin', signinValidator, validationResult, signinController);
router.get('/getinfo/:email',getUserInfo);
router.put('/editsellerinfo',EditUserInfo);
router.post('/adduserimage',addUserImage);
router.post('/addPost',addPost);
router.get('/allposts',getAllPost);
router.get('/allcases',getAllCase);
router.get('/allrams', getAllRam);
router.get('/allssd',getAllSsd);
router.get('/allgpus',getAllGpu);
router.get('/allpsus',getAllPsu);
router.get('/allcpus',getAllCpu);
router.get('/allmobos',getAllMobo);





module.exports = router;