document.getElementById("searchBtn").addEventListener("click", () => {
  getInputText();
});
document.getElementById("searchInput").addEventListener("keyup", (e) => {
  if (e.key === "Enter") getInputText();
});

const getInputText = () => {
  const inputText = document.getElementById("searchInput").value;
  document.getElementById("searchInput").value = "";
  searchResultCleaner("none");
  loadingToggler("block");
  getBooks(inputText);
};
const loadingToggler = (displayClass) => {
  document.getElementById("loadingBtn").style.display = displayClass;
};
const searchResultCleaner = (displayClass) => {
  document.getElementById("book-list-container").style.display = displayClass;
};

const getBooks = async (searchText) => {
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayBooks(data);
};

const displayBooks = (data) => {
  const books = data.docs;
  const numberofBooksFound = data.numFound;
  const bookList = document.getElementById("book-list");
  const h5 = document.getElementById("numberofBooks");
  if (numberofBooksFound > 100) {
    h5.innerHTML = `Showing <span class="text-blue">100</span> out of <span class="text-blue">${numberofBooksFound}</span> Found Books`;
  } else if (numberofBooksFound === 1) {
    h5.innerHTML = `Showing <span class="text-blue">${numberofBooksFound}</span> Book in the List`;
  } else if (numberofBooksFound === 0) {
    h5.innerHTML = `<span class="text-danger">Sorry no books found by this name . . .</span>`;
  } else {
    h5.innerHTML = `Showing <span class="text-blue">${numberofBooksFound}</span> Books in the List`;
  }
  bookList.textContent = "";
  books.forEach((book) => {
    console.log(book);
    const div = document.createElement("div");
    div.classList.add("col", "rounded-3", "py-3", "mt-2");
    div.innerHTML = `
            <div class="card h-100">
            ${
              book.cover_i
                ? `<img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid card-img-top" alt="Image Not Found" />`
                : `<img src="./img/image-not-found-scaled-1150x647.png" class="img-fluid card-img-top" />`
            }              
              <div class="card-body d-flex flex-column justify-content-start">
                <h5 class="card-title">Book Name: ${book.title}</h5>
                <h5 class="card-title">Author Name: ${
                  book.author_name ? book.author_name : "Author not found"
                }</h5>
                <h5 class="card-title">Publisher Name: ${
                  book.publisher ? book.publisher[0] : "Not Found"
                }</h5>
                <h5 class="card-title">Publish Year: ${
                  book.first_publish_year
                    ? book.first_publish_year
                    : "Publish Date Not Available."
                }</h5>
              </div>
            </div>
    `;
    bookList.appendChild(div);
  });
  loadingToggler("none");
  searchResultCleaner("block");
};
