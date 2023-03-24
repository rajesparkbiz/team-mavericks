const createExamBtn=document.getElementById("create-exam-btn");
createExamBtn.style.opacity=0.1;
const totalqueErr=document.getElementById("totalque-err");
const examcodeErr=document.getElementById("examcode-err");
const durationErr=document.getElementById("duration-err");
const examnameErr=document.getElementById("examname-err");
const examMainErr=document.getElementById("main-exam-err");

function moveQuestionListPage(){

}
let validateExamTitle_flag = 0,validateExamAccessCode_flag=0,validateExamDuration_flag=0,validateExamQuestion_flag=0;
validateExamQuestion();
validateExamDuration();
async function validateExamTitle(){
    examMainErr.innerHTML=""
    const examname=document.getElementById("examname").value.trim();
    let res = await fetch(`/exams/checkexamname?examname=${examname}`);
    let examnamechk = await res.json();
    console.log(examnamechk['no_of_exam']);
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
    examMainErr.innerHTML=""

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
    examMainErr.innerHTML=""

    const duration=document.getElementById("duration").value.trim();
    if(duration==''){
        durationErr.innerHTML='Please enter exam duration';
        validateExamDuration_flag=0;
    }else{
        durationErr.innerHTML="";
        validateExamDuration_flag = 1;
    }
    validateInfo();
}


function validateExamQuestion(){
    examMainErr.innerHTML=""

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
    console.log(validateExamQuestion_flag,validateExamQuestion_flag,validateExamAccessCode_flag,validateExamTitle_flag);
    if(validateExamQuestion_flag == 1 && validateExamQuestion_flag==1 && validateExamAccessCode_flag == 1 && validateExamTitle_flag==1){
        durationErr.innerHTML="";
        totalqueErr.innerHTML="";
        examcodeErr.innerHTML="";
        examnameErr.innerHTML="";
        examMainErr.innerHTML=""
        enableBtn();
    }else{
        examMainErr.innerHTML="Please enter below information valid"
        disableBtn();
    }
}

function disableBtn(){
    createExamBtn.disabled=true;
    createExamBtn.style.opacity=0.1
}

function enableBtn(){
    createExamBtn.disabled=false;
    createExamBtn.style.opacity=1
}
