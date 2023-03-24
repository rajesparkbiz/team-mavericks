let emailflaglog = 0;
let passflaglog = 0;

function validateEmail(){
    let email = document.getElementById('email').value;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailchk').innerHTML = 'enter valid email!';
        // return false;
        emailflaglog = 0;
    }
    else{
        document.getElementById('emailchk').innerHTML = '';
        emailflaglog = 1;
    }
    loginbtn();
    forgotpass();
}
function validatePassword(){
    let pass = document.getElementById('pass').value;
    if (pass.length > 0) {
        document.getElementById('passchk').innerHTML = '';
        passflaglog = 1;
    }
    else{
        document.getElementById('passchk').innerHTML = 'enter valid password!';
        // return false;
        passflaglog = 0;
    }
    loginbtn();
}

function loginbtn(){
    if (passflaglog == 1 && emailflaglog ==1) {
        document.getElementById('loginbtn').disabled = false;
    }
    else{
        document.getElementById('loginbtn').disabled = true;
    }
}

let passflag =0;
function passchk() {
    let pass = document.getElementById('pass').value;
    let cpass = document.getElementById('conpass').value;
    const passRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    // above password regular expression copied from stackoverflow.
    if (!passRegex.test(pass)) {
        document.getElementById('passchk').innerHTML = 'password format is invalid.';
        passflag = 0;
        // return false;
    }
    else {
        document.getElementById('passchk').innerHTML = '';
        if (pass == cpass) {
            passflag = 1;
            console.log('matched pass');
            document.getElementById('passchk').innerHTML = '';
            // return true;
        }
        else {
            document.getElementById('passchk').innerHTML = 'Passwords do not match';
            passflag = 0;
            // return false;
        }
    }
    changePassBtn();
}
function changePassBtn() {
    if (passflag == 1) {
        document.getElementById('changePassBtn').disabled = false;
    }
    else{
        document.getElementById('changePassBtn').disabled = true;
    }
}
function forgotpass(){
    if (emailflaglog == 1) {
        let email = document.getElementById('email').value;
        // document.getElementById("forgotpass").onclick = `forgotRedirector(${email})`;
        document.getElementById( "forgotpass" ).setAttribute( "onClick", `forgotRedirector("${email}");` );
    }
    else{
        // document.getElementById("forgotpass").onclick = '';
        document.getElementById( "forgotpass" ).setAttribute( "onClick", "" );
    }
}
function forgotRedirector(email){
   let host = location.host;
   let protocol = location.protocol;
   location.replace(protocol+"//"+host+"/user/forgot?email="+email)
}