const myLibrary = [];

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return (`${title} by ${author}, ${pages} pages, ${read}`)
    };
    this.toggleRead = function () {
        this.read = !this.read;
    }
    this.id = id;
}

const bookTitleForm = document.querySelector('#book-title');

const addBookForm = document.querySelector(".dialog-form");
const dialog = document.querySelector(".dialog-addbook");
const addBookButton = document.querySelector('.add-book');
addBookButton.addEventListener('click', () => {
    addBookForm.reset();
    dialog.showModal();
});

const booksTable = document.querySelector('.books-table');
booksTable.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
        deleteBookFromLibrary(e.target.parentNode);
    }

    if (e.target.classList.contains("readCheck")) {
        changeReadStatus(e.target.parentNode);
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


function submitBook(event) {
    event.preventDefault();
    let title = bookTitleForm.value;

    if(bookTitleForm.validity.valueMissing){
        bookTitleForm.setCustomValidity("I am expecting an email address!");
        return;
    }
    else {
        bookTitleForm.setCustomValidity("");
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
    for (let x = 0; x < 3; x++) {
        let newData = document.createElement("td");
        let newText = document.createTextNode(Object.values(book)[x]);
        newData.appendChild(newText);
        newRow.appendChild(newData);
    }

    let newCheckbox = document.createElement("input");
    newCheckbox.setAttribute("type", "checkbox");
    newCheckbox.setAttribute("class", "readCheck");

    if (Object.values(book)[3] === true) {
        newCheckbox.checked = true;
    }
    newRow.appendChild(newCheckbox);


    let newDeleteBtn = document.createElement("button");
    newDeleteBtn.setAttribute("class", "delete-button");
    let deleteBtnText = document.createTextNode("Delete");
    newDeleteBtn.appendChild(deleteBtnText);
    newRow.appendChild(newDeleteBtn);
    booksTable.appendChild(newRow);
}

function examplesOnLoad() {
    const meditations = new Book('Meditations', 'Marcus Aurelius', 208, true, generateId());
    addBookToLibrary(meditations);
    const fahrenheit = new Book('Fahrenheit 451', 'Ray Bradbury', 159, false, generateId());
    addBookToLibrary(fahrenheit);
}







function test() {
    alert('DELETED');
}

function updateReadStatus(x) {
    alert(this);
    alert(x);
    let rowIndex = x.rowIndex;
    alert(rowIndex);
}

function getBookIndex(title) {

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



examplesOnLoad();