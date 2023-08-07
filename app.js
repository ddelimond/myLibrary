// Variables

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
let cover;

//     adds the open class to the form element
function displayAddBookForm(){
addBookFormContainer.classList.add("open");
}


//   removes the open class from the form element  if the user click outside of the form
function closeAddBookForm(e){
    if(e.target !== addBookFormContainer){

    }else{
        addBookFormContainer.classList.remove("open");
    }
}


//   if the  add book form is closed a function will  be toggled
//   to add the open class to the container to display the add book form to the user
function toggleForm(){

if(!addBookFormContainer.classList.contains("open")){
    displayAddBookForm();
}
}


//   Book object
function Book(title, author,pages,cover,read){
    this.id = Date.now()* Math.floor(Math.random()*100);
this.title = title;
this.author = author;
this.pages = pages;
this.cover = cover;
this.read = read;
}



 function createBook(title, author, pages,cover,read){
    return new Book(title,author,pages,cover,read);
 }

// takes the created book and adds it to the users library
 async function addBookToLibrary (book){
     let myLibrary ;
    // if Library is not found in local storage it is created, but if it is
    // found in local storage the value is taken and made an array so that the new
    // book can be added to it, once added, the new Library is added to local storage.

    if(localStorage.getItem("Library") === null){
        myLibrary = [];
    }else{
         myLibrary = localStorage.getItem("Library");
        myLibrary = JSON.parse(myLibrary);
    }

     myLibrary.push(book);
     myLibrary = JSON.stringify(myLibrary);
    localStorage.setItem("Library", myLibrary);
 }

async function submitForm(){

      // Variables
      let title =  bookTitleInput.value;
      let author = bookAuthourInput.value;
      let pages =  bookPagesInput.value;
      let coverImg = cover;
      let read = bookReadCheckbox.value;

    if(bookTitleInput.value===""||bookAuthourInput.value===""||bookPagesInput.value===""){
        
    }else{
        // create default for empty cover and read
        if(coverImg === ""){
            coverImg = "N/A";
        }

        console.log("cover: "+coverImg)
    //   creation of new book using arguements
    let book  = await createBook(title,author,pages,coverImg,read);

    //     add the created book to the library
    await addBookToLibrary(book);

    //  clears the user's inputs and set the values back to nothing
    bookTitleInput.value = "";
    bookAuthourInput.value = "";
    bookPagesInput.value = "";
    bookCoverImageInput.value = "";
    bookReadCheckbox.value = "";
    }
    //  displays the newly added book on the DOM
    await displayLibraryBooks();
 }

 // gets stored library from local storage and loops through it to display each book on the DOM
 function displayLibraryBooks(){

    let libraryStr = localStorage.getItem("Library");
    let library  = JSON.parse(libraryStr);

     booksContainer.innerHTML = library.map((book)=>{
    return `<div class="bookCard" data-id=${book.id}>
            <i class="fa-regular fa-circle-check readIcon"></i>
            <div class="bookCardTop">
            <div class="coverContainer">
                <img src=${book.cover} alt=${book.title}>
            </div>
            <h1>${book.title}</h1>
            <span class="bookAuthor">${book.author}</span>
            <span class="bookPages">Pages: ${book.pages}</span>
            </div>
            <div class="interactions">
                <div>
                    <i class="fa-regular fa-eye viewIcon"></i>
                </div>
                <div onclick="deleteBook(${book.id})">
                    <i class="fa-solid fa-trash-can deleteIcon"></i>
                </div>
            </div>
        </div>`
    }).join("");
 }

// function to delete book from library then re display remaining books
function deleteBook (id){
    let bookId = id;
    let libraryStr = localStorage.getItem("Library");
    let library = JSON.parse(libraryStr);
    library = library.filter(book=>(book.id !== bookId));
    library = JSON.stringify(library);
    localStorage.setItem("Library", library);
    displayLibraryBooks();
}

window.addEventListener('DOMContentLoaded',displayLibraryBooks);
addBookBtn.addEventListener("click", toggleForm);
addBookFormContainer.addEventListener("click", closeAddBookForm);

// Event listener that wait for when user uploads a file then makes that file a url
// an assigns the url to the books cover variable
bookCoverImageInput.onchange = function (e) {
    let tgt = e.target;
    files = tgt.files;

    // FileReader support
    if (FileReader && files && files.length) {
        let reader = new FileReader();
        reader.onload = function () {
            cover = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }
}
submitBookBtn.addEventListener("click",submitForm);




