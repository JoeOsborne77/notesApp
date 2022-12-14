/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const NotesView = require("./NotesView.js");
const NotesModel = require("./notesmodel.js");

describe("NotesView", () => {
  // it("adds a new note", () => {
  //   let receivedNoteData;
  //   const mockApi = {
  //     createNote: (newNote) => {
  //       receivedNoteData = newNote;
  //     },
  //   };
  //   const view = new NotesView(model, mockApi);
  //   view.addNewNote("This is a note");
  //   expect(receivedNoteData).toEqual("This is a note");
  // });

  // both do the same thing (test above and below) - jest.fn is very useful tool

  it("adds a new note", () => {
    document.body.innerHTML = fs.readFileSync("./index.html");
    const model = new NotesModel();
    const mockApi = { createNote: jest.fn() };
    const view = new NotesView(model, mockApi);
    view.addNewNote("This is a note");
    expect(mockApi.createNote).toHaveBeenCalledWith("This is a note");
  });

  it("returns notes", () => {
    document.body.innerHTML = fs.readFileSync("./index.html");
    const model = new NotesModel();
    const mockApi = { createNote: jest.fn() };
    const view = new NotesView(model, mockApi);
    model.addNote("go to the gym");
    view.displayNotes();
    expect(document.querySelectorAll("div.note").length).toEqual(1);
  });

  it("adds a new note", () => {
    document.body.innerHTML = fs.readFileSync("./index.html");
    const model = new NotesModel();
    const mockApi = { createNote: jest.fn() };
    const view = new NotesView(model, mockApi);
    const input = document.querySelector("#add-note-input");
    input.value = "My new amazing test note";
    const button = document.querySelector("#add-note-button");
    button.click();
    expect(document.querySelectorAll("div.note").length).toEqual(1);
    expect(document.querySelectorAll("div.note")[0].textContent).toEqual(
      "My new amazing test note"
    );
  });

  it("adds multiple notes new note", () => {
    document.body.innerHTML = fs.readFileSync("./index.html");
    const model = new NotesModel();
    const mockApi = { createNote: jest.fn() };
    const view = new NotesView(model, mockApi);
    const input = document.querySelector("#add-note-input");
    input.value = "My new amazing test note";
    const button = document.querySelector("#add-note-button");
    button.click();
    const input2 = document.querySelector("#add-note-input");
    input2.value = "Foobar";
    button.click();
    expect(document.querySelectorAll("div.note").length).toEqual(2);
    expect(document.querySelectorAll("div.note")[0].textContent).toEqual(
      "My new amazing test note"
    );
  });
});
