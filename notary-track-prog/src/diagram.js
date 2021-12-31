export function drawDiagram() {
    let gradient;

    function getGradient(ctx, chartArea, color0, color1) {
      gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
      gradient.addColorStop(0, color0);
      gradient.addColorStop(1, color1);
    
      return gradient;
    }

    const ctx = document.getElementById('myChart').getContext('2d');

    const labels = ['01.12', '02.12', '03.12', '04.12', '05.12', '06.12', '07.12', '08.12', '09.12', '10.12'];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Прибыль',
          data: [500, 2000, 700, 1300, 400, 1000, 1500, 1700, 2200, 1400],
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
          label: 'Количество клиентов',
          data: [1, 2, 4, 2, 2, 5, 6, 7, 3, 5],
          borderColor: function(context) {
            console.log(context);
            const chart2 = context.chart;
            console.log(chart2);
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