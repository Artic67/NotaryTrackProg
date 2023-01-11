export function drawDiagram(chartId, header, label1, data1Arr, labels) {

  const CHART_COLORS = {
    red: 'rgb(242, 27, 84)',
    yellow: 'rgb(242, 203, 5)',
    green: 'rgb(9, 166, 3)',
    blue: 'rgb(4, 135, 217)',
    lightblue: 'rgb(4, 157, 217)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };

  let chartvar = document.getElementById(chartId);

  if (chartvar) {
    let ctx = chartvar.getContext('2d');

    const data = {
      labels: labels,
      datasets: [
        {
          label: label1,
          data: data1Arr,
          backgroundColor: Object.values(CHART_COLORS)
        },
      ]
    };

    const config = {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: header
          }
        }
      },
    };

    const config2 = {
      type: 'bar',
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
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: header
          }
        }
      }
    };

    Chart.defaults.font.family = 'Raleway';
    Chart.defaults.color = '#FFFFFF';
    Chart.defaults.font.weight = 700;
    Chart.defaults.elements.arc.borderWidth = 0;
    console.log(Chart.defaults.elements.arc);

    let arr = [ctx, config];
    return arr;
    //let myChart = new Chart(chartvar, config);
  } else {
    return [];
  }
}