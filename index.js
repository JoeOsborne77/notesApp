const NotesModel = require("./NotesModel.js");
const NotesView = require("./NotesView.js");
const NotesClient = require("./NotesClient.js");

const client = new NotesClient();
const model = new NotesModel();
const view = new NotesView(model, client);

console.log("index.js is working, notes app is running");
view.displayNotesFromApi();
client.loadNotes(
  (notes) => {
    // This will be executed if notes are loaded correctly from the server
    model.setNotes(notes);
    view.displayNotes();
  },
  () => {
    // This will be executed if there's an error
    view.displayError();
  }
);
