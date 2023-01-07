const fs = require('fs');


const config = {
    createFile: function (filename) {
        return new Promise(resolve => {
            fs.open(filename, 'w', (err) => {
                if(err) console.error(err);
                //console.log('File created');
                resolve(true);
            });
        });
    },
    isFileExisting: function (filename) {
        let ans = fs.existsSync(filename);
        return ans;
    },
    read: function (filename) {
        if (config.isFileExisting(filename)) {
            let data = fs.readFileSync(filename, 'utf8');
            if (data.length === 0) {
                return {};
            }
            let obj = {};
            for (let row of data.split('\n')) {
                let arr = row.split(';');
                obj[arr[0]] = arr[1];
            }
            return obj;
        } else {
            //console.log(filename);
            //console.log(config.isFileExisting(filename));
            config.createFile(filename);
            return {};
        }
        
    },
    write: function (filename, obj) {
        try {
            let object = config.read(filename);
            for (let key in obj) {
                object[key] = obj[key];
            }

            let string = '';
            for (let key in object) {
                let substr = `${key};${object[key]}\n`;
                string += substr;
            }

            string = string.slice(0, -1);
            //console.log(string);
            
            fs.writeFileSync(filename, string);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
        
    },
    delete: function (filename) {
        try {
            fs.rmSync(filename);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
        
    }
}

module.exports = { config };