const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    
}

const newBookOverlay = document.querySelector('#add-book');
const overlayBackdrop = document.querySelector('#backdrop');
const overlayForm = document.querySelector('#new-book');
const form = document.querySelector('form');

newBookOverlay.addEventListener('click', showOverlay);
overlayBackdrop.addEventListener('click', hideOverlay);

function showOverlay() {
    overlayBackdrop.classList.remove('hidden');
}

function hideOverlay(e) {
    if (e.target === this) {
        overlayBackdrop.classList.add('hidden');
        form.reset();
    }
}