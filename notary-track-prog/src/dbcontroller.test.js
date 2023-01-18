const { DBController } = require("./dbcontroller");

describe("Data Base Controller Tests:", () => {
  test("Write test", async () => {
    return expect(
      await DBController.writeData(
        `INSERT INTO Log (Id, ServiceId) VALUES ("1000", "12")`
      )
    ).toEqual([]);
  });

  test("Read test", async () => {
    return expect(
      await DBController.getData(
        `SELECT Id, ServiceId FROM Log WHERE Id = 1000`
      )
    ).toEqual([{ Id: 1000, ServiceId: 12 }]);
  });

  test("Delete test", async () => {
    return expect(
      await DBController.writeData(`DELETE FROM Log WHERE Id = 1000`)
    ).toEqual([]);
  });
});
