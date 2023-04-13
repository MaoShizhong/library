const newBookOverlay = document.querySelector('#add-book');
const overlayBackdrop = document.querySelector('#backdrop');
const overlayForm = document.querySelector('#new-book');
const form = document.querySelector('form');
const library = document.querySelector('#library');

newBookOverlay.addEventListener('click', showOverlay);
overlayBackdrop.addEventListener('mousedown', hideOverlay);
form.addEventListener('submit', addBookToLibrary);

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(e) {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read-status').value;
    myLibrary.push(new Book(title, author, pages, read));
    e.preventDefault();
}

function showOverlay() {
    overlayBackdrop.classList.remove('invisible');
}

function hideOverlay(e) {
    if (e.target === this) {
        overlayBackdrop.classList.add('invisible');
        form.reset();
    }
}