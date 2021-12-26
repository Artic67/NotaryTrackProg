var adodb = require('database-js-adodb');

(async () => {
    let connection, rows;
    connection = adodb.open({
        Database: './db.mdb'
    });
    
    try {
        rows = await connection.query("SELECT * FROM Штами");
        console.log(rows);
    } catch (error) {
        console.log(error);
    } finally {
        await connection.close();
    }
})();