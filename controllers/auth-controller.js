const querySolver=require('../database/querysolver.js');
const bcrypt = require('bcrypt');

class UserAuth {
    static userLogin = async (req, res) => {
        let session=req.session;
        if (session.username) {
            res.redirect('/dashboard/questions');
        }else{
            res.render('login',{status:""});
        }
    }
    static userLoginchk = async (req, res) => {
        let { Username, Password } = req.body;
        let userchk = await querySolver(`SELECT username,password,role FROM exam_admin.user_master WHERE username = '${Username}';`);
        if (userchk.length == 1 && userchk[0]['role'] == "admin") {
            bcrypt.compare(Password, userchk[0]['password'], function (err, hashres) {
                if (err) throw err;
                if (hashres === true) {
                    req.session.regenerate(function (err) {
                        if (err) next(err)

                        // store user information in session, typically a user id
                        req.session.username = Username;

                        // save the session before redirection to ensure page
                        // load does not happen before session is saved
                        req.session.save(function (err) {
                            if (err) return next(err)
                            res.redirect('/dashboard/questions');
                        });
                    });
                } else {
                    
                    res.render('login',{status:"username or password incorrect"});
                }
            });
        }
        else {
            // res.redirect('/auth/login?msg=username or password incorrect');
            res.render('login',{status:"username or password incorrect"});
        }

    }
}
module.exports = UserAuth;