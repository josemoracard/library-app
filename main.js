const myLibrary = [];

function Book(title, author, pages, read = false) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }  
  this.id = crypto.randomUUID(); // ID único
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`;
}};

function addBookToLibrary(title, author, pages, read = false) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  renderLibrary();
}

function renderLibrary() {
  const container = document.getElementById('libraryContainer');
  container.innerHTML = '';

  myLibrary.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.setAttribute('data-id', book.id); // asociar visual con objeto

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p class="status ${book.read ? '' : 'not-read'}">
        ${book.read ? 'Read' : 'Not Read Yet'}
      </p>
      <button class="toggle-read-btn" data-id="${book.id}">
        Mark as ${book.read ? 'Unread' : 'Read'}
      </button>
      <button class="delete-btn" data-id="${book.id}">Delete</button>
    `;

    container.appendChild(card);
  });

  // Asignar eventos
  document.querySelectorAll('.delete-btn').forEach(btn =>
    btn.addEventListener('click', e => {
      const id = e.target.dataset.id;
      deleteBookById(id);
    })
  );

  document.querySelectorAll('.toggle-read-btn').forEach(btn =>
    btn.addEventListener('click', e => {
      const id = e.target.dataset.id;
      toggleReadStatus(id);
    })
  );
}


function deleteBookById(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    renderLibrary();
  }
}

function toggleReadStatus(id) {
  const book = myLibrary.find(book => book.id === id);
  if (book) {
    book.read = !book.read;
    renderLibrary();
  }
}

const newBookBtn = document.getElementById('newBookBtn');
const dialog = document.getElementById('bookDialog');
const bookForm = document.getElementById('bookForm');
const cancelBtn = document.getElementById('cancelBtn');

newBookBtn.addEventListener('click', () => {
  dialog.showModal();
});

cancelBtn.addEventListener('click', () => {
  dialog.close();
  bookForm.reset();
});

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const pages = parseInt(document.getElementById('pages').value, 10);
  const read = document.getElementById('read').checked;

  if (title && author && pages > 0) {
    addBookToLibrary(title, author, pages, read);
    dialog.close();
    bookForm.reset();
  }
});

addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);