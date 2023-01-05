    export async function main() {
        const { drawDiagram } = require("./diagram1.js");
        const db = require('./dbcontroller.js');

        async function makeMainDiagram() {
          
          let labels = [];
          let data1Arr = [];
          let data2Arr = [];

          let dbdata = await db.DBController.getData('select * from (SELECT top 10 RecordDate, sum(ActualPrice) as Income, count(id) as ClientsNumber from log group by RecordDate order by RecordDate desc) as ft order by RecordDate');

          for (let i = 0; i < dbdata.length; i++) {
            let date = new Date(dbdata[i]['RecordDate']);
            let datestring = `${date.getDate()}.${date.getMonth()+1}`;
            labels.push(datestring);
            data2Arr.push(dbdata[i]['Income']);
            data1Arr.push(dbdata[i]['ClientsNumber']);
          }

          let arr = drawDiagram('mainChart', 'Співвідношення доходів до кількості клієнтів', 'Кількість клієнтів', data1Arr, 'Дохід', data2Arr, labels);

          let myChart = new Chart(arr[0], arr[1]);
        }

        makeMainDiagram();
    }