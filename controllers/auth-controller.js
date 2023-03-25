const queryExecurter = require('../database/dbHelper.js');

class UserAuth {
    
    static userLogin = async (req, res) => {
        let session = req.session;
        if (session.username) {
            res.redirect('/dashboard/');
        } else {
            res.render('login', { status: "" });
        }
    }

    static userLoginchk = async (req, res) => {
        let { Username, Password } = req.body;
        console.log(Password);
        
        var sql =`SELECT user_master.username,user_master.password,user_master.role FROM exam_admin.user_master`
        console.log(sql);
        let userchk = await queryExecurter(sql);
        var a =userchk[0]['password'];
        console.log(a);
        if (userchk[0]['role'] == "admin") {
            console.log("1");
            if (Password === userchk[0]['password']) {
                req.session.regenerate(function (err) {
                    if (err) next(err)

                    // store user information in session, typically a user id
                    req.session.username = Username;

                    // save the session before redirection to ensure page
                    // load does not happen before session is saved
                    req.session.save(function (err) {
                        if (err) return next(err)
                        res.redirect('/dashboard');
                    });
                });
            } else {

                res.render('login', { status: "username or password incorrect" });
            }

        }
        else {
            res.render('login', { status: "username or password incorrect" });
        }

    }

    static alreadyLogin = async (req, res, next) => {
        let session = req.session;
        if (session.username) {
            res.redirect('/dashboard');
        }
        else {
            next();
        }
    }

    static userLogout = async (req, res) => {

        req.session.destroy(null);
        res.clearCookie('connect.sid');
        return res.redirect('/auth/login');

    }

}

module.exports = UserAuth;