export const ADODB = require('node-adodb');
let filesource = "./src/Access.accdb";
export const connection = ADODB.open(`Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${filesource};Persist Security Info=False;`);

 
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
       
          return await users;
        } catch (error) {
          console.log(JSON.stringify(error, null, 2));
          return false;
        }
    }
}