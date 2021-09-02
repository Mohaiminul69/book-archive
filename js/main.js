document.getElementById("searchBtn").addEventListener("click", () => {
  getInputText();
});
document.getElementById("searchInput").addEventListener("keyup", (e) => {
  if (e.key === "Enter") getInputText();
});

const getInputText = () => {
  const inputText = document.getElementById("searchInput").value;
  document.getElementById("searchInput").value = "";
  loadingToggler("block");
  //   searchResultCleaner("none");
  getBooks(inputText);
};
const loadingToggler = (displayClass) => {
  document.getElementById("loadingBtn").style.display = displayClass;
};
const searchResultCleaner = (displayClass) => {
  document.getElementById("book-list").style.display = displayClass;
};

const getBooks = async (searchText) => {
  const url = `http://openlibrary.org/search.json?q=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayBooks(data.docs);
};

const displayBooks = (books) => {
  books.forEach((book) => {
    console.log(book);
    const bookList = document.getElementById("book-list");
    const div = document.createElement("div");
    div.classList.add("col", "rounded-3", "py-3", "mt-2");
    div.innerHTML = `
            <div class="custom-card">
            ${
              book.cover_i
                ? `<img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="Image Not Found" />`
                : "Image Not Found"
            }              
              <div class="card-body d-flex flex-column justify-content-end">
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
  //   searchResultCleaner("block");
};
