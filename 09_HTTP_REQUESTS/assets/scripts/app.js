/*
    HTTP Requests
    05/01/2021
*/

const transition = () => {
    console.log("--------------------");
};

/* ************************************************** */
// First GET request
// JSON and parsing data -> JS Object Notation
const xhr = new XMLHttpRequest(); // We create the request

// xhr.responseType = 'json'; // This enables us to retrieve a JS normal array instead of JSON data and avoids us the JSON.parse() method call

xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts'); // Configuring the request we want to send
// We could add an event listener but IE does not support this operation. Then we use onload property
xhr.onload = () => {
    // console.log(xhr.response); // NB: here the response is not a native JS array but JSON data!!! We cannot do the same things with it.
    const listOfPosts = JSON.parse(xhr.response); // We convert the JSON Data into a JS array
    console.log(listOfPosts);
};
xhr.send(); // We send the request and we can see it in the developper tools