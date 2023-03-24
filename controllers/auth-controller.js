const { assign } = require('nodemailer/lib/shared/index.js');
const queryExecurter = require('../database/dbHelper.js');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const nodeoutlook = require('nodejs-nodemailer-outlook');
var handlebars = require('handlebars');
var fs = require('fs');
var readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
    if (err) {
      callback(err);
    }
    else {
      callback(null, html);
    }
  });
};
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
    let userchk = await queryExecurter(`SELECT user_master.username,user_master.password,user_master.role FROM exam_admin.user_master WHERE username = '${Username}'`);

    if (userchk.length == 1 && userchk[0]['role'] == "admin") {
      bcrypt.compare(Password, userchk[0]['password'], function (err, hashres) {
        if (hashres) {
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
    let email = (req.query.email).toLowerCase();
    let userchk = await queryExecurter(`SELECT user_master.username,user_master.password,user_master.role FROM exam_admin.user_master WHERE username = '${email}'`);
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let ftoken = '';
    if (userchk.length == 1) {
      for (let i = 0; i < 30; i++) {
        ftoken += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      await queryExecurter(`UPDATE user_master SET forgot_token = '${ftoken}' WHERE (username = '${email}');`)
      // res.redirect('/login');
      // res.redirect('/verify');
      var fullUrl = req.protocol + '://' + req.get('host')+`/user/changePassword/${ftoken}`;
      readHTMLFile(__dirname + '/emailTemplet.html', function (err, html) {
        if (err) {
          console.log('error reading file', err);
          return;
        }
        var template = handlebars.compile(html);
        var replacements = {
          forgoturl: fullUrl
        };
        var htmlToSend = template(replacements);
        nodeoutlook.sendEmail({
          auth: {
            user: "examportal-autogen@hotmail.com",
            pass: "Exam@12345"
          },
          from: 'examportal-autogen@hotmail.com',
          to: `${email}`,
          subject: 'Forgot password!',
          html: htmlToSend,
          text: 'This is text version!',
          replyTo: 'receiverXXX@gmail.com',
          onError: (e) => console.log(e),
          onSuccess: (i) => console.log(i)
        }
        )
      });
      res.render('login', { status: "Email Sended Successfully." });
    }
    else {
      res.render('login', { status: "Email Not Found." });
    }
  }
  static changePassword = async (req, res) => {
    let ftoken = req.params['ftoken'];
    let userTokenChk = await queryExecurter(`SELECT * FROM exam_admin.user_master WHERE forgot_token = '${ftoken}';`);
    console.log(userTokenChk.length);
    if (userTokenChk.length == 1) {
      res.render('forgotpassword', { ftoken });
    }
    else {
      res.render('login', { status: "email not found!" });
    }
  }
  static changePasswordChk = async (req, res) => {
    let saltround = 10;
    let { ftoken, Password } = req.body;
    let userTokenChk = await queryExecurter(`SELECT * FROM exam_admin.user_master WHERE forgot_token = '${ftoken}';`);
    console.log(userTokenChk.length);
    if (userTokenChk.length == 1) {
      bcrypt.genSalt(saltround, function (err, salt) {
        bcrypt.hash(pass, salt, async function (err, hash) {
          hashpass = hash;
          await queryExecurter(`UPDATE user_master SET password = '${hashpass}', forgot_token = null WHERE (forgot_token = '${ftoken}');`);
        });
      });
      res.render('login', { status: "Password Changed Successfully :)" });
    }
    else {
      res.render('login', { status: "email not found!" });
    }
  };
}

module.exports = UserAuth;