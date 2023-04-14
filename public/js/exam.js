getAllDatesTags()

function getAllDatesTags(){
  const dateTds = document.querySelectorAll('.exam-date');
  dateTds.forEach((e) => {
    e.innerText = convertUTCTime(e.innerText.split("GMT")[0]);
  });
}

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
  document.getElementById("examname").value="";
  document.getElementById("examcode").value="";
  document.getElementById("totalque").value="";
  document.getElementById("duration").value="";

  var questionModal = document.getElementById("question-edit-modal");

  questionModal.classList.remove("show");
  questionModal.style.display = "none";
  questionModal.classList.remove("modal-open");
}

async function examID(id, link, flag) {



  if (flag == 0) {
    const tabId = link.id;

    const tab = document.getElementById(tabId);

    var allPageLink = document.getElementsByClassName("pagination-tab");

    for (let i = 0; i < allPageLink.length; i++) {
      allPageLink[i].classList.remove('tab-active');
    }

    tab.classList.add('tab-active');
  }



  var exam_id = await fetch(id);
  var result = await exam_id.json();
  var exam_data = result.exam_data;
  var page = result.page;
  var nextpage = result.nextpage;
  var count = result.count;
  var prev = result.prev;


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
            <th scope="col">Delete</th>
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
      switchStatus += 'checked';
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
              <td class='exam-date'>
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
              <td>
              <input type="button" value="Delete" class="btn btn-primary" onclick="deleteExam('${exam_data[i].exam_id}')">
              </td>
            </tr>
            
        </tbody>           
            `;
    
    exam_table.innerHTML = exam_table_string;

    var paginationTag = document.getElementById("pagination-control");

    var tabContent = ``;
    for (let i = 1; i <= count; i++) {

      var activeTab = ``;
      if (i == page) {
        activeTab += 'tab-active'
      }

      var prevDisable = ``;

      if (prev == 0) {
        prevDisable += 'disabled';
      }

      tabContent += `  <li class="page-item" id="list${i}">
      <p class="page-link pagination-tab ${activeTab}"
        onclick="examID('/dashboard/exams?page=${i}&AJAX=true',this,0)" id="tab-${i}">
        ${i}
      </p>
    </li>`
    }

    var paginationContent = ` 
      <li class="page-item ${prevDisable}">
      <input class="page-link" type="button" value="Previous" onclick="examID('/dashboard/exams?page=${prev}&AJAX=true',this,1)">    
      </li>

     ${tabContent}
  
    <li class="page-item">
      <input class="page-link" type="button" value="Next" onclick="examID('/dashboard/exams?page=${nextpage}&AJAX=true',this,1)">  
    </li>
  `

    paginationTag.innerHTML = paginationContent;

    getAllDatesTags()
  }

}

async function deleteExam(id) {

  const isDelete = confirm("Are you sure?");

  if (isDelete) {
    const deleteRequest = await fetch(`/exams/delete/?id=${id}`);
    const res = await deleteRequest.json();

    const status = res.status;
    if (status == false) {
      alert("you can't delete this exam because currently exam is active!");
    } else {
      location.reload()
    }
  }
}

function convertUTCTime(time) {
  let userTime = moment.utc(time).local().format("YYYY-MM-DD h:mm:ss A")
  return userTime;                                    
}  