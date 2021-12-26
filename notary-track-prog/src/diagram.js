export function drawDiagram() {
    const ctx = document.getElementById('myChart').getContext('2d');

    const labels = ['01.12', '02.12', '03.12', '04.12', '05.12', '06.12', '07.12', '08.12', '09.12', '10.12'];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Прибыль',
          data: [500, 2000, 700, 1300, 400, 1000, 1500, 1700, 2200, 1400],
          borderColor: [
            'rgba(255, 99, 132, 1)'
        ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
        ],
          yAxisID: 'y',
        },
        {
          label: 'Количество клиентов',
          data: [1, 2, 4, 2, 2, 5, 6, 7, 3, 5],
          borderColor: [
            'rgba(54, 162, 235, 1)',
        ],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
        ],
          yAxisID: 'y1',
        }
      ]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          stacked: false,
          plugins: {
            title: {
              display: true,
              text: 'Прибыль к количеству клиентов'
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

    const myChart = new Chart(ctx, config);
}