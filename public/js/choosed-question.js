async function toogle(value, eaxmId) {
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


    const questions = await fetch(`/exams/choosed/questions/?examId=${eaxmId}&categoryId=${categoryId}`);
    const questionData = await questions.json();
    const data=questionData.categoryQuestions;
    
    const questionContainer = document.getElementsByClassName("choosed-question-container")[0];

    var content = ``;
    for (let i = 0; i < data.length; i++) {
        const div = document.createElement('div');
        content += `
        <div class="question-bar">
        <div class="question m-3">
          <p id="${data[i].question_id}">
            ${data[i].question}
          </p>
        </div>
        <div class="question-action-btn">
          <input type="button" value="Discard" class="btn btn-primary" onclick="discardQuestion('${eaxmId}','${data[i].question_id}','${categoryId}')">
        </div>
       </div>`;
    }
    questionContainer.innerHTML=content;

}

async function discardQuestion(examId,questionId,categoryId){
  const discardReq=await fetch(`/question/question/discard/?examId=${examId}&questionId=${questionId}&categoryId=${categoryId}`);

  location.reload();
}