/*
    PROJECT JS - Objects
    codeKiwi
    20/09/2020
*/

/* Selecting DOM elements */
const addMovieButton = document.getElementById("add-movie-btn");
const searchButton = document.getElementById("search-btn");
const filterInput = document.getElementById("filter-title");

/* Our variables */
const movies = [];

/* Just a function to test listeners */
const testFunc = () => console.log("test");

/* Render movies stored in our array into the DOM
    NB: in order to save time, we clear the list everytime
    we add a movie. That is not the best solution but it
    enables us to save time and focus on the core concept: objects
*/
const renderMovies = (filter = "") => {
    const movieList = document.getElementById("movie-list");

    // Clearing the list and managing its visibility
    if (movies.length === 0) {
        movieList.classList.remove("visible");
    } else {
        movieList.classList.add("visible");
    }
    movieList.innerHTML = "";

    // Filtering movies if necessary
    const filteredMovies = !filter
        ? movies
        : movies.filter((elt) =>
              elt.info.title.toLowerCase().includes(filter.toLowerCase())
          );

    // Putting every movie inside a <li> element and appending them to DOM list
    filteredMovies.forEach((movie) => {
        const movieElt = document.createElement("li");
        let text = movie.info.title + " - ";
        for (const key in movie.info) {
            // Extracting dynamic properties
            if (key !== "title") {
                text += key + ": " + movie.info[key];
            }
        }
        movieElt.textContent = text;
        movieList.append(movieElt);
    });
};

/* Dealing with the add movie button press */
const addMovieHandler = () => {
    const title = document.getElementById("title").value;
    const extraName = document.getElementById("extra-name").value;
    const extraValue = document.getElementById("extra-value").value;

    // Testing if values are empty -> Error
    if (title.trim === "" || extraName.trim === "" || extraValue === "") {
        alert("A field is missing!");
        return;
    }

    // Creating new movie object
    const newMovie = {
        info: {
            title,
            [extraName]: extraValue,
        },
        id: Math.random(),
    };

    // Adding movie to the movie array and rendering DOM
    movies.push(newMovie);
    renderMovies();
};

/* Searching function */
const searchMovieHandler = () => {
    const filterTitle = document.getElementById("filter-title").value;
    renderMovies(filterTitle);
};

/* Adding event listeners */
addMovieButton.addEventListener("click", addMovieHandler);
filterInput.addEventListener("keyup", searchMovieHandler);
searchButton.addEventListener("click", searchMovieHandler);

/* OTHER STUFF: Object copy and deep copy */
// const person = {
//     name: "Mad",
//     age: 29,
//     hobbies: ["Cooking", "Sports"],
// };
// const person2 = { ...person };
// const person3 = {
//     ...person,
//     age: 30,
//     hobbies: [...person.hobbies]
// };
// console.log(person, person2, person3);
// person.hobbies.push('Coding');
// console.log(person, person2, person3);

/* OTHER STUFF: Object destructuring */
// const person = {
//     info: {
//         name: 'Mad',
//         age: 29
//     },
//     job: 'No job'
// };
// // const { info } = person;
// // console.log(person);
// // console.log(info);
// // const { info, ...otherStuff } = person;
// // console.log(info);
// // console.log(otherStuff);
// const { info, job } = person;
// console.log(info);
// console.log(job);

/* OTHER STUFF: This key word */
// // // const person = {
// // //     info: {
// // //         name: 'Mad',
// // //         age: 29
// // //     },
// // //     job: 'No job',
// // //     getJob: function() {
// // //         return this.job.toUpperCase();
// // //     }
// // // };
// // const person = {
// //     info: {
// //         name: 'Mad',
// //         age: 29
// //     },
// //     job: 'No job',
// //     getJob() {
// //         return this.job.toUpperCase();
// //     }
// // };
// // console.log(person.getJob());
// // let { getJob } = person;
// // getJob = getJob.bind(person);
// // console.log(getJob());
// const person = {
//     info: {
//         name: 'Mad',
//         age: 29
//     },
//     job: 'No job',
//     getJob() {
//         return this.job.toUpperCase();
//     }
// };
// console.log(person.getJob());
// let { getJob } = person;
// console.log(getJob.call(person));
// console.log(getJob.apply(person));

/* OTHER STUFF: This in arrow functions VS. this in old style functions */
// // It works with arrow functions
// const team = {
//     name: "Top Team",
//     members: ["Madi", "Justi"],
//     getMembers() {
//         this.members.forEach((member) => {
//             console.log(`${member} - ${this.name}`);
//         });
//     }
// }
// team.getMembers();
// // It does not work with old style functions because of forEach callback
// const team = {
//     name: "Top Team",
//     members: ["Madi", "Justi"],
//     getMembers() {
//         this.members.forEach(function(member) {
//             console.log(`${member} - ${this.name}`);
//         });
//     }
// }
// team.getMembers();
// const { getMembers } = team;
// getMembers.call(team);

/* OTHER STUFF: getters and setters */
// const person = {
//     set name(val) {
//         console.log('Inside setter...');
//         if (val.trim() === "") {
//             this._name = "DEFAULT";
//             return;
//         }
//         this._name = val;
//     },
//     get name() {
//         console.log('Inside getter...');
//         return this._name.toUpperCase();
//     }
// };
// person.name = 'Madi';
// console.log(person.name);
