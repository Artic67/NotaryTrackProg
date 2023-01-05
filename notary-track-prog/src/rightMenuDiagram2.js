export async function main(name) {
  const { drawDiagram } = require("./diagram2.js");
  const db = require('./dbcontroller.js');

  async function makeMainDiagram() {

    let labels = [];
    let data1Arr = [];

    let dbdata = await db.DBController.getData(`SELECT Services.Id as ServiceId, SubCategories.Id as SubcatId, Categories.Id as CatId, ft.Num as Num, Categories.Name as CatName, ft.PriceSum as PriceSum
    FROM Services, SubCategories, Categories, (SELECT Log.ServiceId as ServiceId,
    count(Log.ServiceId)  as Num, sum(Log.ActualPrice) as PriceSum
    from
    Log
    where
    Log.RecordDate Between Date( ) And DateAdd("M", -1, Date( ))
    group by Log.ServiceId) as ft
    WHERE Services.SubCategoryId = SubCategories.Id
    and
       SubCategories.CategoryId = Categories.Id
    and ft.ServiceId = Services.Id`);

    console.log(dbdata);
    
    const sumData = sumDataMemorize(dbdata);
    const findLabel = findLabelMemorize(dbdata);

    let catNums = [];

    for (let el of dbdata) {
      if (!catNums.includes(el['CatId'])) catNums.push(el['CatId']);
    }

    for (let num of catNums) {
      data1Arr.push(sumData('CatId', num));
      labels.push(checkLength(findLabel(num)));
    }


    /* for (let i = 0; i < dbdata.length; i++) {
       let date = new Date(dbdata[i]['RecordDate']);
       let datestring = `${date.getDate()}.${date.getMonth()+1}`;
       labels.push(datestring);
       data2Arr.push(dbdata[i]['Income']);
       data1Arr.push(dbdata[i]['ClientsNumber']);
     }*/

    let arr = drawDiagram(name, 'Дохід за категоріями', 'Кількість клієнтів', data1Arr, labels);

    let myChart = new Chart(arr[0], arr[1]);
  }

  makeMainDiagram();

  function sumDataMemorize(arr) {
    let array = arr;
    return function (idName, id) {
      let count = 0;
      for (let obj of array) {
        if (obj[idName] === id) {
          count += obj.PriceSum;
        }
      }
      if (count > 0) return count.toString();
      return '-';
    }
  }
  
  function findLabelMemorize(arr) {
    let array = arr;
    return function (id) {
      for (let obj of array) {
        if (obj['CatId'] === id) {
          return obj['CatName'];
        }
      }
    }
  }

  function checkLength(string) {
    if (string.length > 36) return string.slice(0, 32) + "... ";
    return string;
  }
}

