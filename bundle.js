(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // NotesModel.js
  var require_NotesModel = __commonJS({
    "NotesModel.js"(exports, module) {
      var NotesModel2 = class {
        constructor() {
          this.notes = [];
        }
        getNotes() {
          return this.notes;
        }
        addNote(note) {
          this.notes.push(note);
        }
        setNotes(notes) {
          notes.forEach((note) => this.addNote(note));
        }
        reset() {
          this.notes = [];
        }
      };
      module.exports = NotesModel2;
    }
  });

  // NotesView.js
  var require_NotesView = __commonJS({
    "NotesView.js"(exports, module) {
      var NotesView2 = class {
        constructor(model2, api) {
          this.model = model2;
          this.api = api;
          this.mainContainerEl = document.querySelector("#main-container");
          document.querySelector("#add-note-button").addEventListener("click", () => {
            const newNote = document.querySelector("#add-note-input").value;
            this.addNewNote(newNote);
          });
          this.clearNotesBtn = document.querySelector("#clear-note-button");
          this.clearNotesBtn.addEventListener("click", () => {
            this.clearNotes();
          });
          this.resetNotes();
        }
        displayNotesFromApi() {
          this.api.loadNotes(
            (repoData) => {
              this.model.setNotes(repoData);
              this.displayNotes();
            },
            () => {
              this.displayError();
            }
          );
        }
        addNewNote(newNote) {
          this.api.createNote(newNote);
          this.model.addNote(newNote);
          this.displayNotes();
        }
        displayNotes() {
          this.clearNotes();
          const notes = this.model.getNotes();
          notes.forEach((text) => {
            this.api.emojify(text, (callback) => {
              const noteEl = document.createElement("div");
              noteEl.textContent = callback;
              noteEl.className = "note";
              this.mainContainerEl.append(noteEl);
            });
          });
        }
        resetNotes() {
          this.api.resetNotes();
          this.displayNotesFromApi();
        }
        displayError() {
          let errorMessage = document.createElement("div");
          errorMessage.className = "error";
          errorMessage.textContent = "Oops, something went wrong!";
          this.mainContainerEl.append(errorMessage);
        }
        clearNotes() {
          const displayedNotes = document.querySelectorAll("div.note");
          displayedNotes.forEach((element) => {
            element.remove();
          });
        }
      };
      module.exports = NotesView2;
    }
  });

  // NotesClient.js
  var require_NotesClient = __commonJS({
    "NotesClient.js"(exports, module) {
      var NotesClient2 = class {
        loadNotes(callback, errorCallback) {
          fetch("http://localhost:3000/notes").then((response) => response.json()).then((data) => {
            callback(data);
          }).catch(() => {
            errorCallback();
          });
        }
        createNote(note, errorCallback) {
          const data = { content: note };
          fetch("http://localhost:3000/notes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }).then((response) => {
            response.json();
          }).then((data2) => {
            console.log("Success:", data2);
          }).catch(() => {
            errorCallback();
          });
        }
        resetNotes() {
          fetch("http://localhost:3000/notes", {
            method: "DELETE"
          }).then((response) => {
            return response.json();
          });
        }
        emojify(text, callback) {
          fetch("https://makers-emojify.herokuapp.com/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ text })
          }).then((response) => response.json()).then((data) => {
            callback(data.emojified_text);
          });
        }
      };
      module.exports = NotesClient2;
    }
  });

  // index.js
  var NotesModel = require_NotesModel();
  var NotesView = require_NotesView();
  var NotesClient = require_NotesClient();
  var client = new NotesClient();
  var model = new NotesModel();
  var view = new NotesView(model, client);
  console.log("index.js is working, notes app is running");
  view.displayNotesFromApi();
  client.loadNotes(
    (notes) => {
      model.setNotes(notes);
      view.displayNotes();
    },
    () => {
      view.displayError();
    }
  );
})();
