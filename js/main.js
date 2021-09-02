/*
<-------------------- Event Listeners Calling Functions -------------------->
<-------------------- Event Listeners Calling Functions -------------------->
<-------------------- Event Listeners Calling Functions -------------------->
*/

document.getElementById("searchBtn").addEventListener("click", () => {
  getInputText();
});
document.getElementById("searchInput").addEventListener("keyup", (e) => {
  if (e.key === "Enter") getInputText();
});

/*
<-------------------- Event Listeners End -------------------->
*/

/*
<-------------------- Getting Input By InputText -------------------->
<-------------------- Getting Input By InputText -------------------->
<-------------------- Getting Input By InputText -------------------->
*/

const getInputText = () => {
  const inputText = document.getElementById("searchInput").value;
  /*
<-------------------- Empty Input Error Handling -------------------->
*/
  if (inputText === "") {
    const bookList = document.getElementById("book-list");
    const h5 = document.getElementById("numberofBooks");
    bookList.textContent = "";
    h5.innerHTML = `<span class="text-danger">Please enter a valid input . . .</span>`;
    return;
  }
  document.getElementById("searchInput").value = "";
  searchResultCleaner("none");
  loadingToggler("block");
  getBooks(inputText);
};

/*
<-------------------- Loading Spinner & Clearing Book List -------------------->
<-------------------- Loading Spinner & Clearing Book List -------------------->
<-------------------- Loading Spinner & Clearing Book List -------------------->
*/

const loadingToggler = (displayClass) => {
  document.getElementById("loadingBtn").style.display = displayClass;
};
const searchResultCleaner = (displayClass) => {
  document.getElementById("book-list-container").style.display = displayClass;
};

/*
<-------------------- Fetching the list of Books by Async Await -------------------->
<-------------------- Fetching the list of Books by Async Await -------------------->
<-------------------- Fetching the list of Books by Async Await -------------------->
*/

const getBooks = async (searchText) => {
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayBooks(data);
};

/*
<-------------------- Displaying the Books in the UI -------------------->
<-------------------- Displaying the Books in the UI -------------------->
<-------------------- Displaying the Books in the UI -------------------->
*/

const displayBooks = (data) => {
  const books = data.docs;
  const numberOfBooksFound = data.numFound;
  const bookList = document.getElementById("book-list");
  const h5 = document.getElementById("numberofBooks");
  /*
<-------------------- Start of Conditions for the number of books to be found -------------------->
*/
  if (numberOfBooksFound > 100) {
    h5.innerHTML = `Showing <span class="text-green">100</span> books in the list out of <span class="text-green">${numberOfBooksFound}</span> of the founded results.`;
  } else if (numberOfBooksFound === 1) {
    h5.innerHTML = `Showing <span class="text-green">${numberOfBooksFound}</span> book in the list from the founded result.`;
  } else if (numberOfBooksFound === 0) {
    h5.innerHTML = `<span class="text-danger">Sorry no books were found by this name . . .</span>`;
  } else {
    h5.innerHTML = `Showing <span class="text-green">${numberOfBooksFound}</span> books in the list from the founded results.`;
  }
  /*
<-------------------- End of Conditions for the number of books to be found -------------------->
*/
  bookList.textContent = "";
  books.forEach((book) => {
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
                <table class="table">
                  <tbody>
                    <tr class="fw-bold">
                      <td class="w-43">Book Name :</td>
                      <td class="text-grey text-capitalize">${
                        book.title ? book.title : "Title Not Found"
                      }</td>
                    </tr>
                    <tr class="fw-bold">
                      <td class="w-43">Author Name :</td>
                      <td class="text-grey text-capitalize">${
                        book.author_name
                          ? book.author_name[0]
                          : "Author not found"
                      }
                      </td>
                    </tr>
                    <tr class="fw-bold">
                      <td class="w-43">Publisher Name :</td>
                      <td class="text-grey text-capitalize">${
                        book.publisher
                          ? book.publisher[0]
                          : "Publisher Not Found"
                      }
                      </td>
                    </tr>
                    <tr class="fw-bold">
                      <td class="w-43">Publish Year :</td>
                      <td class="text-grey text-capitalize">
                        ${
                          book.first_publish_year
                            ? book.first_publish_year
                            : "Publish Date Not Available."
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
    `;
    bookList.appendChild(div);
  });
  loadingToggler("none");
  searchResultCleaner("block");
};
