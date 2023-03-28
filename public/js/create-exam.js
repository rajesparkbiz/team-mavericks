const createExamBtn=document.getElementById("create-exam-btn");
const totalqueErr=document.getElementById("totalque-err");
const examcodeErr=document.getElementById("examcode-err");
const durationErr=document.getElementById("duration-err");
const examnameErr=document.getElementById("examname-err");

let validateExamTitle_flag = 0,validateExamAccessCode_flag=0,validateExamDuration_flag=0,validateExamQuestion_flag=0;
async function validateExamTitle(){
    const examname=document.getElementById("examname").value.trim();
    let res = await fetch(`/exams/checkexamname?examname=${examname}`);
    let examnamechk = await res.json();
    if(examname==''){
        examnameErr.innerHTML='Please enter exam title';
        validateExamTitle_flag =0;
    }else if(examname.length<6){
        examnameErr.innerHTML='Please enter exam title greater than 6 character';
        validateExamTitle_flag =0;
    }else if(examnamechk['no_of_exam'] > 0){
        examnameErr.innerHTML='title already exists';
        validateExamTitle_flag =0;
    }
    else{
        examnameErr.innerHTML="";
        validateExamTitle_flag =1;
    }
    validateInfo();
}

function validateExamAccessCode(){

    const examcode=document.getElementById("examcode").value.trim();
    if(examcode==''){
        examcodeErr.innerHTML='Please enter exam access code';
        validateExamAccessCode_flag=0;
    }else if(examcode.length>6){
        examcodeErr.innerHTML='Please enter 6 character access code';
        validateExamAccessCode_flag=0;
    }else{
        examcodeErr.innerHTML="";
        validateExamAccessCode_flag=1;
    }
    validateInfo();
}


function validateExamDuration(){

    const duration=document.getElementById("duration").value.trim();
    if(duration.length <= 0){
        durationErr.innerHTML='Please enter exam duration';
        validateExamDuration_flag=0;
    }else{
        durationErr.innerHTML="";
        validateExamDuration_flag = 1;
    }
    validateInfo();
}


function validateExamQuestion(){
    const totalque=document.getElementById("totalque").value.trim();   
    if(totalque==''){
        totalqueErr.innerHTML='Please enter exam total question';
        validateExamQuestion_flag = 0;
    }else{
        totalqueErr.innerHTML="";
        validateExamQuestion_flag=1;
    }
    validateInfo();
}

function validateInfo(){
    if(validateExamQuestion_flag == 1 && validateExamDuration_flag==1 && validateExamAccessCode_flag == 1 && validateExamTitle_flag==1){
        durationErr.innerHTML="";
        totalqueErr.innerHTML="";
        examcodeErr.innerHTML="";
        examnameErr.innerHTML="";
        enableBtn();
    }else{
        disableBtn();
    }
}

function disableBtn(){
    createExamBtn.disabled=true;
}

function enableBtn(){
    createExamBtn.disabled=false;
}