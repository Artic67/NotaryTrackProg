export const ADODB = require('node-adodb');
export const connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=./src/Access.accdb;Persist Security Info=False;');

 
export let DBController = {
    getData: async function(query) {
        try {
          let users = await connection.query(query);

          return await users;
       
          //console.log(JSON.stringify(users, null, 2));
        } catch (error) {
          console.log(error);
        }
    },
    writeData: async function(query) {
        try {
          let users = await connection.execute(query);
       
          console.log(JSON.stringify(users, null, 2));
        } catch (error) {
          console.log(JSON.stringify(error, null, 2));
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
