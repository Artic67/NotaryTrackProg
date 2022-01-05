export async function drawDiagram() {

    const db = require('./dbcontroller.js');
    let gradient;

    //db.DBController.getData()

    let labels = [];
    let data1 = [];
    let data2 = [];

    let dbdata = await db.DBController.getData('select * from (SELECT top 10 RecordDate, sum(ActualPrice) as Income, count(id) as ClientsNumber from log group by RecordDate order by RecordDate desc) as ft order by RecordDate');
    
    for (let i = 0; i < dbdata.length; i++) {
      let date = new Date(dbdata[i]['RecordDate']);
      let datestring = `${date.getDate()}.${date.getMonth()+1}`;
      labels.push(datestring);
      data2.push(dbdata[i]['Income']);
      data1.push(dbdata[i]['ClientsNumber']);
    }
    
    function getGradient(ctx, chartArea, color0, color1) {
      gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
      gradient.addColorStop(0, color0);
      gradient.addColorStop(1, color1);
    
      return gradient;
    }

    let chartvar = document.getElementById('myChart');

    if(chartvar) {
      const ctx = chartvar.getContext('2d');

    
      const data = {
        labels: labels,
        datasets: [
          {
            label: 'Количество клиентов',
            data: data1,
            borderColor: function(context) {
              const chart = context.chart;
              const {ctx, chartArea} = chart;
  
              if (!chartArea) {
                // This case happens on initial chart load
                return;
              }
              return getGradient(ctx, chartArea, '#6F04D9', '#05C7F2');
            },
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)'
            ],
            cubicInterpolationMode: 'monotone',
            tension: 0.4,
            yAxisID: 'y',
          },
          {
            label: 'Прибыль',
            data: data2,
            borderColor: function(context) {
              const chart2 = context.chart;
              const {ctx, chartArea} = chart2;
  
              if (!chartArea) {
                // This case happens on initial chart load
                return;
              }
              return getGradient(ctx, chartArea, '#FF0000', '#FFAE00');
            },
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)'
            ],
            cubicInterpolationMode: 'monotone',
            tension: 0.4,
            yAxisID: 'y1',
          }
        ]
      };
  
      const config = {
          type: 'line',
          data: data,
          options: {
            animations: {
              radius: {
                duration: 400,
                easing: 'linear',
                loop: (context) => context.active
              }
            },
            responsive: true,
            interaction: {
              mode: 'index',
              intersect: false,
            },
            stacked: false,
            plugins: {
              title: {
                font: {
                  size: 21
                },
                weight: 800,
                display: true,
                text: 'Соотношение прибыли к количеству клиентов'
              }
            },
            scales: {
              y: {
                type: 'linear',
                display: true,
                position: 'left',
              },
              y1: {
                type: 'linear',
                display: true,
                position: 'right',
        
                // grid line settings
                grid: {
                  drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
              },
            }
          },
        };
  
      Chart.defaults.font.family = 'Raleway';
      Chart.defaults.color = '#FFFFFF';
      Chart.defaults.font.weight = 700;
      const myChart = new Chart(ctx, config);
    }
}