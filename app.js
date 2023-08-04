
let myLibrary = [];
let booksContainer = document.querySelector(".booksContainer");
let addBookBtn = document.querySelector(".addBtn");
let loginBtn = document.querySelector(".loginBtn");
let addBookFormContainer = document.querySelector(".overlay");
let bookTitleInput = document.querySelector("#title");
let bookAuthourInput = document.querySelector("#author");
let bookPagesInput = document.querySelector("#pages");
let bookCoverImageInput = document.querySelector("#cover");
let bookReadCheckbox = document.querySelector("#read");
let submitBookBtn = document.querySelector(".submit");


function displayAddBookForm(){
addBookFormContainer.classList.add("open");
}

function closeAddBookForm(e){
    if(e.target !== addBookFormContainer){
        console.log("child");
    }else{
        addBookFormContainer.classList.remove("open");
    }
}

function toggleForm(){
if(!addBookFormContainer.classList.contains("open")){
    displayAddBookForm();
}
}

function Book(title, author,pages,cover, read){
this.tilte = title;
this.author = author;
this.pages = pages;
this.cover = cover;
this.read = read;
}

 function createBook(title, author, pages,cover,read){
    return new Book(title,author,pages,cover,read);
 }
 function addBookToLibrary (book){
    myLibrary.push(book)
 }

 function submitForm(e,title,author,pages,cover="N/A",read=false){
    e.preventDefault();
    if(bookTitleInput.value===""||bookAuthourInput.value===""||bookPagesInput.value===""){
        
    }else{
    let book  = createBook(title,author,pages,cover,read);
    addBookToLibrary(book);
    bookTitleInput.value ="" ;
    bookAuthourInput.value="";
    bookPagesInput.value="";
    bookCoverImageInput.value="";
    bookReadCheckbox.value="";
    }
 }

 function displayLibraryBooks(){
     booksContainer.insertAdjacentElement("beforeend", myLibrary.map((book)=>{
    return"insert book card html"
    }).join(""));
 }



addBookBtn.addEventListener("click", toggleForm);
addBookFormContainer.addEventListener("click", closeAddBookForm);
submitBookBtn.addEventListener("click",submitForm(bookTitleInput.value,bookAuthourInput.value,bookPagesInput.value));
