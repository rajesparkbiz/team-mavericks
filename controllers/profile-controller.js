const queryExecurter = require('../database/dbHelper.js');
const QueryHelper = require('../services/databaseQuery');

class UserProfile {

    static displayUserProfile = async (req, res) => {
        const image=await queryExecurter(`SELECT user_image FROM test.user_master where username='${req.session.username}';`);

        res.render("profile",{username:req.session.username,image:image[0].user_image || 'user-image.png'});
    }
    
    static updateUserProfile=async(req,res)=>{
        const userName=req.body.username;
        
        const imageName=req.file.filename;
        
        const updateProfile=await queryExecurter(`UPDATE user_master SET username = '${userName}',user_image='${imageName}' WHERE username = '${req.session.username}';
        `);
        req.session.username=userName;
        res.redirect('/admin/userProfile');
    }
}

module.exports=UserProfile;