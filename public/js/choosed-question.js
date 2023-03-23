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
    const data = await questions.json();
    
    const questionContainer = document.getElementsByClassName("choosed-question-container")[0];

    var content = ``;
    for (let i = 0; i < data.length; i++) {
        const div = document.createElement('div');
        content += `
            <div class="question m-4">
                <p>${data[i]}</p>
            </div>`;
    }
    questionContainer.innerHTML=content;

}