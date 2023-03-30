async function resultID(id)
{
    var resultid = id;
    var dataReq = await fetch(resultid);
    var result_data = await dataReq.json();
    var data=result_data;
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
        <a href="/result/student/report/?studentId=${data[i].student_id}">View Report</a>
       </td>
     </tr>
     
 </tbody>
    `;
  }
    studenttable.innerHTML = student_string;
}