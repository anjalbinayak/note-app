let addNoteButton = document.querySelector('#add-note-button');

addNoteButton.addEventListener('click', function() {
    let title = document.querySelector('#note-title').value;
    let body = document.querySelector('#note-body').value;

    let date = new Date();
    let note = {
        title, body , date
    };

    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.push(note);
    // notes = {notes};


    localStorage.setItem('notes', JSON.stringify(notes));


    
});