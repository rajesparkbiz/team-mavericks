
async function toggleSwitch(exam_id) {

  const toggleRequest = await fetch(`/exams/status/?id=${exam_id}`)
}

async function Search(str) {


  const flag = document.getElementById("filter-box").value;

  var searching = document.getElementById("search").value;

  var res = await fetch(`/exams/filter-exam/?search=${str}&flag=${flag}`);
  var data = await res.json();
  var value = data.exam;

  var tbody = document.getElementById("table");

  var content = ``;

  let count = 1;
  var switch_content = ``;
  value.forEach(element => {
    var status = element.exam_isActive;
    var exam_id = element.exam_id;
    var status_content = ``;

    if (status == 'yes') {
      status_content += 'checked';
    } else {
      status_content += '';
    }

    content += '<tr>'
    content += `
            <td> ${count}</td>
            <td> ${element.exam_name} </td>
            <td> ${element.exam_access_code} </td>
            <td> ${element.exam_total_question} </td>
            <td> ${element.createdDate} </td>
            <td>
             <div class="form-check form-switch">
                    <input class="form-check-input switch" type="checkbox" role="switch"
                      onchange="toggleSwitch('${exam_id}')" ${status_content}>
              </div>
            </td>
            <td>
                 <a href="/result/student/?exam_id=${exam_id}">View Result</a>
            </td>
              
            `


    content += '</tr>'
    count++;
  });


  tbody.innerHTML = content;

}

async function result(exam_name) {
  var res = await fetch(`/result/results/student/?exam_name=${exam_name}`);
}

function showAddExamModal() {
  var questionModal = document.getElementById("question-edit-modal");
  questionModal.classList.add("show");
  questionModal.style.display = "block";
  questionModal.classList.add("modal-open");
}


function disableAddExamModal() {
  var questionModal = document.getElementById("question-edit-modal");

  questionModal.classList.remove("show");
  questionModal.style.display = "none";
  questionModal.classList.remove("modal-open");
}

async function examID(id,link) {
  
  const tabId=link.id;

  const tab=document.getElementById(tabId);

  var allPageLink=document.getElementsByClassName("pagination-tab");

  for(let i=0;i<allPageLink.length;i++){
    allPageLink[i].classList.remove('tab-active');
  }

  tab.classList.add('tab-active');
  

  var exam_id = await fetch(id);
  var result = await exam_id.json();
  var exam_data = result.exam_data;


  var questionStatus = result.status;

  var exam_table_string = "";

  var exam_table = document.getElementById('exam_table');

  exam_table_string += `
        <thead>
          <tr>
            <th>No</th>
            <th scope="col">Exam Title</th>
            <th scope="col">Access Code</th>
            <th scope="col">Total Question</th>
            <th scope="col">CreateDate</th>
            <th scope="col">Status</th>
            <th scope="col">Result</th>
            <th scope="col">View Questions</th>
          </tr>
        </thead>
        `;

  for (let i = 0; i < exam_data.length; i++) {

    var questionText = "";
    if (questionStatus[i]) {
      questionText += 'text-success'
    } else {
      questionText += 'text-danger'
    }

    var switchStatus = "";

    if (exam_data[i].exam_isActive == 'yes') {
      switchStatus+='checked';
    }

    exam_table_string += `
            <tbody id="table">
          
            <tr>
              <td>
                ${exam_data[i].exam_id}
              </td>
              <td>
                 ${exam_data[i].exam_name}
              </td>
              <td>
                ${exam_data[i].exam_access_code}
              </td>
              <td>
                ${exam_data[i].exam_total_question}
              </td>
              <td>
                ${exam_data[i].createdDate} 
              </td>
              <td>
                <div class="form-check form-switch">
                  <input class="form-check-input switch" type="checkbox" role="switch"
                    onchange="toggleSwitch('${exam_data[i].exam_id}')" ${switchStatus} flexSwitchCheckDefault>`;
    exam_table_string += `
                </div>
              </td>
              <td>
                <a href="/result/student/?examId=${exam_data[i].exam_id}"> View Result</a>
              </td>
              <td>
                <a href="/exams/displaySelectQuestion/?exam_id=${exam_data[i].exam_id}" id="${exam_data[i].exam_id}" 
                class="${questionText}">
                  View Question
                </a>
              </td>
                
            </tr>
            
        </tbody>           
            `;

    exam_table.innerHTML = exam_table_string;
  }

}