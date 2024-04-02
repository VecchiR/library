const myLibrary = [];

class Book {
    constructor (title, author, pages, read, id) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = id;
    }

    info() {
        return (`${title} by ${author}, ${pages} pages, ${read}`);
    }

    toggleRead() {
        this.read = !this.read;
    }
}
    
const bookTitleForm = document.querySelector('#book-title');
const addBookForm = document.querySelector(".dialog-form");
const dialog = document.querySelector(".dialog-addbook");

const addBookButton = document.querySelector('.add-book');
addBookButton.addEventListener('click', () => {
    addBookForm.reset();
    resetTitleError();
    dialog.showModal();
});

const booksTable = document.querySelector('.books-table');
booksTable.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
        deleteBookFromLibrary(e.target.parentNode.parentNode);
    }

    if (e.target.classList.contains("readCheck")) {
        changeReadStatus(e.target.parentNode.parentNode);
    }

    else {
        return;
    }
});


const closeDialogButton = document.querySelector(".dialog-close");
closeDialogButton.addEventListener("click", () => {
    dialog.close();
});

const submitButton = document.querySelector(".book-submit");
submitButton.addEventListener('click', (event) => {
    submitBook(event);
});

let bookDeleteButton;
let readCheckbox;

const bookTitleError = document.querySelector('span.error');

function submitBook(event) {
    event.preventDefault();
    let title = bookTitleForm.value;

    if (bookTitleForm.validity.valueMissing) {
        bookTitleError.className = 'error active';
        bookTitleError.textContent = "Please enter the book's title!";
        return;
    }
    else {
        resetTitleError();
    }

    let author = document.querySelector("#book-author").value;
    let pages = document.querySelector("#book-pages").value;
    let read = document.querySelector("#book-finished").checked;
    let id = generateId();
    let newBook = new Book(title, author, pages, read, id);
    addBookToLibrary(newBook);
    addBookForm.reset();
}

function addBookToLibrary(book) {
    console.log(book);
    myLibrary.push(book);
    let newRow = document.createElement("tr");
    let hiddenTag = document.createElement("input");
    hiddenTag.setAttribute('type', 'hidden');
    hiddenTag.setAttribute('value', book.id);
    newRow.appendChild(hiddenTag);

    for (let x = 0; x < 5; x++) {
        let newData = document.createElement("td");

        switch (true) {
            case x < 3:
                let newText = document.createTextNode(Object.values(book)[x]);
                newData.appendChild(newText);
                break;

            case x === 3:
                let newCheckbox = document.createElement("input");
                newCheckbox.setAttribute("type", "checkbox");
                newCheckbox.setAttribute("class", "readCheck");

                if (Object.values(book)[3] === true) {
                    newCheckbox.checked = true;
                }
                newData.appendChild(newCheckbox);
                break;

            case x === 4:
                let newDeleteBtn = document.createElement("a");
                newDeleteBtn.setAttribute("class", "delete-button");
                let deleteBtnText = document.createTextNode("remove");
                newDeleteBtn.appendChild(deleteBtnText);
                newData.appendChild(newDeleteBtn);
                break;
        }

        newRow.appendChild(newData);
    }
    booksTable.appendChild(newRow);
}

function examplesOnLoad() {
    const meditations = new Book('Meditations', 'Marcus Aurelius', 208, false, generateId());
    addBookToLibrary(meditations);
    const fahrenheit = new Book('Fahrenheit 451', 'Ray Bradbury', 159, true, generateId());
    addBookToLibrary(fahrenheit);
    const bravenew = new Book('Brave New World', 'Aldous Huxley', 288, true, generateId());
    addBookToLibrary(bravenew);
    const kurt = new Book('Slaughterhouse-Five', 'Kurt Vonnegut', 215, true, generateId());
    addBookToLibrary(kurt);
    const meaning = new Book("Man's Search for Meaning", 'Viktor E. Frankl', 184, false, generateId());
    addBookToLibrary(meaning);
}

function updateReadStatus(x) {
    alert(this);
    alert(x);
    let rowIndex = x.rowIndex;
    alert(rowIndex);
}

function generateId() {
    return Math.random().toString(36).substring(2) +
        (new Date()).getTime().toString(36);
}

function deleteBookFromLibrary(row) {
    let bookId = row.querySelector('input').value;
    let bookIndex = myLibrary.findIndex(book => {
        return book.id === bookId;
    });

    myLibrary.splice(bookIndex, 1);
    booksTable.deleteRow(row.rowIndex);
}

function changeReadStatus(row) {
    let bookId = row.querySelector('input').value;
    let bookIndex = myLibrary.findIndex(book => {
        return book.id === bookId;
    });
    myLibrary[bookIndex].toggleRead();
}

function resetTitleError() {
    bookTitleError.className = 'error';
    bookTitleError.innerHTML = '';
}

examplesOnLoad();