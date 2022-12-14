const NotesClient = require("./NotesClient");
require("jest-fetch-mock").enableMocks();

describe("Client class", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it("calls fetch and loads data", (done) => {
    const client = new NotesClient();
    fetch.mockResponseOnce(
      JSON.stringify({
        name: ["This note is coming from the server"],
      })
    );
    client.loadNotes((callback) => {
      expect(callback.name).toEqual(["This note is coming from the server"]);
      done();
    });
  });

  it("posts data to server", () => {
    const api = new NotesClient();
    api.createNote("This is a new note");
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: '{"content":"This is a new note"}',
    });
  });
});
