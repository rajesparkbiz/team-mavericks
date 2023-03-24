const { assign } = require('nodemailer/lib/shared/index.js');
const queryExecurter = require('../database/dbHelper.js');
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
  static forgotPass = async (req, res) => {
    let email = req.query.email;
    let userchk = await queryExecurter(`SELECT user_master.username,user_master.password,user_master.role FROM exam_admin.user_master WHERE username = '${email}'`);

    if (userchk.length == 1) {
      readHTMLFile(__dirname + '/emailTemplet.html', function (err, html) {
        if (err) {
          console.log('error reading file', err);
          return;
        }
        var template = handlebars.compile(html);
        var replacements = {
          username: "John Doe"
        };
        var htmlToSend = template(replacements);
        nodeoutlook.sendEmail({
          auth: {
            user: "examportal-autogen@outlook.com",
            pass: "Exam@12345"
          },
          from: 'examportal-autogen@outlook.com',
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
      res.redirect('/auth/login');
    }
    else {
      res.redirect('/auth/login');
    }
  }
}

module.exports = UserAuth;