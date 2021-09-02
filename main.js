search = () => {
    const inputField = document.getElementById("inputField");
    const bookCard = document.getElementById("bookCard");
    const totalFound = document.getElementById("found");
    const emptyInput = document.getElementById("emptyInput");
    const error = document.getElementById("error");
  
    const inputValue = inputField.value;
    bookCard.textContent = "";
    totalFound.innerText = "";
    if (inputValue === "") {
        spinner("hidden");
      emptyInput.style.display = "block";
      error.style.display = "none";
      totalFound.innerText = "";
      bookCard.textContent = "";
    } else {
        spinner("visible");
      emptyInput.style.display = "none";
      //  Book url
      const url = `https://openlibrary.org/search.json?q=${inputValue}`;
  
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          displayBook(data);
        });
    }
    inputField.value = "";
  };
  
  displayBook = (data) => {
    const totalFound = document.getElementById("found");
    totalFound.innerText = `Almost ${data.numFound} Books Are Avaiable.`;
  
    console.log("Data", data); 
  
    // getElementById('cardItem');
  
    const error = document.getElementById("error");
    if (data.numFound === 0) {
      totalFound.innerText = "";
      error.style.display = "block";
      spinner("hidden");
    } else {
      error.style.display = "none";
      const bookCard = document.getElementById("bookCard");
  
      data?.docs.forEach((item) => {
        const div = document.createElement("div");
        console.log(item);
        //  Image show
        item?.cover_i
          ? (imgUrl = `https://covers.openlibrary.org/b/id/${item?.cover_i}-M.jpg`)
          : (imgUrl = "images/404.png");
  
        // Author
        item?.author_name ? (auth = item?.author_name.join()) : (auth = "Not available");
        // Publisher
        item?.publisher[0] ? (publisher = item?.publisher[0]) : (publisher = "Not available");
        // Publish date
        item?.publish_date[0] ? (publishDate = item?.publish_date[0]) : (publishDate = "Not available");
  
        console.log(item?.title);
  
        div.innerHTML = `
         <div class="col">
             <div class="card">
                  <img height='450px'  src=${imgUrl}  class="card-img-top" alt="...">
                 <div class="card-body">
                     <h5 id="author" class="card-title">${item?.title}</h5>
                     <h6 class="card-text">Author:  <span class ="text-secondary"> ${auth} </span></h6>
                     <h6 class="card-text">Publisher: <span class ="text-secondary"> ${publisher} </span> </h6>
                     <h6 class="card-text">Published: <span class ="text-secondary">  ${publishDate} </span> </h6>
  
                 </div>
             </div>
         </div>
         `;
        bookCard.appendChild(div);
        spinner("hidden");
      });
    }
  };
  
  // Spinner Function
  spinner = (property) => {
    const spinner = document.getElementById("spinner");
    spinner.style.visibility = property;
  };
  