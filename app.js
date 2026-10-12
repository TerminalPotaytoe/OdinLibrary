const addbookbtn = document.querySelector('.addBook');
const library = document.querySelector('.library');
const bookForm = document.querySelector('.addingBook')
const books = [{name: "The Most Important Thing", author: "Donald Duck", year: "9/11/2926", read: true, id: crypto.randomUUID()}];
const submit = document.querySelector('.submit');
const bookInfo = document.querySelector('.bookInfo');
let bookNum = 0;



const clearInputs = () => {
    bookInfo.reset();
}


let addingBook = false;
addbookbtn.addEventListener('click', ()=> {
    addingBook=true;
    bookForm.hidden = !bookForm.hidden;
})

function createBooks() {
    library.innerHTML = "";
    books.forEach(book => {
        const bookcontainer = document.createElement("div");

        const deletebtn = document.createElement("button");
        const nameel = document.createElement("h1");
        const authorel = document.createElement("h3");
        const yearel = document.createElement("h3");
        const readlbl = document.createElement("label");
        const readspan = document.createElement("span");
        const readel = document.createElement("input");

        readspan.textContent = "Read: "
        readel.type = "checkbox";
        readel.value = book.read;

        deletebtn.textContent="X";
        nameel.textContent=`Name: ${book.name}`;
        authorel.textContent=`Author: ${book.author}`;
        yearel.textContent=`Date: ${book.year}`;
        readel.textContent=`Read: ${book.read}`;
        deletebtn.id = book.id;
        deletebtn.classList.add('deletebtn');
        bookcontainer.classList.add('bookCard');
        bookcontainer.append(deletebtn, nameel, authorel, yearel, readlbl);
        readel.checked = Boolean(book.read);
        readel.addEventListener('change', ()=>{
            book.read = readel.checked;
            console.log(book.read);
        });

        library.appendChild(bookcontainer);
        bookcontainer.appendChild(readlbl);
        readlbl.append(readspan, readel);

        

    });
}



createBooks();

bookForm.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        bookForm.hidden = true;
        clearInputs();
    }
})

bookForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    const book = {
        name: document.querySelector('#bookName').value,
        author: document.querySelector('#authorName').value,
        year: document.querySelector('#bookYear').value,
        read: document.querySelector("#read").checked,
        id: crypto.randomUUID()
    };

    books.push(book);
    console.log(books);
    bookForm.hidden = true;
    createBooks();
    clearInputs();
    
})

function deletebook(id) {
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {books.splice(index, 1)}
    createBooks();
}


function enforceMax(input) {
  if (parseFloat(input.value) > parseFloat(input.max)) {
    let splicedvalue = input.value.slice(0, 4);
    input.value = splicedvalue;
  }
}   

library.addEventListener('click', (e) => {
    if (e.target.classList.contains('deletebtn')) {
        deletebook(e.target.id)
    }
})




