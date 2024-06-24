

const myLibrary = [];
const content = document.querySelector('.content');
const TxtBookTitle = document.getElementById('TxtBookTitle');
const TxtAuthorName = document.getElementById('TxtAuthorName');
const NumPages = document.getElementById('TxtNumPages');
const ChkRead = document.getElementById('ChkRead');
const btnAddBook = document.getElementById('BtnAnadirLibro');
const btnGuardar = document.querySelector('#BtnGuardar');
const form = document.querySelector('.form-container');
const dialog = document.getElementById('addBookDialog');
const btnCancelar = document.getElementById('BtnCancelar');
form.classList.toggle("hidden");

function Book( bookID, title, author, numPages, read){

    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
    this.bookID = bookID;
}

Book.prototype.info = function() {

    var txtRead = 'not read';
    if(this.read)
        txtRead = 'read';

    return this.title +' by ' + this.author + ', ' + this.numPages + ', ' + txtRead;
}

Book.prototype.readBook = function() {
    this.read = !this.read;
}

function deletebook(element){
    const HfBookId = parseInt(element.parentElement.parentElement.querySelector(".ID-Libro").value);

    myLibrary.pop(HfBookId);

    element.parentElement.parentElement.remove();

    var myBooks = document.querySelectorAll('.card');

    for(var i = HfBookId; i < myBooks.length ; i++)
    {
        if(parseInt(myBooks[i].querySelector(".ID-Libro")) > HfBookId)
        {
            div.querySelector(".ID-Libro").setAttribute("value",i);
            myLibrary[i].bookID = i;
        }

    }

}

function ToggleRead(element){
    const HfBookId = parseInt(element.parentElement.parentElement.querySelector(".ID-Libro").value);

    myLibrary[HfBookId].readBook();

    element.parentElement.parentElement.getElementsByTagName("p")[0].textContent = myLibrary[HfBookId].info();

}

//Adds initial books to the library
function AddInitialBooks(){

    var index = 0;
    const lotr = new Book(0, 'Lord of the rings', 'J.R.R. Tolkien', '600', false);
    const dune = new Book(1, 'Dune', 'Frank Herbert', '820', true);
    

    myLibrary.push(lotr);
    myLibrary.push(dune);

    myLibrary.forEach((book) => {
        const tempdiv = document.createElement('div');
        const tempPar = document.createElement('p');
        const hiddenfieldID = document.createElement('input');
        const tempBtnContainer = document.createElement('div');

        hiddenfieldID.setAttribute("type","hidden");
        hiddenfieldID.setAttribute("value", book.bookID);
        hiddenfieldID.setAttribute("class","ID-Libro");

        
        const tempBtnDelete = document.createElement('button');
        const tempBtnRead = document.createElement('button');

        tempBtnRead.textContent = 'Read';
        tempBtnDelete.style.backgroundColor = "red";
        tempBtnDelete.textContent ='Delete';

        tempBtnRead.addEventListener('click',function(event){
            ToggleRead(event.target);
        });
        tempBtnDelete.addEventListener('click', function(event){
            deletebook(event.target);
        });

        
        tempPar.textContent = myLibrary[index].info();
        tempdiv.classList.add("card");
        tempBtnContainer.classList.add("buttons-container");

        content.appendChild(tempdiv);
        tempdiv.appendChild(tempPar);
        tempdiv.appendChild(document.createElement("br"));
        tempdiv.appendChild(tempBtnContainer);
        tempBtnContainer.appendChild(tempBtnRead);
        tempBtnContainer.appendChild(tempBtnDelete);
        tempdiv.appendChild(hiddenfieldID);
        index++;
    });
}

function AddBookToLibrary(){

    const book = new Book(
        myLibrary.length,
        TxtBookTitle.value, 
        TxtAuthorName.value,
        NumPages.value,
        ChkRead.checked
        );

    myLibrary.push(book);
    
    const tempPar = document.createElement('p');
    const tempdiv = document.createElement('div');
    const tempBtnContainer = document.createElement('div');

    tempdiv.classList.add("card");
    tempBtnContainer.classList.add(".buttons-container");

    const hiddenfieldID = document.createElement('input');

    if(myLibrary.length > 0)
        hiddenfieldID.setAttribute("value", book.bookID);
    else
        hiddenfieldID.setAttribute("value", 0);
    
    hiddenfieldID.setAttribute("type","hidden");
    hiddenfieldID.setAttribute("class","ID-Libro");

    const tempBtnDelete = document.createElement('button');
    const tempBtnRead = document.createElement('button');

    tempBtnRead.addEventListener('click', function(event){
        ToggleRead(event.target);
    });
    tempBtnDelete.addEventListener('click', function(event){
        deletebook(event.target);
    });

    tempBtnRead.textContent = 'Read';
    tempBtnDelete.style.backgroundColor = "red";
    tempBtnDelete.textContent ='Delete';
    tempPar.textContent = myLibrary[myLibrary.length -1].info();


    content.appendChild(tempdiv);
    tempdiv.appendChild(tempPar);
    tempdiv.appendChild(tempBtnContainer)
    tempBtnContainer.appendChild(tempBtnRead);
    tempBtnContainer.appendChild(tempBtnDelete);
    tempdiv.appendChild(hiddenfieldID);
}

btnAddBook.addEventListener('click', () =>{

    TxtAuthorName.value = "";
    TxtBookTitle.value = "";
    NumPages.value = "";
    ChkRead.checked = false;
    dialog.showModal();
});

btnGuardar.addEventListener('click', AddBookToLibrary);

btnCancelar.addEventListener('click', () => {
    dialog.close();
});

AddInitialBooks();
