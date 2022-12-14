class NotesClient {
  loadNotes(callback, errorCallback) {
    fetch("http://localhost:3000/notes")
      .then((response) => response.json())
      .then((data) => {
        callback(data);
      })
      .catch(() => {
        errorCallback();
      });
  }

  createNote(note, errorCallback) {
    const data = { content: note };
    fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch(() => {
        errorCallback();
      });
  }

  resetNotes() {
    fetch("http://localhost:3000/notes", {
      method: "DELETE",
    }).then((response) => {
      return response.json();
    });
  }

  emojify(text, callback) {
    fetch("https://makers-emojify.herokuapp.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    })
      .then((response) => response.json())
      .then((data) => {
        callback(data.emojified_text);
      });
  }
}

module.exports = NotesClient;
