/** 
 * Library Project To-Do/Plan: 
 *  4. Adjust font and make UI look better
 * */ 

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Temporary manually added books
const meditations = new Book("Meditations", "Marcus Aurelius", 311, true);
myLibrary.push(meditations);
const nineteenEightyFour = new Book("1984", "George Orwell", 328, true);
myLibrary.push(nineteenEightyFour);
const theGreatGatsby = new Book("The Great Gatsby", "F. Scott Fitzgerald", 192, true);
myLibrary.push(theGreatGatsby);
const frankenstein = new Book("Frankenstein", "Mary Shelley", 280, true);
myLibrary.push(frankenstein);

function openForm() {
    document.getElementById("myForm").style.display = "block";
} 

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

document.getElementById("myForm").addEventListener("submit", function (e) {
    handleSubmit(e);
});

const books = document.getElementById("books");

function handleSubmit(e) {
    closeForm();
    alert("Successfully added book!");
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    addBookToLibrary(formProps);
    function addBookToLibrary(formProps) {
        const newBook = new Book();
        Object.assign(newBook, formProps);
        myLibrary.push(newBook);
        console.log(myLibrary);
        const bookCard = document.createElement("div");
        bookCard.setAttribute("class", "book-card");
        addBookHTML(newBook, bookCard);
    }
}

const addButton = document.getElementById("add-book");

function moveButton() {
    const books = document.getElementById("books");
    books.removeChild(addButton);
    books.appendChild(addButton);
}

function displayBooks() {
    for(const currBook of myLibrary) {
        const bookCard = document.createElement("div");
        bookCard.setAttribute("class", "book-card");
        addBookHTML(currBook, bookCard);
    }
}

function addBookHTML(currBook, bookCard) {
    bookCard.setAttribute("id", `${currBook.title}`);
    const title = document.createElement("h3");
    title.setAttribute("class", "book-title");
    title.innerHTML = "Title: <span class='notbold italic'>" + currBook.title + "</span>";
    const author = document.createElement("h3");
    author.setAttribute("class", "book-author");
    author.innerHTML = "Author: <span class='notbold'>" + currBook.author + "</span>";
    const pages = document.createElement("h3");
    pages.setAttribute("class", "book-pages");
    pages.innerHTML = "Pages: <span class='notbold'>" + currBook.pages + "</span>";
    const read = document.createElement("h3");
    read.setAttribute("class", "book-read");
    if(currBook.read == 'Yes' || currBook.read == true) {
        read.innerHTML = "Read: <i class='fa-solid fa-check fa-lg'></i>";
    }
    else {
        read.innerHTML = "Read: <i class='fa-solid fa-xmark fa-lg'></i>";
    }
    read.addEventListener("click", function () {
        if(read.innerHTML.includes("check")) {
            read.innerHTML = "Read: <i class='fa-solid fa-xmark fa-lg'></i>";
        }
        else {
            read.innerHTML = "Read: <i class='fa-solid fa-check fa-lg'></i>";
        }
    });
    const remove = document.createElement("h3");
    remove.setAttribute("class", "remove");
    remove.innerHTML = "<i class='fa-solid fa-trash fa-lg'></i>";
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(read);
    bookCard.appendChild(remove);
    console.log(remove.parentElement);
    books.appendChild(bookCard);
    remove.addEventListener("click", function () {
        const parent = remove.parentElement;
        parent.remove();
    });
    moveButton();
}

displayBooks();