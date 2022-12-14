const NotesModel = require("./NotesModel.js");

describe("NotesModel", () => {
  it("returns empty array", () => {
    const model = new NotesModel();
    expect(model.getNotes()).toEqual([]);
  });

  it("returns not empty array", () => {
    const model = new NotesModel();
    model.addNote("Buy milk");
    model.addNote("Go to the gym");
    expect(model.getNotes()).toEqual(["Buy milk", "Go to the gym"]);
  });

  it("returns empty array after reset", () => {
    const model = new NotesModel();
    model.addNote("Buy milk");
    model.addNote("Go to the gym");
    model.reset();
    expect(model.getNotes()).toEqual([]);
  });
});
