
var questionPage = document.getElementById('question-page-container');

async function showModal(question_id) {
    //get request for get perticular one question
    const questionDataReq = await fetch(`/question/questions/data/one/?id=${question_id}`);
     const questionData = await questionDataReq.json();
 
     const question = questionData.questionData.question;
     const questionAnswer = questionData.questionData.question_answer;
 
     const options = questionData.questionOption;
 
     var option_content = '';
     for (let i = 0; i < options.length; i++) {
         option_content +=
             `<div class="form-check my-3">
                 <input class="form-check-input mt-check question-option-input-radio" type="radio" name="option" value="${options[i].option_value}">
                 <input type='hidden' value='${options[i].option_id}' class='option-id'>
                 <input class="form-control question-option-input" type="text" value="${options[i].option_value}" name="option-value" onkeyup="editoptionschk()">
               </div>`;
     }
     option_content += `<small class="warn" id="editoptionquestionwarn"></small>`;
     totaloptions = options.length;
     document.getElementById("question-option").innerHTML = option_content;
 
     //set dynamic edit modal save btn id
     const editQuestionBn = document.getElementsByClassName("editQuestion-btn");
     editQuestionBn[0].id = question_id;
 
     //display modal sheet
     var questionModal = document.getElementById("question-modal");
     questionModal.classList.add("show");
     questionModal.style.display = "block";
     questionModal.classList.add("modal-open");
 
     questionPage.classList.add('blur-card');
 
     bindModalData(question, questionAnswer, options);
}

function showAddQuestionModal() {
    var questionModal = document.getElementById("question-edit-modal");
    questionModal.classList.add("show");
    questionModal.style.display = "block";
    questionModal.classList.add("modal-open");

    questionPage.classList.add('blur-card');
}

function disableModal() {
    editquestionchk_flag = 1, editoptionschk_flag = 1;
    var questionModal = document.getElementById("question-modal");
    questionModal.classList.remove("show");
    questionModal.style.display = "none";
    questionModal.classList.remove("modal-open");
    questionPage.classList.remove('blur-card');
    editquebtn();
}

function disableAddQuestionModal() {
    var questionModal = document.getElementById("question-edit-modal");

    questionModal.classList.remove("show");
    questionModal.style.display = "none";
    questionModal.classList.remove("modal-open");
    questionPage.classList.remove('blur-card');
}

function bindModalData(question, answer, ...questionOptions) {

    const option = questionOptions[0];
    const options = document.getElementsByClassName('question-option-input-radio');

    for (let i = 0; i < option.length; i++) {
        if (option[i].option_value == answer) {
            options[i].checked = "true"
        }
    }

    var questionTag = document.getElementById("question-add-input");

    questionTag.value = question;
}


async function editQuestionBtn(id) {
    const questionId = id;
    var questionAnswer;
    var questionOptions = [];
    var optionsId = [];

    const questionTag = document.getElementById("question-add-input");
    const question = questionTag.value;
    const optionsAnswer = document.getElementsByClassName("question-option-input-radio");
    const options = document.getElementsByClassName("question-option-input");
    const option_ids = document.getElementsByClassName("option-id");
    //check the currect answer
    let ansindex;
    for (let i = 0; i < optionsAnswer.length; i++) {
        if (optionsAnswer[i].checked) {
            questionAnswer = optionsAnswer[i].value;
            ansindex = i;
        }
    }

    //fetch all question options
    for (let i = 0; i < options.length; i++) {
        questionOptions[i] = options[i].value;
    }

    //fetch all question options
    for (let i = 0; i < option_ids.length; i++) {
        optionsId[i] = option_ids[i].value;
    }
    const url = "/question/update";
    questionAnswer = questionOptions[ansindex];
    const data = { questionId, question, questionAnswer, questionOptions, optionsId };
    const fetchOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    const updateRequest = await fetch(url, fetchOptions);
    location.reload();
}

async function deleteQuestion(id) {
    const questionId = id;
    const status = await customAlert(id)
        ;
    if (status) {
        const deleteQuestion = await fetch(`/question/delete/?id=${id}`);
    }
    location.reload();
}

