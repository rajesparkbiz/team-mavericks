
google.charts.load('current', { 'packages': ['corechart'] });
var displayChartFlag = 'timeChart';
const header = document.getElementById("chart-toggle-btn");
const categoryInfo = document.getElementById("category-info");

async function displayChart() {
    categoryInfo.innerHTML="";
    header.setAttribute('onclick', 'displayTimeLine()')

    header.innerHTML =
        `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar4-week" viewBox="0 0 16 16">
        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z"/>
        <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
        </svg>`;

    const req = await fetch('/chart/displayPeiChart');
    const sample = await req.json();

    var data = google.visualization.arrayToDataTable(sample);

    var options = {
        is3D: true,
    };

    var chart = new google.visualization.PieChart(categoryInfo);

    chart.draw(data, options);
}


async function displayTimeLine() {
    categoryInfo.innerHTML="";

    header.setAttribute('onclick', 'displayChart()')

    header.innerHTML =
        `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi       bi-bar-chart-fill" viewBox="0 0 16 16">
        <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
        </svg>`;

    const req = await fetch('/chart/displayTimeLine');
    const sample = await req.json();

    const category=sample.category;
    const questionsRatio=sample.questionsRatio;
    var content=``;
    for (let i = 0; i < category.length; i++) {

        if (i > 4) {
            break;
        }

        content+=`

        <div class="item p-3">
            <div class="row align-items-center">

                <div class="col">
                    <div class="title mb-1 ">
                        ${category[i].category_name.toUpperCase()}
                    </div>
                    <div class="progress">
                        <div class="progress-bar bg-success"
                            role="progressbar"
                            style="${questionsRatio[i]}"
                            aria-valuenow="25" aria-valuemin="0"
                            aria-valuemax="100"></div>
                    </div>
                </div>

            </div>

        </div>`


    }
    categoryInfo.innerHTML=content;

    
}