const ADODB = require('node-adodb');
const connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=./src/Access.accdb;Persist Security Info=False;');


 
let BDController = {
    GetData: async function() {
        try {
          let users = await connection.query('SELECT ft.Num AS Id, ft.Name AS Name, ft.SubCatName AS SubCatName, c.Name AS CatName FROM (SELECT s.Id as Num, s.Name as Name , su.Name as SubCatName, su.CategoryId as CatId FROM Services as s LEFT JOIN SubCategories as su ON s.SubCategoryId = su.Id)  AS ft LEFT JOIN Categories AS c ON ft.CatId = c.Id;');
       
          console.log(JSON.stringify(users, null, 2));
        } catch (error) {
          console.log(error);
        }
    },
    WriteData: async function() {
        try {
          let users = await connection.execute('INSERT INTO Країни(Код, Країна, Континент, Середній_вік, Кількість_населення) VALUES ("NEW", "Newton", "Newtoria", 18, 18)');
       
          console.log(JSON.stringify(users, null, 2));
        } catch (error) {
          console.log(error);
        }
    }
}

// get the client
/*const mysql = require('mysql2');

let Controller = {
    createQuery: function createQuery(query, asArray=false) {
        const connection = mysql.createConnection({
            host: 'sql11.freesqldatabase.com',
            user: 'sql11461053',
            database: 'sql11461053',
            password: 'RZzDUA4MhS',
            rowsAsArray: asArray
          });

        return connection.promise()
        .query(query).then(connection.end());
        .then(( [rows, fields]) => {
            console.log(rows);
            window.DB = rows;
        })
        .catch(console.log)
        .then(connection.end());
    }
}

let promise = Controller.createQuery('SELECT * FROM `q`', false);
console.log(promise);
promise.then( ([rows, fields]) => console.log(rows));*/
