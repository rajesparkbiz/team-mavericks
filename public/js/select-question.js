
async function toogle(value) {

    const categoryId=value.id;
        //this code use for chnage the tab 
    const allTabs = document.querySelectorAll('.nav-link');
    allTabs.forEach((tab) => {
        tab.classList.remove('active');
    })
    

    //this code use for active only one clicked tab
    const tabId = value.id;
    const tab = document.getElementById(tabId);
    tab.classList.add('active');
    
    const questionRequest=await fetch(`/question/questions/category/?category=${categoryId}`)
    const data=await questionRequest.json();
    const questions=data.questions;


    
    var content=``;
    const question_container=document.getElementById("question-container");
    if(questions.length==0 || questions==undefined){
        content+='<h3 class="data-eror">Question Not Found</h3>'
        question_container.innerHTML=content;
    }else{

    
    question_container.innerHTML="";

    
    content+=
    `
        <div id="saveSelectQuestion">
        <input type="button" class="btn btn-primary" value="Save" onclick='saveSelectedQuestion()'>
        </div>
    `;
    for(let i=0;i<questions.length;i++){
    content+=
    `
                    <div class="container-fluid my-1">
                        <div class="question pt-2 mt-2">
                        <div class="py-2 d-flex">
                            
                            <div class='question-checkbox mx-3'>
                                <input type='checkbox'/>
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

   
    question_container.innerHTML=content;
    }
}

function saveSelectedQuestion(){
    
}
