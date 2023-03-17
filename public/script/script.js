let emailflaglog = 0;
let passflaglog = 0;
function loginemail(){
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
}
function loginpass(){
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