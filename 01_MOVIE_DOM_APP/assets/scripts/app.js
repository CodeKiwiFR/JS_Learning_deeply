/*
    PROJECT JS - DOM Introduction
    codeKiwi
    18/09/2020
*/

const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const modalCancelButton = addMovieModal.lastElementChild.firstElementChild;
const modalAddButton = addMovieModal.lastElementChild.lastElementChild;
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const listRoot = document.getElementById("movie-list");
const deleteModal = document.getElementById("delete-modal");
const deleteCancelButton = deleteModal.lastElementChild.firstElementChild;
const deleteYesButton = deleteModal.lastElementChild.lastElementChild;

const movies = [];
let indexToDelete = -1;

/* Handling delete cancel button click */
const deleteCancelHandler = () => {
    toggleDeleteModal();
    indexToDelete = -1;
};

/* Handling delete confirm button click */
const deleteConfirmHandler = () => {
    if (indexToDelete !== -1) {
        movies.splice(indexToDelete, 1);
        listRoot.children[indexToDelete].remove();
        indexToDelete = -1;
        updateUI();
    }
    toggleDeleteModal();
};

/* Handling movie element click - Deleting the movie */
const deleteMovieHandler = (movieId) => {
    let movieIndex = 0;

    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    indexToDelete = movieIndex;
    toggleDeleteModal();
};

/* Adding a new movie to the UI */
const renderNewMovieElement = (id, title, imageUrl, rating) => {
    // Creating the element
    const newMovieElement = document.createElement("li");
    newMovieElement.className = "movie-element";
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5</p>
        </div>
    `;

    // Adding an event listener
    newMovieElement.addEventListener(
        "click",
        deleteMovieHandler.bind(this, id)
    );
    listRoot.append(newMovieElement);
};

/* Managing the UI title box visibility */
const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = "block";
    } else {
        entryTextSection.style.display = "none";
    }
};

/* Dealing with movie modal visibility */
const toggleMovieModal = () => {
    addMovieModal.classList.toggle("visible");
    toggleBackdrop();
    cleanModalInputs();
};

/* Dealing with delete modal visibility */
const toggleDeleteModal = () => {
    deleteModal.classList.toggle("visible");
    toggleBackdrop();
};

/* Dealing with backdrop visibility */
const toggleBackdrop = () => {
    backdrop.classList.toggle("visible");
};

/* Dealing with backdrop click */
const backdropClickHandler = () => {
    if (deleteModal.classList.contains("visible")) {
        toggleDeleteModal();
    }
    if (addMovieModal.classList.contains("visible")) {
        toggleMovieModal();
    }
};

/* Cleaning the modal inputs */
const cleanModalInputs = () => {
    for (const input of userInputs) {
        input.value = "";
    }
};

/* Dealing with movie addition */
const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    // Checking for errors
    if (
        titleValue.trim() === "" ||
        imageUrlValue.trim() === "" ||
        ratingValue.trim() === "" ||
        +ratingValue < 1 ||
        +ratingValue > 5
    ) {
        alert("Please enter valid values (rating between 1 and 5).");
        return;
    }

    // Adding new movie
    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue,
    };

    movies.push(newMovie);
    toggleMovieModal();
    cleanModalInputs();
    updateUI();
    renderNewMovieElement(
        newMovie.id,
        newMovie.title,
        newMovie.image,
        newMovie.rating
    );
};

/* Adding all the event listeners */
startAddMovieButton.addEventListener("click", toggleMovieModal);
modalCancelButton.addEventListener("click", toggleMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
modalAddButton.addEventListener("click", addMovieHandler);
deleteCancelButton.addEventListener("click", deleteCancelHandler);
deleteYesButton.addEventListener("click", deleteConfirmHandler);
