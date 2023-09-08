const myForm = document.getElementById('my-form')
const alert = document.querySelector('.alert')
const homePage = document.getElementById('home')
const bookPage = document.getElementById('books')
const author = document.getElementById('new-author')
const title = document.getElementById('new-title')
const price = document.getElementById('new-price')
const type = document.getElementById('new-type')
const editForm = document.getElementById('edit-form')
const editAlert = document.getElementById('edit-alert')
const menuIcon = document.getElementById('menu-icon')
const search = document.getElementById('search')
const bookContainer =document.getElementById('book-container')

const books = JSON.parse(localStorage.getItem('books')) || []
let editIndex;

myForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const {author,title,price} = e.target;
    const selectedType = document.querySelector('input[name="gridRadios"]:checked').value;

    const book = {
        author:author.value,
        title:title.value,
        price:price.value,
        type:selectedType,
    }
    addBook(book)
    myForm.reset()
})

const addBook = (book) =>{
    books.push(book)
    showAlert("Book Added Successfully 😊") 
    updateLs()
}
const showAlert = (msg) =>{
    alert.style.display="block"
    alert.innerHTML = msg;
    setTimeout(()=>{
        alert.style.display="none"
    },800)  
}
const updateLs = () => {
    localStorage.setItem('books',JSON.stringify(books))
    fetchBooks()
}


const fetchBooks = () =>{
    bookContainer.innerHTML=""
    if(books.length===0){
        bookContainer.innerHTML="<p class='fs-5 mt-3 text-danger text-center'>No Book to display!!</p>"
    }else{
        books.map((book,index)=>{
            const bookBox = document.createElement('div');
            bookBox.classList.add('col-lg-4','col-md-6')
            bookBox.innerHTML = `
           
            <div class="card bg-light p-3">
                        <p>Author: ${book.author}</p>
                        <p class="book-title">Title: ${book.title}</p>
                        <p>Price: &#8377;${book.price}</p>
                        <p>Type: ${book.type}</p>
                        <div class="d-flex gap-2"><i class="fa-solid fa-trash fs-5 text-danger"></i>
                        <i class="fa-solid fa-edit fs-5 text-warning " data-bs-toggle="modal" data-bs-target="#exampleModal"></i></div>
            </div>
           
            
            `
            bookContainer.appendChild(bookBox)

            bookBox.querySelector('.fa-trash').addEventListener('click',()=>{
                books.splice(index ,1);
                updateLs()
                showAlert("Book deleted Successfully 😊")
            })
            bookBox.querySelector('.fa-edit').addEventListener('click',()=>{
                
              
                author.value=book.author
                title.value=book.title
                price.value=book.price
                type.value=book.type
                editIndex=index
            })
        })  
    }
   
   
}


function displayHome(){
    
    homePage.style.display="block"
    bookPage.style.display="none"
}
function displayBooks(){
    homePage.style.display="none"
    bookPage.style.display="block"
}

function toggleMenu(){
    if(menuIcon.classList.contains('fa-bars')){
        menuIcon.classList.replace('fa-bars','fa-xmark')
    }else{
        if(menuIcon.classList.contains('fa-xmark')){
            menuIcon.classList.replace('fa-xmark','fa-bars')
        }
    }
   
}
editForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    books[editIndex].title=title.value
    books[editIndex].author=author.value
    books[editIndex].price=price.value
    books[editIndex].type=type.value
    updateLs()
   editAlert.style.display="block"
   setTimeout(()=>{
    editAlert.style.display="none"
   },2000)
    editForm.reset()
})

search.addEventListener('keyup',(e)=>{
    const searchTerm = e.target.value.toLowerCase()

    bookContainer.querySelectorAll('.book-title').forEach(title=>{
       if(title.textContent.toLowerCase().includes(searchTerm)){
          title.parentElement.style.display="block"
       }else{
        title.parentElement.style.display="none"
       }
        
    })
})

fetchBooks()