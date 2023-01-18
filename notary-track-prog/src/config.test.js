const { config } = require("./config");

describe("Config Tests:", () => {
  test("Create File", async () => {
    expect(await config.createFile("./src/test.csv")).toEqual(true);
  });

  test("Check file existing test", () => {
    expect(config.isFileExisting("./src/test.csv")).toEqual(true);
  });

  test("Write file test", () => {
    expect(config.write("./src/test.csv", { a: "1", b: "2" })).toEqual(true);
  });

  test("Read file test", () => {
    expect(config.read("./src/test.csv")).toEqual({ a: "1", b: "2" });
  });

  test("Delete file test", () => {
    expect(config.delete("./src/test.csv")).toEqual(true);
  });
});
