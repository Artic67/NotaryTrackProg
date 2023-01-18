const { config } = require("./config");

describe("Config Tests:", () => {
  test("Create File", async () => {
    expect(await config.createFile("./src/test.csv")).toEqual(true);
  });

  test("Check file existing test", async () => {
    expect(await config.isFileExisting("./src/test.csv")).toEqual(true);
  });

  test("Write file test", async () => {
    expect(await config.write("./src/test.csv", { a: "1", b: "2" })).toEqual(true);
  });

  test("Read file test", async () => {
    expect(await config.read("./src/test.csv")).toEqual({ a: "1", b: "2" });
  });

  test("Delete file test", async () => {
    expect(await config.delete("./src/test.csv")).toEqual(true);
  });
});
