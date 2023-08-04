
let myLibrary = [];
let addBookBtn = document.querySelector(".addBtn");
let loginBtn = document.querySelector(".loginBtn");
let addBookFormContainer = document.querySelector(".overlay");


function displayAddBookForm(){
addBookFormContainer.classList.add("open");
}

function closeAddBookForm(e){
    if(e.target !== addBookFormContainer){
        console.log('child');
    }else{
        addBookFormContainer.classList.remove("open");
    }
}

function toggleForm(){
if(!addBookFormContainer.classList.contains("open")){
    displayAddBookForm();
}
}

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

addBookBtn.addEventListener("click", toggleForm);
addBookFormContainer.addEventListener("click", closeAddBookForm);
