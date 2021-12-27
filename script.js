// Selectors
const form = document.getElementById("form");
const bookInput = document.getElementById("bookInput");
const booksLength = document.getElementById("booksLength");
const spinner = document.getElementById("spinner");
const booksContainer = document.getElementById("booksContainer");

// Fetching books data from API
function getBooks(term) {
  spinner.classList.remove("hide");
  booksContainer.innerHTML = "";
  booksLength.innerHTML = "";

  fetch(`https://openlibrary.org/search.json?q=${term}`)
    .then((res) => res.json())
    .then((data) => {
      showBooks(data.docs);
      spinner.classList.add("hide");
    });
}

// Add books to the DOM
function showBooks(data) {
  booksContainer.innerHTML = "";
  booksLength.innerHTML = `Number of books found: ${data.length}`;

  data.forEach((book) => {
    booksContainer.innerHTML += `
      <div class="col col-md-4 col-lg-3 mb-1">
        <div class="card">
            <img class="img-fluid"  onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1532037001556-decb941504a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80'"  src="https://covers.openlibrary.org/b/id/${
              book.cover_i
            }.jpg" class="card-img-top" alt="book" />
            <div class="card-body">
                <h3 class="card-title"><b>Title</b>:${book.title}</h3>
                <p><b>Author name</b>:${book.author_name || ""}</p>
                <p><b>Publisher</b>:${book.publisher || ""}</p>
                <p><b>Publishing date</b>:${book.first_publish_year || ""}</p>
            </div>
        </div>
    </div>
    `;
  });
}

// Event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!bookInput.value) {
    alert("Invalid input.");
  } else {
    getBooks(bookInput.value.trim());
    bookInput.value = "";
  }
});
