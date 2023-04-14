const express=require('express');
const router=express.Router();
const userController=require('../controllers/profile-controller.js');
const {upload}=require('../config/multer-config.js');

router.get('/userProfile',userController.displayUserProfile);
router.post('/update-Profile',upload.single('user_image'),userController.updateUserProfile);

module.exports=router;