async function customAlert(id) {
    const isDelete = await swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this Question",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    });

    if (isDelete) {
        const status = await swal(`question ${id} has been deleted!`, {
            icon: "success",
        });
        if (status) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

let optionflag = 4;
function addQuestionOption() {
    const optionContent = document.getElementById("question-option-content");
    const content = `<div class="form-check mb-2" id="option${optionflag}">
    <input class="form-check-input" type="radio" name="optionid" value="${optionflag}" onchange="optionschk()">
    <input class="form-control form-control-sm" type="text" name="option" onkeyup="optionschk()">
</div>`;
    if (optionflag < 7) {
        const div = document.createElement("div");

        div.innerHTML = content;


        optionContent.appendChild(div);
        optionflag++;
    }
}


function toggleCodingInput(value) {
    const status = value.checked;
    const codingInput = document.getElementById("coding-input-div");

    if (status) {
        const content = `
        <div class="form-outline mb-4">
        <label class="form-label" for="coding_question">Question Code</label>
        <textarea id="coding_question" rows="4" class="form-control" name="coding_question" onkeyup="codingquechk()"></textarea>
        </div>
        <small class="warn" id="addcodingwarn"></small>
        `;
        codingInput.innerHTML = content;
    } else {
        codingInput.innerHTML = "";
    }
}

let questionchk_flag = 0, optionschk_flag = 0, optionsradiochk_flag = 0, coding_question_flag = 1, editoptionschk_flag = 1, editquestionchk_flag = 1;

function questionchk() {
    let question = document.getElementById("question").value;
    let warning = document.getElementById("addquestionwarn");
    if ((question.trim()).length > 0) {
        questionchk_flag = 1;
        warning.innerHTML = "";
        addquebtn();
    }
    else {
        questionchk_flag = 0;
        warning.innerHTML = "Enter a question!";
        addquebtn();
    }
}

function optionschk() {
    let noofoption = 0;
    let options = document.getElementsByName("option");
    let optionslen = document.getElementsByName("option").length;
    let warning = document.getElementById("optionquestionwarn");
    let rightwarning = document.getElementById("rightoptionwarn");
    rightwarning.innerHTML = "select right option!";
    optionsradiochk_flag =0;
    let sameoptionsflag = 0;
    for (let index = 0; index < optionslen; index++) {
        if (options[index].value.trim().length > 0) {
            let optionradiochk = document.getElementsByName("optionid")[index].checked;
            if (optionradiochk == true) {
                optionsradiochk_flag = 1;
                rightwarning.innerHTML = "";
            }
            noofoption++;
        }
    }
    for (let i = 0; i < optionslen; i++) {
        for (let j = i+1; j < optionslen; j++) {
            if (((options[i].value).trim()).toUpperCase() == ((options[j].value).trim()).toUpperCase()) {
                if ((options[i].value).trim() != '') {
                    sameoptionsflag++;
                }
            }
        }
    }
    if (noofoption >= 4 && sameoptionsflag <= 0) {
        optionschk_flag = 1;
        warning.innerHTML = "";
    }
    else {
        if (sameoptionsflag >= 0) {
            if (noofoption >= 4) {
                warning.innerHTML = 'Two or more options are same!';
            }
            else{
                warning.innerHTML = "Enter at least 4 options!";
            }
        }
        else{
            warning.innerHTML = "Enter at least 4 options!";
        }
        optionschk_flag = 0;
    }
    addquebtn();
}

function codingquechk() {
    let coding_question_chkbox = document.getElementById("coding_question_chkbox").checked;
    let warning = document.getElementById("addcodingwarn");
    if (coding_question_chkbox == true) {
        let coding_question = document.getElementById('coding_question').value;
        if ((coding_question.trim()).length > 0) {
            coding_question_flag = 1;
            warning.innerHTML = "";
            addquebtn();
        }
        else {
            coding_question_flag = 0;
            warning.innerHTML = "Enter a coding question!";
            addquebtn();
        }
    }
    else {
        coding_question_flag = 1;
    }
    addquebtn();
}
function editquestionchk() {
    let question = document.getElementById("question-add-input").value;
    let warning = document.getElementById("editquestionwarn");

    if ((question.trim()).length > 0) {
        editquestionchk_flag = 1;
        warning.innerHTML = "";
        editquebtn();
    }
    else {
        editquestionchk_flag = 0;
        warning.innerHTML = "Enter a question!";
        editquebtn();
    }
}

function editoptionschk() {
    let noofoptions = 0,sameoptionsflag=0;
    let warning = document.getElementById("editoptionquestionwarn");
    const options = document.getElementsByClassName("question-option-input");

    for (let index = 0; index < totaloptions; index++) {
        if (((options[index].value).trim()).length > 0) {
            noofoptions++;
        }
    }
    for (let i = 0; i < totaloptions; i++) {
        for (let j = i+1; j < totaloptions; j++) {
            if (((options[i].value).trim()).toUpperCase() == ((options[j].value).trim()).toUpperCase()) {
                sameoptionsflag++;
            }
        }
    }
    if (noofoptions == totaloptions && sameoptionsflag <= 0) {
        editoptionschk_flag = 1;
        warning.innerHTML = '';
        editquebtn();
    }
    else {
        if (sameoptionsflag > 0) {
            if (noofoptions == totaloptions) {
                warning.innerHTML = 'Two or more options are same!';
            }
            else{
                warning.innerHTML = "Enter at least 4 options!";
            }
        }
        else{
            warning.innerHTML = 'Enter all options!';
        }
        editoptionschk_flag = 0;
        editquebtn();
    }
}
function addquebtn() {
    let addque = document.getElementById("addque-btn");
    if (questionchk_flag == 1 && optionschk_flag == 1 && optionsradiochk_flag == 1 && coding_question_flag == 1) {
        addque.disabled = false;
    }
    else {
        addque.disabled = true;
    }
}
function editquebtn() {
    let editquebtn = document.getElementsByName('editbtn');
    if (editquestionchk_flag == 1 && editoptionschk_flag == 1) {
        editquebtn[0].disabled = false;
    }
    else {
        editquebtn[0].disabled = true;
    }
}
async function toogle(value) {

    const categoryId = value.id;
    //this code use for chnage the tab 
    const allTabs = document.querySelectorAll('.nav-link');
    allTabs.forEach((tab) => {
        tab.classList.remove('active');
    })


    //this code use for active only one clicked tab
    const tabId = value.id;
    const tab = document.getElementById(tabId);
    tab.classList.add('active');

    const questionRequest = await fetch(`/question/questions/category/?category=${categoryId}`)
    const data = await questionRequest.json();
    const questions = data.questions;
    const optionTitle = data.optionTitle;



    var content = ``;
    const question_container = document.getElementById("question-container");
    if (questions.length == 0 || questions == undefined) {
        content += '<h3 class="data-eror">Question Not Found</h3>'
        question_container.innerHTML = content;
    } else {


        var options = ``;

        question_container.innerHTML = "";



        for (let i = 0; i < questions.length; i++) {
            content +=
                `
                    <div class="container-fluid my-1">
                        <div class="question pt-2 mt-2">
                        <div class="py-2 h5"><b>
                            ${(i + 1)}. ${questions[i].question} 
                            </b></div>
                        <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">`

            for (let j = 0; j < questions[i].option.length; j++) {

                if (questions[i].correct_ans[j]) {
                    content +=
                        `
                                <p class="true-answer">
                                ${optionTitle[j].toUpperCase()}  ) ${questions[i].option[j]} 
                                </p>`;
                } else {
                    content += `<p class="false-answer">
                                ${optionTitle[j].toUpperCase()}  ) ${questions[i].option[j]} 
                                </p>
                                
                                `;

                }

            }

            content += `</div>
                        <div class="question-btns">
                            <button class="btn btn-primary" onclick="showModal(this.id)"
                            id="${questions[i].question_id}">Edit</button>
                            <input type="button" class="btn btn-danger"
                            onclick="deleteQuestion('${questions[i].question_id}')" value="Delete">
                        </div>
                        </div>
                    </div>

                    `;
        }



        question_container.innerHTML = content;
    }
}

