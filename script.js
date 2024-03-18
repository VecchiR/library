const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return (`${title} by ${author}, ${pages} pages, ${read}`)
    };
}

const addBookButton = document.querySelector('.add-book');
addBookButton.addEventListener('click', promptUser);

const booksTable = document.querySelector('.books-table');

let bookDeleteButton;


function promptUser() {
    //OLD LOGIC USING PROMPTS:
        // let title = prompt('title');
        // let author = prompt('author');
        // let pages = parseInt(prompt('pages'));
        // let read = prompt('read');
        // const newBook = new Book(title, author, pages, read);
        // addBookToLibrary(newBook);

    //NEW LOGIC:
    


}

function addBookToLibrary(book) {
    console.log(book);
    myLibrary.push(book);
    let newRow = document.createElement("tr");
    for (let x = 0; x < 4; x++) {
        let newData = document.createElement("td");
        let newText = document.createTextNode(Object.values(book)[x]);
        newData.appendChild(newText);
        newRow.appendChild(newData);
    }
    let newDeleteBtn = document.createElement("button");
    newDeleteBtn.addEventListener('click', test);
    let deleteBtnText = document.createTextNode("Delete");
    newDeleteBtn.appendChild(deleteBtnText);
    newRow.appendChild(newDeleteBtn);
    booksTable.appendChild(newRow);
}

function examplesOnLoad() {
    const meditations = new Book('Meditations', 'Marcus Aurelius', 208, 'no');
    addBookToLibrary(meditations);
    const fahrenheit = new Book ('Fahrenheit 451', 'Ray Bradbury', 159, 'yes');
    addBookToLibrary(fahrenheit);
}



examplesOnLoad();




function test() {
    alert('DELETED');
}