renderNotes();
let addNoteButton = document.querySelector('#add-note-button');
let deleteNoteButtons = document.querySelectorAll('.delete-note');

let editNoteButton = document.querySelector('#edit-note-button');

addNoteButton.addEventListener('click', function() {

    let titleElm = document.querySelector('#note-title');
    let title = titleElm.value;
    

    let bodyElm = document.querySelector('#note-body');
    let body = bodyElm.value;

    if(!(title || body)) {
        $('.collapse').collapse('hide');
        return;
    }

    if(title == false && body == false){
        bodyElm.value='';
        titleElm.value='';
        $('.collapse').collapse('hide');
        return;
    }

    let date = new Date();
    let id = generateId();
    let note = {
        id,title, body , date
    };

    titleElm.value = '';
    bodyElm.value = '';

    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.push(note);
    // notes = {notes};


    localStorage.setItem('notes', JSON.stringify(notes));
    $('.collapse').collapse('hide');

    renderNotes();


    
});

editNoteButton.addEventListener('click', function(e){
    let editNoteTitleElm = document.querySelector('#edit-note-title');
    let editNoteBodyElm = document.querySelector('#edit-note-body');
    let noteId = e.target.getAttribute('data-id');
    let notes  =  getNotes();
    let newNoteTitle = editNoteTitleElm.value;
    let newNoteBody = editNoteBodyElm.value;

    if(!(newNoteTitle || newNoteBody)){

        showEditErrorMessage('<i class="fa fa-exclamation-triangle"></i> You need to alteast have a title or body');
        return;
    }

    if(newNoteBody == false && newNoteTitle == false){
        showEditErrorMessage('<i class="fa fa-exclamation-triangle"></i> You need to alteast have a title or body');
        return;
    }


    let editedNote = notes.find(elm => elm.id == noteId);
    editedNote.title = newNoteTitle;
    editedNote.body = newNoteBody;

    let indexOfObject = notes.findIndex(function(item){
        return item.id == noteId;
    })

    notes[indexOfObject] = editedNote;

    localStorage.setItem('notes', JSON.stringify(notes));
    clearEditErrorMessage();
    $('#edit-note-modal').modal('hide');
    renderNotes();

    
});

function deleteNote(btn)
{
    if(!confirm("Are you sure want to delete this note")){
        return;
    }
    let CONFIRM_TEXT = "CONFIRM";
    let confirmation = prompt("Type CONFIRM to delete this");
    if(CONFIRM_TEXT != confirmation) return;

    let card = btn.closest('.card');
        let noteId = card.getAttribute('data-id');
       
        let notes = getNotes();

        notes = notes.filter(function(note){
            return note.id !==  noteId;
        });
        

        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
}




function renderNotes()
{
    let noteListContainer = document.querySelector('#note-list');

    noteListContainer.innerHTML = '';

    let notes  = JSON.parse(localStorage.getItem('notes'));

    if(!notes || notes.length ==0)
    {
        noteListContainer.innerHTML = '<i class="fa fa-exclamation-triangle"></i> No Notes Available';
        return;
    }
    
    notes.forEach(function(note){
        let li = document.createElement('li');
        card = createBootstrapCard();

        card.setAttribute('data-id', note.id);

        card.querySelector('.card-header').innerHTML += note.title + `                           <small class="text-muted timeago" style="float:right" title="${note.date}">${timeDifference(new Date(note.date))}</small>`;
        card.querySelector('.card-text').innerHTML = note.body;
        li.appendChild(card);

        noteListContainer.appendChild(li);
    });




    function createBootstrapCard()
    {
        let card = document.createElement('div');
        card.classList.add('card');

        let cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');

            // delete button
        let cardDeleteButton = document.createElement('button');
        cardDeleteButton.classList.add('btn');
        cardDeleteButton.classList.add('btn-danger');
        cardDeleteButton.classList.add('btn-sm');
        cardDeleteButton.classList.add('note-action-btn');
        cardDeleteButton.classList.add('delete-note');
        cardDeleteButton.classList.add('pull-right');
        cardDeleteButton.innerHTML = `<i class='fa fa-trash'></i>`;
        cardDeleteButton.setAttribute('onclick', 'deleteNote(this)');

        cardHeader.appendChild(cardDeleteButton);

        // edit button
        let cardEditButton = document.createElement('button');
    
        cardEditButton.classList.add('btn');
        cardEditButton.classList.add('btn-primary');
        cardEditButton.classList.add('btn-sm');
        cardEditButton.classList.add('note-action-btn');


        cardEditButton.classList.add('edit-note');
        cardEditButton.classList.add('pull-right');

        cardEditButton.innerHTML = `<i class='fa fa-edit'></i>`;
        cardEditButton.setAttribute('data-toggle','modal');
        cardEditButton.setAttribute('data-target','#edit-note-modal');

        cardHeader.appendChild(cardEditButton);

        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        let cardText = document.createElement('p');
        cardText.classList.add('card-text');

        cardBody.appendChild(cardText);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);

        return card;

    } 

}




function timeDifference(previous) {

    current = new Date();
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}



function generateId(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function getNotes()
{
    return JSON.parse(localStorage.getItem('notes'));
}

function getNote(noteId)
{
    let notes  = getNotes();
    return notes.find((item) => item.id == noteId );
}


$('#edit-note-modal').on('show.bs.modal', function (e) {
  let button = e.relatedTarget;

  card = button.closest('.card');
  let modal = $(this);
  let noteId = card.getAttribute('data-id');
  
  let note = getNote(noteId);
  let noteTitle = note.title;
  let noteBody = note.body;
  
  modal.find('.modal-body #edit-note-title').val(noteTitle);

  modal.find('.modal-body #edit-note-body').val(noteBody);
  modal.find('.modal-footer #edit-note-button').attr('data-id', noteId);


  
  });

  $('#edit-note-modal').on('hide.bs.modal', function (e) {

    clearEditErrorMessage();
  
  
    
    });


  function showEditErrorMessage(message){
      document.querySelector("#error-message").innerHTML = message;
  }

  function clearEditErrorMessage(){
      document.querySelector("#error-message").innerHTML = '';
  }




  setInterval(function(){
    let timeago = document.querySelectorAll('.timeago');
    timeago.forEach((timeagoElm)=>{
        timeagoElm.innerHTML = timeDifference(new Date(timeagoElm.getAttribute("title")));
    })
  },10000);