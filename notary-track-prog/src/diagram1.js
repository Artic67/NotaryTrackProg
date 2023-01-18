export function drawDiagram(
  chartId,
  header,
  label1,
  data1Arr,
  label2,
  data2Arr,
  labels
) {
  let gradient;

  function getGradient(ctx, chartArea, color0, color1) {
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, color0);
    gradient.addColorStop(1, color1);

    return gradient;
  }

  let chartvar = document.getElementById(chartId);

  if (chartvar) {
    let ctx = chartvar.getContext("2d");

    let data = {
      labels: labels,
      datasets: [
        {
          label: label1,
          data: data1Arr,
          borderColor: function (context) {
            let chart = context.chart;
            let { ctx, chartArea } = chart;

            if (!chartArea) {
              // This case happens on initial chart load
              return;
            }
            return getGradient(ctx, chartArea, "#6F04D9", "#05C7F2");
          },
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          cubicInterpolationMode: "monotone",
          tension: 0.4,
          yAxisID: "y",
        },
        {
          label: label2,
          data: data2Arr,
          borderColor: function (context) {
            let chart2 = context.chart;
            let { ctx, chartArea } = chart2;

            if (!chartArea) {
              // This case happens on initial chart load
              return;
            }
            return getGradient(ctx, chartArea, "#FF0000", "#FFAE00");
          },
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          cubicInterpolationMode: "monotone",
          tension: 0.4,
          yAxisID: "y1",
        },
      ],
    };

    let config = {
      type: "line",
      data: data,
      options: {
        animations: {
          radius: {
            duration: 400,
            easing: "linear",
            loop: (context) => context.active,
          },
        },
        responsive: true,
        interaction: {
          mode: "index",
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            font: {
              size: 21,
            },
            weight: 800,
            display: true,
            text: header,
          },
        },
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",

            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        },
      },
    };

    Chart.defaults.font.family = "Raleway";
    Chart.defaults.color = "#FFFFFF";
    Chart.defaults.font.weight = 700;

    let arr = [ctx, config];
    return arr;
    //let myChart = new Chart(chartvar, config);
  } else {
    return [];
  }
}
