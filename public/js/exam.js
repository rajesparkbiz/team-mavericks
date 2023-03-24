// function enableText(tag) {
//   const tagClass = tag.classList[0];
//   const id = tag.id;
//   if (tagClass == 'text-danger') {
//     const viewLink = document.getElementById(id);
//     viewLink.innerHTML = 'Choose Question'
//   }
// }

// function disableText(tag) {
//   const viewLink = document.getElementById(tag.id);
//   viewLink.innerHTML = "View Question";
// }

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
            </td>`


    content += '</tr>'
    count++;
  });


  tbody.innerHTML = content;

}

async function result(exam_name) {
  var res = await fetch(`/result/results/student/?exam_name=${exam_name}`);
}