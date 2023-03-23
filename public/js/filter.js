
async function Search(str){


 const flag = req.query.searchexam;
 if(flag == searchexam)
 {

  const flag = document.getElementById("filter-box").value;
  console.log(str);
    console.log(flag);

 var searching = document.getElementById("search").value;

 var res = await fetch(`/searchexam/?search=${str}&flag=${flag}`);
 var data = await res.json();
var value = data.exam;
console.log("value"+value);

 var tbody = document.getElementById("table");

    var content = ``;
    let count=1;
    value.forEach(element => {
      content += '<tr>'
      content += `
            <td> ${count}</td>
            <td> ${element.exam_name} </td>
            <td> ${element.exam_access_code} </td>
            <td> ${element.exam_total_question} </td>
            <td>  
            if(exam_isActive=='yes')
            {
                <input class="form-check-input switch" type="checkbox" role="switch"
                checked >
                      
            }
           ${element.exam_isActive} </td>
            <td> ${element.createdate} </td>`;

      content += '</tr>'
      count++;
    });

    
    tbody.innerHTML = content;

  }
else{
    const flag = document.getElementById("filter-box").value;

    console.log(str);
    console.log(flag);

    var searching = document.getElementById("search").value;
    var res = await fetch(`/student/?search=${str}&flag=${flag}`);
    var data = await res.json();
    var value = data.searchfname;
    var tbody = document.getElementById("table");

    var content = ``;
    let count=1;
    value.forEach(element => {
      content += '<tr>'
      content += `
            <td> ${count}</td>
            <td> ${element.fname} </td>
            <td> ${element.lname} </td>
            <td> ${element.gender} </td>
            <td> ${element.email} </td>
            <td> ${element.mobile} </td>

            <td> ${element.enrollment} </td>
            <td> ${element.qualification} </td>
            <td> ${element.city} </td>
            <td> ${element.college} </td>
            <td> ${element.birthdate} </td>
            <td> ${element.createdate} </td>`;

      content += '</tr>'
      count++;
    });

    
    tbody.innerHTML = content;
}
}
 
    
