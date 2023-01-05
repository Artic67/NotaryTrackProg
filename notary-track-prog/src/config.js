import { AsyncLocalStorage } from 'async_hooks';

const fs = require('fs');



export const config = {
    createFile: function (filename) {
        fs.open(filename, 'w', (err) => {
            if(err) console.error(err);
            console.log('File created');
        });
    },
    isFileExisting: function (filename) {
        let ans = fs.existsSync(filename);
        return ans;
    },
    read: function () {
        let filename = './src/config.csv';
        if (config.isFileExisting(filename)) {
            let data = fs.readFileSync('./src/config.csv', 'utf8');
            let obj = {};
            for (let row of data.split('\n')) {
                let arr = row.split(';');
                obj[arr[0]] = arr[1];
            }
            return obj;
        } else {
            console.log(filename);
            console.log(config.isFileExisting(filename));
            //config.createFile(filename);
            return {};
        }
        
    },
    write: function (obj) {
        let object = config.read();
        for (let key in obj) {
            object[key] = obj[key];
        }

        let string = '';
        for (let key in object) {
            let substr = `${key};${object[key]}\n`;
            string += substr;
        }

        string = string.slice(0, -1);
        console.log(string);
        
        fs.writeFileSync('./src/config.csv', string);
    }
}
