
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
    
    // const questionRequest=await fetch(`/question/questions/category/?category=${categoryId}`)
    // const data=await questionRequest.json();
    // const questions=data.questions;
    // const optionTitle=data.optionTitle;
    


    // var content=``;
    // const question_container=document.getElementById("question-container");
    // if(questions.length==0 || questions==undefined){
    //     content+='<h3 class="data-eror">Question Not Found</h3>'
    //     question_container.innerHTML=content;
    // }else{

    
    // var options=``;
    
    // question_container.innerHTML="";

    

    // for(let i=0;i<questions.length;i++){
    // content+=
    // `
    //                 <div class="container-fluid my-1">
    //                     <div class="question pt-2 mt-2">
    //                     <div class="py-2 h5"><b>
    //                         ${(i+1)}. ${questions[i].question} 
    //                         </b></div>
    //                     <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">`

    //                     for (let j=0;j<questions[i].option.length;j++){

    //                         if(questions[i].correct_ans[j]){ 
    //                             content+=
    //                             `
    //                             <p class="true-answer">
    //                             ${optionTitle[j].toUpperCase()}  ) ${questions[i].option[j]} 
    //                             </p>`;
    //                         }else{
    //                             content+=`<p class="false-answer">
    //                             ${optionTitle[j].toUpperCase()}  ) ${questions[i].option[j]} 
    //                             </p>
                                
    //                             `;
                                
    //                         }
                        
    //                     }

    //                     content+=`</div>
    //                     <div class="question-btns">
    //                         <button class="btn btn-primary" onclick="showModal(this.id)"
    //                         id="${questions[i].question_id}">Edit</button>
    //                         <input type="button" class="btn btn-danger"
    //                         onclick="deleteQuestion('${questions[i].question_id}')" value="Delete">
    //                     </div>
    //                     </div>
    //                 </div>

    //                 `;
    // }
    // question_container.innerHTML=content;
    // }
}
