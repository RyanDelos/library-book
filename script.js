'use strict';

const addBtn = document.querySelector('.add-btn');
const hidden = document.querySelector('.hidden');
const form = document.querySelector('#form');
const closeForm = document.querySelector('.close-btn');
const bookShelf = document.querySelector('.book-shelf');
let myLibrary = [];
let year = document.querySelector('.year');
let currentYear = new Date().getFullYear();

addBtn.onclick = function () {
  hidden.style.visibility = 'visible';
};

// close when user clicks x button
closeForm.onclick = function () {
  hidden.style.visibility = 'hidden';
};

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(event) {
  // do stuff here
  event.preventDefault();
  // Get the form input values
  const titleInput = document.getElementById('book-title').value;
  const authorInput = document.getElementById('author').value;
  const pagesInput = document.getElementById('pages').value;
  const readInput = document.getElementById('read').value;

  const newBook = new Book(titleInput, authorInput, pagesInput, readInput);

  myLibrary.push(newBook);
  console.log(myLibrary);

  event.target.reset();

  // hides form when submitted
  hidden.style.visibility = 'hidden';

  renderBooks();
}

function renderBooks() {
  bookShelf.innerHTML = '';

  myLibrary.forEach((book) => {
    console.log(book);
    generateBookCard(book);
  });
}

function generateBookCard(book) {
  const bookCard = document.createElement('div');
  const title = document.createElement('h2');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const readBtn = document.createElement('button');
  const removeBtn = document.createElement('button');

  bookCard.classList.add('book-container');
  title.classList.add('book-title');
  author.classList.add('book-author');
  pages.classList.add('book-pages');
  readBtn.classList.add('btn-read');
  removeBtn.classList.add('btn-remove');

  title.textContent = book.title;
  author.textContent = `Author: ${book.author}`;
  pages.textContent = `${book.pages} pages`;
  readBtn.textContent = `Read: ${book.read}`;
  removeBtn.textContent = 'Remove';

  bookShelf.appendChild(bookCard);
  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(readBtn);
  bookCard.appendChild(removeBtn);

  // remove child of bookShelf that was clicked
  removeBtn.addEventListener('click', () => {
    removeBook(book);
    bookShelf.removeChild(bookCard);
  });

  readBtn.addEventListener('click', () => {
    if (readBtn.textContent === 'Read: yes') {
      readBtn.textContent = 'Read: no';
    } else {
      readBtn.textContent = 'Read: yes';
    }
  });
}

// remove book in myLibrary array
function removeBook(index) {
  myLibrary.splice(index, 1);
  console.log(myLibrary);
}

// Add an event listener to the form submit event
form.addEventListener('submit', addBookToLibrary);

// footer
year.textContent = currentYear;
