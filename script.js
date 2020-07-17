let addNoteButton = document.querySelector('#add-note-button');

addNoteButton.addEventListener('click', function() {

    let titleElm = document.querySelector('#note-title');
    let title = titleElm.value;

    let bodyElm = document.querySelector('#note-body');
    let body = bodyElm.value;

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

    renderNotes();


    
});

renderNotes();
function renderNotes()
{
    let noteListContainer = document.querySelector('#note-list');

    noteListContainer.innerHTML = '';

    let notes  = JSON.parse(localStorage.getItem('notes'));

    if(!notes)
    {
        noteListContainer.innerHTML = 'No Notes Available';
        return;
    }
    
    notes.forEach(function(note){
        let li = document.createElement('li');
        card = createBootstrapCard();

        card.setAttribute('data-id', note.id);

        card.querySelector('.card-header').innerHTML += note.title;
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

        let cardDeleteButton = document.createElement('button');
        cardDeleteButton.classList.add('btn');
        cardDeleteButton.classList.add('btn-danger');
        cardDeleteButton.classList.add('delete-note');
        cardDeleteButton.classList.add('pull-right');
        cardDeleteButton.innerHTML = `<i class='fa fa-trash'></i>`;

        cardHeader.appendChild(cardDeleteButton);

        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        let cardText = document.createElement('p');
        cardText.classList.add('card-text');

        cardBody.appendChild(cardText);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);

        return card;


//         <div class="card">
//   <div class="card-header">
//     Featured
//   </div>
//   <div class="card-body">
//     <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
//   </div>
// </div>
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