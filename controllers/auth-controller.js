const { assign } = require('nodemailer/lib/shared/index.js');
const queryExecurter = require('../database/dbHelper.js');
const nodemailer = require('nodemailer');
const nodeoutlook = require('nodejs-nodemailer-outlook')
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
        let userchk = await queryExecurter(`SELECT * FROM user_master where user_master.role='admin' and user_master.username='${Username}'`);
       
            if (userchk.length!=0) {
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
    static forgotPass = async (req, res) => {
        let email = req.query.email;
        let userchk = await queryExecurter(`SELECT user_master.username,user_master.password,user_master.role FROM exam_admin.user_master WHERE username = '${email}'`);

        if (userchk.length == 1) {
            nodeoutlook.sendEmail({
                auth: {
                    user: "examportal-autogen@outlook.com",
                    pass: "Exam@12345"
                },
                from: 'examportal-autogen@outlook.com',
                to: `${email}`,
                subject: 'Forgot password!',
                html:`<h1>Welcome to online exam portal</h1>
                  <p>your username is ${email}</p1>
                  <p>your password is ${password}</p1>
                `,
                text: 'This is text version!',
                replyTo: 'receiverXXX@gmail.com',
                onError: (e) => console.log(e),
                onSuccess: (i) => console.log(i)
            }


            );
            res.redirect('/auth/login');
        }
        else{
            res.redirect('/auth/login');
        }
    }
}

module.exports = UserAuth;