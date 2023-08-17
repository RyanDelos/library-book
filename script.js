'use strict';

// the constructor...
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

class Library {
  constructor() {
    this.myLibrary = [];
    this.addBtn = document.querySelector('.add-btn');
    this.hidden = document.querySelector('.hidden');
    this.form = document.querySelector('#form');
    this.closeForm = document.querySelector('.close-btn');
    this.bookShelf = document.querySelector('.book-shelf');
    this.year = document.querySelector('.year');
    this.currentYear = new Date().getFullYear();

    this.addBtn.addEventListener('click', this.showForm.bind(this));
    this.closeForm.addEventListener('click', this.hideForm.bind(this));
    this.form.addEventListener('submit', this.addBookToLibrary.bind(this));

    this.year.textContent = this.currentYear;
  }

  showForm() {
    this.hidden.style.visibility = 'visible';
  }

  hideForm() {
    this.hidden.style.visibility = 'hidden';
  }

  addBookToLibrary(event) {
    event.preventDefault();
    // Get the form input values
    const titleInput = document.getElementById('book-title').value;
    const authorInput = document.getElementById('author').value;
    const pagesInput = document.getElementById('pages').value;
    const readInput = document.getElementById('read').value;

    const newBook = new Book(titleInput, authorInput, pagesInput, readInput);

    this.myLibrary.push(newBook);
    event.target.reset();

    // hides form when submitted
    this.hideForm();

    this.renderBooks();
  }

  removeBook(index) {
    this.myLibrary.splice(index, 1);
    this.renderBooks();
  }

  renderBooks() {
    this.bookShelf.innerHTML = '';
    this.myLibrary.forEach((book, index) => {
      this.generateBookCard(book, index);
    });
  }

  generateBookCard(book) {
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

    this.bookShelf.appendChild(bookCard);
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(readBtn);
    bookCard.appendChild(removeBtn);

    // remove child of bookShelf that was clicked
    removeBtn.addEventListener('click', () => {
      this.removeBook(book);
      this.bookShelf.removeChild(bookCard);
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
  removeBook(index) {
    this.myLibrary.splice(index, 1);
  }
}

// library is the instance
const library = new Library();
