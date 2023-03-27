
async function toogle(value, examId) {

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

    const questionRequest = await fetch(`/question/question/selected/?category=${categoryId}&examId=${examId}`)
    const data = await questionRequest.json();

    const questionSelected = data.defaultQuestionIds;
    var defaultQuestionIds;
    if(questionSelected.length>0){
        defaultQuestionIds=(questionSelected[0].id).split(",")
    }else{
        defaultQuestionIds=[]
    }
    

    const questions = data.questions;
    

    var content = ``;
    const question_container = document.getElementById("question-container");
    if (questions.length == 0 || questions == undefined) {
        content += '<h3 class="data-eror">Question Not Found</h3>'
        question_container.innerHTML = content;
    } else {


        question_container.innerHTML = "";


        content +=
            `
            <div id="select-action-btn">
           
            <div id="saveSelectQuestion">
              <input type="button" class="btn btn-primary" value="Save" onclick='saveSelectedQuestion("${categoryId}","${examId}")'>
            </div>
            <div id="saveSelectQuestion">
              <a href="/exams/choosedQuestion/?exam_id=${examId}" class="btn btn-primary">Next</a>
            </div>
          </div>
    `;
        for (let i = 0; i < questions.length; i++) {
            content +=
                `
                    <div class="container-fluid my-1">
                        <div class="question pt-2 mt-2">
                        <div class="py-2 d-flex">
                            
                            <div class='question-checkbox mx-3'>
                                <input class="${categoryId}-${examId}" id="${questions[i].question_id}" type='checkbox'/>
                            </div>
                            <div class='question-input'>
                                <p id="${questions[i].question_id}">
                                ${questions[i].question}
                                </p>
                            </div>

                        </div>
                        </div>
                    </div>

    `;
        }


        question_container.innerHTML = content;
    }
}

async function saveSelectedQuestion(categoryId, examId) {
    const selectedQuestions = document.getElementsByClassName(`${categoryId}-${examId}`);
    var selectedQuestion = [];
    var count = 0;
    for (let i = 0; i < selectedQuestions.length; i++) {
        if (selectedQuestions[i].checked) {
            selectedQuestion[count] = selectedQuestions[i].id
            count++;
        }
    }



    const questionRequest = await fetch(`/exams/insert/Question/?categoryid=${categoryId}&examid=${examId}&questions=${selectedQuestion}`);

    const alertDiv = document.getElementById("page-alert");
    alertDiv.innerHTML =
        `
        <div class="alert alert-success" role="alert">
            ${document.getElementById(categoryId).innerText} Category Question Save Successfully.
        </div>
    `;

    setTimeout(() => {
        alertDiv.innerHTML = "";
    }, 2000);

}
