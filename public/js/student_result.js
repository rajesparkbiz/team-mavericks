async function resultID(id)
{
    var resultid = id;
    var dataReq = await fetch(resultid);
    var result = await dataReq.json();
    var data=result.student_master;
    const examId=result.examId;
    var page=result.page;
    var prev=result.prev;
    var count=result.count;
    var nextpage=result.nextpage;


    var student_string = "";
    
    var studenttable = document.getElementById('studenttable');
    
    student_string += `
    
  <thead>
    <tr>
      <th>No</th>
      <th scope="col">Student Name</th>
      <th scope="col">Exam Name</th>
      <th scope="col">Total Marks</th>
      <th scope="col">Obtain Mark</th>
      <th scope="col">View Report</th>
     
    </tr>
  </thead>`;
  for(let i=0; i<data.length; i++){
    student_string += `
    <tbody id="table">
   
     <tr>
       <td>
           ${(i+1)}
       </td>
       <td>
         ${data[i].fname}
       </td>
       <td>
         ${data[i].exam_name}
       </td>
       <td>
         ${data[i].total_mark}
       </td>
       <td>
         ${data[i].obtain_mark}
       </td>
       <td>
        <a href="/result/student/report/?studentId=${data[i].student_id}&examId=${examId}">View Report</a>
       </td>
     </tr>
     
 </tbody>
    `;
  }
    studenttable.innerHTML = student_string;

    var paginationTag=document.getElementById("pagination-control");

    var tabContent=``;
    for(let i=1;i<=count;i++){

      var activeTab=``;
      if(i==page){
        activeTab+='tab-active'
      }

      var  prevDisable=``;

      if(prev==0){
        prevDisable+='disabled';
      }
      
      tabContent+=`  <li class="page-item" id="list${i}">
      <p class="page-link pagination-tab ${activeTab}"
        onclick="resultID('/result/student/?page=${i}&AJAX=true&examId=${examId}',this,0)" id="tab-${i}">
        ${i}
      </p>
    </li>`
    }

    var paginationContent=` 
      <li class="page-item ${prevDisable}">
      <input class="page-link" type="button" value="Previous" onclick="resultID('/result/student/?page=${prev}&AJAX=true&examId=${examId}',this,1)">    
      </li>

     ${tabContent}
  
    <li class="page-item">
      <input class="page-link" type="button" value="Next" onclick="resultID('/result/student/?page=${nextpage}&AJAX=true&examId=${examId}',this,1)">  
    </li>
  `

  paginationTag.innerHTML=paginationContent;
}