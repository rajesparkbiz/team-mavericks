var questionPage = document.getElementById('question-page-container');

async function showModal(question_id) {

    //get request for get perticular one question
    const questionDataReq = await fetch(`/dashboard/question/data/one/?id=${question_id}`);
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
                <input class="form-control question-option-input" type="text" value="${options[i].option_value}" name="option-value">
              </div>`;
    }

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
    var questionModal = document.getElementById("question-modal");

    questionModal.classList.remove("show");
    questionModal.style.display = "none";
    questionModal.classList.remove("modal-open");
    questionPage.classList.remove('blur-card');
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

    var questionTag = document.getElementById("question");

    questionTag.value = question;
}


async function editQuestionBtn(id) {

    const questionId = id;
    var questionAnswer;
    var questionOptions = [];
    var optionsId = [];

    const questionTag = document.getElementById("question");
    const question = questionTag.value;
    const optionsAnswer = document.getElementsByClassName("question-option-input-radio");
    const options = document.getElementsByClassName("question-option-input");
    const option_ids = document.getElementsByClassName("option-id");

    //check the currect answer
    for (let i = 0; i < optionsAnswer.length; i++) {
        if (optionsAnswer[i].checked) {
            questionAnswer = optionsAnswer[i].value;
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
    const data = { questionId, question, questionAnswer, questionOptions, optionsId };
    const fetchOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    const updateRequest = await fetch(url, fetchOptions);
}

async function deleteQuestion(id) {
    const questionId = id;
    const status = await customAlert(id)
        ;
    if (status) {
        const deleteQuestion = await fetch(`/question/delete/?id=${id}`);
    }
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
        </div>`;

        codingInput.innerHTML = content;
    } else {
        codingInput.innerHTML = "";
    }
}
let questionchk_flag=0,optionschk_flag=0,optionsradiochk_flag=0,coding_question_flag=1;

function questionchk() {
    let question = document.getElementById("question").value;
    if ((question.trim()).length > 0) {
        questionchk_flag = 1;
        addquebtn();
    }
    else{
        questionchk_flag = 0;
        addquebtn();
    }
}

function optionschk(){
    let noofoption=0;
    let options = document.getElementsByName("option");
    let optionslen = document.getElementsByName("option").length;
    for (let index = 0; index < optionslen; index++) {
        if (options[index].value.trim().length > 0) {
            let optionradiochk = document.getElementsByName("optionid")[index].checked;
            console.log(optionradiochk);
            if (optionradiochk == true) {
                optionsradiochk_flag = 1;
            }
            console.log(noofoption);
            noofoption++;
        }
    }
    console.log(noofoption);
    if (noofoption >= 4) {
        optionschk_flag = 1;
    }
    else{
        optionschk_flag = 0;
    }
    addquebtn();
}

function codingquechk(){
    let coding_question_chkbox = document.getElementById("coding_question_chkbox").checked;
    if (coding_question_chkbox == true) {
        let coding_question = document.getElementById('coding_question').value;
        if ((coding_question.trim()).length > 0) {
            coding_question_flag = 1;
            addquebtn();
        }
        else{
            coding_question_flag = 0;
            addquebtn();
        }
    }
    else{
        coding_question_flag = 1;
    }
    addquebtn();
}
function addquebtn(){
    let addque = document.getElementById("addque-btn");
    if (questionchk_flag == 1 && optionschk_flag == 1 && optionsradiochk_flag ==1 && coding_question_flag ==1) {
        addque.disabled = false;
    }
    else{
        addque.disabled = true;
    }
}