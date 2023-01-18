const ADODB = require("node-adodb");
const filesource = "./src/Access.accdb";
const connection = ADODB.open(
  `Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${filesource};Persist Security Info=False;`
);

const DBController = {
  async getData(query) {
    try {
      const users = await connection.query(query);

      return await users;

      //console.log(JSON.stringify(users, null, 2));
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  },
  async writeData(query) {
    try {
      const users = await connection.execute(query);

      return await users;
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      return false;
    }
  },
};

module.exports = { DBController, ADODB, connection };
