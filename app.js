
let myLibrary = [];
function Book(title, author,pages,published){
this.tilte = title;
this.author = author;
this.pages = pages;
this.published = published;
this.read = false;
}

function addBookToLibrary(book) {
myLibrary.push(book);
}

