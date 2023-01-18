const { Console, time, timeStamp } = require("console");
const { resolve } = require("dns");
const fs = require("fs");

const config = {
  createFile: function (filename) {
    return new Promise((resolve) => {
      fs.open(filename, "w", (err) => {
        if (err) throw err;
        //console.log('File created');
        resolve(true);
      });
    });
  },
  isFileExisting: function (filename) {
    let ans = fs.existsSync(filename);
    return new Promise((resolve) => {
      fs.exists(filename, (exists) => {
        resolve(exists);
      })
    });
    
  },
  read: async function (filename) {
    let fileExisting = await config.isFileExisting(filename);
    if (fileExisting) {
      let fileData = new Promise((resolve) => {
        fs.readFile(filename,(err, data) => {
          if (err) throw err
          data = data.toString();
          if (data.length === 0) {
            resolve({});
          }
          let obj = {};
          for (let row of data.split("\n")) {
            let arr = row.split(";");
            obj[arr[0]] = arr[1];
          }
          resolve(obj);
        });
      });

      return fileData;
    } else {
      //console.log(filename);
      //console.log(config.isFileExisting(filename));
      await config.createFile(filename);
      return {};
    }
  },
  write: async function (filename, obj) {
    //try {
      let object = await config.read(filename);
      for (let key in obj) {
        object[key] = obj[key];
      }

      let string = "";
      for (let key in object) {
        let substr = `${key};${object[key]}\n`;
        string += substr;
      }

      string = string.slice(0, -1);
      //console.log(string);

      let fileWriten = await new Promise((resolve) => {
        fs.writeFile(filename, string, (err) => {
          if (err) throw err;
          resolve(true);
        });
      });
      //console.log("wwww" + fileWriten)
      return fileWriten;
    //} catch (err) {
    //  console.error(err);
    //  return false;
    //}
  },
  delete: async function (filename) {
    try {
      let fileRemoved = await new Promise((resolve) => {
        fs.rm(filename, () => {
          resolve(true);
        });
      });
      return fileRemoved;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
};

module.exports = { config };
