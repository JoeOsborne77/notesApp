class NotesView {
  constructor(model, api) {
    this.model = model;
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
    // this.api.createNote(
    //   (newNote) => {
    //     this.model.addNote(newNote);
    //     this.displayNotes();
    //   },
    //   () => {
    //     this.displayError();
    //   }
    // );
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
}

//On the notes app web page, open the developer console and use fetch to make a
//call to http://localhost:3000/notes and console.log the result data. You can use the previous section's
//fetch example (the one using Github's API) as a scaffolding for this new code.
module.exports = NotesView;

// have a constructor
// the model should be dependency-injected into it.
// have a method displayNotes which will:
// get the list of notes from the model.
// for each note, create a new div element on the page (with an HTML class "note").
// You'll have to research how an HTML class can be set to an element in JavaScript.

// Troubleshooting common problems
// If, when running the test, you're getting an error such as document
//  is not defined or Cannot read property 'append' of null — make sure you've setup your test
//  like in the template.
// If the number of elements returned by document.querySelectorAll is still zero after
// implementing the new method — did you make sure to set the HTML class note on the new elements?
