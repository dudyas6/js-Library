// Data Structures

class Book {
    constructor(
        title = 'Unknown',
        author = 'Unknown',
        pages = '0',
        isRead = false
    ) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }
}

class Library {
    constructor() {
        this.books = []
    }

    addBook(newBook) {
        if (!this.isInLibrary(newBook)) {
            this.books.push(newBook)
        }
    }

    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title)
    }

    getBook(title) {
        return this.books.find((book) => book.title === title)
    }

    isInLibrary(newBook) {
        return this.books.some((book) => book.title === newBook.title)
    }
}

const myLibrary = new Library()

// User Interface

const booksGrid = document.querySelector('.books-grid')
const addBookBtn = document.getElementById('addBookBtn')
const addBookModal = document.getElementById('addBookModal')
const addBookForm = document.getElementById('addBookForm')
const removeBookBtn = document.getElementById('removeBookBtn')
const overlay = document.getElementById('overlay')
const errorMsg = document.getElementById('errorMsg')


const openAddBookModal = () => {
    addBookForm.reset()
    addBookModal.classList.add('active')
    overlay.classList.add('active')
}

const closeAddBookModal = () => {
    addBookModal.classList.remove('active')
    overlay.classList.remove('active')
    errorMsg.classList.remove('active')
    errorMsg.textContent = ''
}

const closeAllModals = () => {
    closeAddBookModal()
}

const resetBooksGrid = () => {
    booksGrid.innerHTML = ''
}

const getBookFromForm = () => {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isRead = document.getElementById('isRead').checked
    return new Book(title, author, pages, isRead)
}

const updateBooksGrid = () => {
    resetBooksGrid()
    for (let book of myLibrary.books) {
        createBookCard(book)
    }
}


const createBookCard = (book) => {
    //set elements
    const bookCard = document.createElement('div')
    const title = document.createElement('p')
    const author = document.createElement('p')
    const pages = document.createElement('p')
    const readColumn = document.createElement('div')
    const isRead = document.createElement('p')
    const readBtn = document.createElement('button')
    const removeBtn = document.createElement('button')

    //set class names
    bookCard.classList.add('book')
    removeBtn.classList.add('delete')
    readColumn.classList.add('book-read')
    readBtn.classList.add('is-read-small')
    readBtn.setAttribute('id','readStatus')
    removeBtn.setAttribute('id','removeBookBtn')
    
    //set buttons
    readBtn.onclick = changeReadStatus
    removeBtn.onclick = removeBook

    //set text content
    title.textContent = `Title : "${book.title}"`
    author.textContent = `Author : ${book.author}`
    pages.textContent = `Pages : ${book.pages}`
    removeBtn.textContent = 'Delete'
    readBtn.textContent = 'Change Read Status'
    isRead.textContent = book.isRead ? 'Read' : 'Not Read'

    //create div and append it to grid
    readColumn.appendChild(readBtn)
    readColumn.appendChild(isRead)
    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pages)
    bookCard.appendChild(readColumn)
    bookCard.appendChild(removeBtn)
    booksGrid.appendChild(bookCard)
}

const changeReadStatus = (e) => {
    const title = e.target.parentElement.parentElement.firstElementChild.innerHTML.split('"')[1]
    const book = myLibrary.getBook(title)
    book.isRead = !book.isRead
    updateBooksGrid()
}

const addBook = (e) => {
    e.preventDefault()
    const newBook = getBookFromForm()

    if (myLibrary.isInLibrary(newBook)) {
        errorMsg.classList.add('active')
        errorMsg.textContent = 'The Book is already in the library'
        return
    }
    myLibrary.addBook(newBook)
    updateBooksGrid()
    closeAddBookModal()
}

const removeBook = (e) => {
    const title = e.target.parentElement.parentElement.firstElementChild.innerHTML.split('"')[1]
    const book = myLibrary.getBook(title)  
    myLibrary.removeBook(title)
    updateBooksGrid()
}


addBookBtn.onclick = openAddBookModal
overlay.onclick = closeAllModals
addBookForm.onsubmit = addBook