const createExamBtn = document.getElementById("create-exam-btn");
createExamBtn.style.opacity = 0.1;
const totalqueErr = document.getElementById("totalque-err");
const examcodeErr = document.getElementById("examcode-err");
const durationErr = document.getElementById("duration-err");
const examnameErr = document.getElementById("examname-err");
const examMainErr = document.getElementById("main-exam-err");
validateExamTitle();

validateExamAccessCode();


function moveQuestionListPage() {

}

function validateInfo() {
    if (validateExamTitle() && validateExamAccessCode() && validateExamDuration() && validateExamQuestion()) {
        durationErr.innerHTML = "";
        totalqueErr.innerHTML = "";
        examcodeErr.innerHTML = "";
        examnameErr.innerHTML = "";
        examMainErr.innerHTML = ""
        enableBtn();
    } else {
        examMainErr.innerHTML = "Please enter below information valid"
        disableBtn()
    }
}

function disableBtn() {
    createExamBtn.disabled = true;
    createExamBtn.style.opacity = 0.1
}

function enableBtn() {
    createExamBtn.disabled = false;
    createExamBtn.style.opacity = 1
}

function validateExamTitle() {
    let symbol = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '<', '>', '?', '/', ',', '.', '"', ':', ';', '+', '-', '`', '~', '=', '[', ']', '{', '}', "'"];
    examMainErr.innerHTML = ""
    const examname = document.getElementById("examname").value.trim();
    if (examname == '') {
        examnameErr.innerHTML = 'Please enter exam title';
        return false;
    } else if (examname.length < 4) {
        examnameErr.innerHTML = 'Please enter exam title greater than 3 character';
        return false;
    }
    else if(!isNaN(examname)) {
        examnameErr.innerHTML = '*you cannot enter a number value in exam name';
        return false;
    }
    else if (examname.startsWith('_') || examname.endsWith('_')){
        examnameErr.innerHTML = 'examname cannot start or end with "_" ';
    } else {
        for (i = 0; i < symbol.length; i++) {
            if (examname.includes(symbol[i])) {
                examnameErr.innerHTML = '*you cannot enter special character!';
                return false;
            }
        }
        examnameErr.innerHTML = "";
        return true;
    }
}



function validateExamAccessCode() {

    let symbol1 = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '<', '>', '?', '/', ',', '.', '"', ':', ';', '+', '-', '`', '~', '=', '[', ']', '{', '}', '_'];

    examMainErr.innerHTML = ""

    const examcode = document.getElementById("examcode").value.trim();
    if (examcode == '') {
        examcodeErr.innerHTML = 'Please enter exam access code';
        return false;
    } else if (examcode.length > 6) {
        examcodeErr.innerHTML = 'Please enter 6 character access code';
        return false;
    } else {
        for (i = 0; i < symbol1.length; i++) {
            if (examcode.includes(symbol1[i])) {
                examcodeErr.innerHTML = '*you cannot enter special character!';
                return false;
            }
        }

        examcodeErr.innerHTML = "";
        return true;
    }
}


function validateExamDuration() {
    examMainErr.innerHTML = ""

    const duration = document.getElementById("duration").value.trim();
    if (duration == '') {
        durationErr.innerHTML = 'Please enter exam duration';
        return false;
    } else {
        durationErr.innerHTML = "";
        return true;
    }
}


function validateExamQuestion() {
    examMainErr.innerHTML = ""

    const totalque = document.getElementById("totalque").value.trim();
    if (totalque == '') {
        totalqueErr.innerHTML = 'Please enter exam total question';
        return false;
    } else {
        totalqueErr.innerHTML = "";
        return true;
    }
}

