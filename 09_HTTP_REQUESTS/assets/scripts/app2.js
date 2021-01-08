/*
    HTTP Requests -> Sending a requst asyncly
    05/01/2021
*/

const transition = () => {
    console.log("--------------------");
};

const fetchButton = document
    .querySelector("#available-posts")
    .querySelector("button");

/* ************************************************** */
// Promisifying our request
const getPosts = () => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
        xhr.onload = () => {
            resolve(xhr.response);
        };
        xhr.send();
    });
    return promise;
};

/* ************************************************** */
// Our HTML file will output the server posts we got -> a template is on our html page and an ul will receive the elements
fetchButton.addEventListener("click", () => {
    getPosts()
        .then((response) => {
            const listElement = document.querySelector(".posts");
            const postTemplate = document.querySelector("#single-post");

            // Putting all the posts in our template
            for (const post of response) {
                const postElement = document.importNode(
                    postTemplate.content,
                    true
                );
                postElement.querySelector(
                    "h2"
                ).textContent = post.title.toUpperCase();
                postElement.querySelector("p").textContent = post.body;
                listElement.append(postElement);
            }

            // Adding the delete button event listener -> Using bubbling (and not capturing capturing) in order to add an event listener to the container and not to all the buttons
            listElement.addEventListener("click", (event) => {
                if (event.target.nodeName !== "BUTTON") {
                    return;
                }
                event.target.parentNode.remove();
            });
        })
        .catch((error) => {
            console.log(error);
        });
});
