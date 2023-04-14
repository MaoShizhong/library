const newBookOverlay = document.querySelector('#add-book');
const overlayBackdrop = document.querySelector('#backdrop');
const overlayForm = document.querySelector('#new-book');
const form = document.querySelector('form');
const library = document.querySelector('#library');

// live HTMLCollections
const deletes = document.getElementsByClassName('delete');
const bookCards = document.getElementsByClassName('card');

newBookOverlay.addEventListener('click', showOverlay);
overlayBackdrop.addEventListener('mousedown', hideOverlay);
form.addEventListener('submit', addBookToLibrary);

for (let i = 0; i < deletes.length; i++) {
    deletes[i].addEventListener('click', deleteBook.bind(null, i));
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const myLibrary = [];

function addBookToLibrary(event) {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read-status').checked;

    myLibrary.push(new Book(title, author, pages, read));
    checkLibrarySize();
    createCardFragment(myLibrary[myLibrary.length - 1]);

    // simply while form submission deactivated due to no backend
    overlayBackdrop.classList.add('hidden');
    form.reset();
    event.preventDefault();
}

function createCardFragment(book) {
    const card = document.createDocumentFragment();
    const divCard = document.createElement('div');
    divCard.classList.add('card');
    divCard.setAttribute('data-index', `${myLibrary.indexOf(book)}`);
        const bookDet = document.createElement('div');
        bookDet.classList.add('book-details');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = `X`;
            deleteButton.addEventListener('click', deleteBook.bind(null, book));
            const bookTitle = document.createElement('h4');
            bookTitle.textContent = `${book.title}`;
            const bookAuthor = document.createElement('p');
            bookAuthor.textContent = `${book.author}`;
            const bookPages = document.createElement('p');
            bookPages.textContent = `${book.pages}`;
        const bookBot = document.createElement('div');
        bookBot.classList.add('book-bottom');
            const bookRead = document.createElement('p');
            bookRead.innerHTML = `${book.read ? 'Read' : '<i>Not Read</i>'}`;
            const edit = document.createElement('button');
            edit.textContent = 'Edit';

    card.appendChild(divCard);
        divCard.appendChild(bookDet);
            bookDet.appendChild(deleteButton);
            bookDet.appendChild(bookTitle);
            bookDet.appendChild(bookAuthor);
            bookDet.appendChild(bookPages);
        divCard.appendChild(bookBot);
            bookBot.appendChild(bookRead);
            bookBot.appendChild(edit);

    appendFragment(card);
}

function appendFragment(fragment) {
    library.appendChild(fragment);
    updateStats();
}

function deleteBook(book) {
    const i = myLibrary.indexOf(book);
    myLibrary.splice(i, 1);
    bookCards[i].replaceChildren();
    bookCards[i].remove();
    updateDataIndexes(i);
}

function updateDataIndexes(i) {
    for (let card of bookCards) {
        if (Number(card.dataset.index) > i) card.dataset.index = Number(card.dataset.index) - 1;
    }
}

function checkLibrarySize() {
    const emptyLib = document.querySelector('#empty-library');
    if (myLibrary.length === 0) emptyLib.classList.remove('hidden');
    else emptyLib.classList.add('hidden');
}

function updateStats() {
    const totalBooks = document.querySelector('#total');
    totalBooks.textContent = `${myLibrary.length}`;
    const readBooks = document.querySelector('#read');
    readBooks.textContent = `${myLibrary.filter(book => book.read).length}`;
    const unreadBooks = document.querySelector('#unread');
    unreadBooks.textContent = `${myLibrary.filter(book => !book.read).length}`;
}

function showOverlay() {
    overlayBackdrop.classList.remove('hidden');
}

function hideOverlay(e) {
    if (e.target === this) {
        overlayBackdrop.classList.add('hidden');
        form.reset();
    }
}