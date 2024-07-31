function bookList(){
    //alert("Book List");
    fetch("http://localhost:7777/api/books")
        .then((res) => res.json())
        .then((response) => {
            console.log(response);
            // display the response in a table
            let data = `<div class="container m-5">
                        <h3>LIST OF BOOKS</h3>
                        <table class="table">
                            <thead class="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>BOOK IMAGE</th>
                                    <th>BOOK TITLE</th>
                                    <th>AUTHOR NAME</th>
                                    <th>BOOK GENRE</th>
                                    <th>BOOK PRICE</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>`;
            for(let eachBook of response){
                data += `<tr>
                            <td>${eachBook.bookId}</td>
                            <td><img src="${eachBook.bookImageUrl}" height="50" width="80"></td>
                            <td>${eachBook.bookTitle}</td>
                            <td>${eachBook.author.authFirstName}  ${eachBook.author.authLastName}</td>
                            <td>${eachBook.bookGenre}</td>
                            <td>Rs.${eachBook.bookPrice}</td>
                            <td><button type="button" class="btn btn-danger small" onClick="deleteBook(${eachBook.bookId})">Remove</button></td>
                        </tr>`;
            }
            data += `</tbody></table></div>`;
            document.getElementById("main-content").innerHTML = data;
        })
    // any line of code here will continue to execute
}

function deleteBook(bookId){
    //alert(bookId);
    // use fetch api and consume the delete endpoint of backend application
    fetch("http://localhost:7777/api/books/" + bookId, {
        method: "DELETE"})
        .then((res) => res.json())
        .then((response) => bookList());
}

function bookAdd(){
    //alert("Book Add");
    fetch("http://localhost:7777/api/authors")
        .then((res) => res.json())
        .then((response) => {
            // display a form here to add book info
            let data = `<div class="container m-5">
            <h3>ADD A BOOK</h3>
            <form>
                <div class="mb-3 mt-3">
                <label for="bId" class="form-label">Book Id:</label>
                <input type="text" class="form-control" id="bId" placeholder="Enter Book Id" name="bookId">
                </div>
                <div class="mb-3">
                <label for="bTitle" class="form-label">Book Title:</label>
                <input type="text" class="form-control" id="bTitle" placeholder="Enter Book Title" name="bookTitle">
                </div>
                <div class="mb-3">
                <label for="bAuthor" class="form-label">Book Author:</label>
                <select id="bAuthor" class="form-select" name="bookAuthor">`;
for(let eachAuthor of response){
    data += `<option value="${eachAuthor.authId}">${eachAuthor.authId} - ${eachAuthor.authFirstName} ${eachAuthor.authLastName} </option>`;
}

data +=        `</select>
                </div>
                <div class="mb-3">
                <label for="bGenre" class="form-label">Book Genre:</label>
                <input type="text" class="form-control" id="bGenre" placeholder="Enter Book Genre" name="bookGenre">
                </div>
                <div class="mb-3">
                <label for="bPrice" class="form-label">Book Price:</label>
                <input type="text" class="form-control" id="bPrice" placeholder="Enter Book Price" name="bookPrice">
                </div>
                <div class="mb-3">
                <label for="bImageUrl" class="form-label">Book Image Url:</label>
                <input type="text" class="form-control" id="bImageUrl" placeholder="Enter Book Image URL" name="bookImage">
                </div>
                <button type="button" onClick="addBookTo()" class="btn btn-primary">Add Book</button>
            </form>
            `;
            document.getElementById("main-content").innerHTML = data;
        })
    
}

function addBookTo(){
    //alert("addBookTo() called");
    let newBook = {
        bookId: document.getElementById("bId").value,
        bookTitle: document.getElementById("bTitle").value,
        author: {
            authId: document.getElementById("bAuthor").value,
        } ,
        bookGenre: document.getElementById("bGenre").value,
        bookPrice: document.getElementById("bPrice").value,
        bookImageUrl: document.getElementById("bImageUrl").value

    }
    fetch("http://localhost:7777/api/books", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newBook)
    })
    .then((res)=>res.json())
    .then((response)=>bookList());
}

function authorList(){
    alert("Author List");
}

function authorAdd(){
    alert("Author Add");
}