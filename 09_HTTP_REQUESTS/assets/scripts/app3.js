/*
    HTTP Requests -> Refactoring code
    05/01/2021
    -> Be careful with error management: xhr.onerror() only deals no response errors
    ->  We need to manage error status manually
*/

// Getting the page fetch button
const fetchButton = document
    .querySelector("#available-posts")
    .querySelector("button");

// Getting Add button
const postSection = document.querySelector("#new-post");
const addButton = postSection.querySelector("button");

// Getting the post list section
const listElement = document.querySelector(".posts");

// Send an HTTP request according to given method and url
const sendHttpRequest = (method, url, data = null) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.setRequestHeader("Content-type", "application/json");
        xhr.responseType = "json";
        xhr.open(method, url);
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                // We have no error
                resolve(xhr.response);
            } else {
                // Error case
                reject(new Error("Something went wrong!"));
            }
        };
        xhr.onerror = () => {
            // NB: this function will only be called if the server does not send any error. If the server returns an error (like 404), this won't be treated by our function
            reject(new Error("Failed to send request!"));
        };
        xhr.send(JSON.stringify(data));
    });
    return promise;
};

// Fetch all the API postsand putting them in our post list
const fetchPosts = async () => {
    try {
        const responseData = await sendHttpRequest(
            "GET",
            "https://jsonplaceholder.typicode.com/posts"
        );
        const postTemplate = document.querySelector("#single-post");

        // Putting all the posts in our template
        for (const post of responseData) {
            const postElement = document.importNode(postTemplate.content, true);
            postElement.querySelector(
                "h2"
            ).textContent = post.title.toUpperCase();
            postElement.querySelector("p").textContent = post.body;
            listElement.append(postElement);
        }
    } catch (error) {
        console.log(error.message);
    }
};

// Send posts to the server
const createPost = async (title, content) => {
    const userId = Math.random();
    const post = {
        title: title,
        body: content,
        userId: userId,
    };
    try {
        await sendHttpRequest(
            "POST",
            "https://jsonplaceholder.typicode.com/posts",
            post
        );
    } catch (error) {
        throw error;
    }
};

// Handling the add button click event
const addPostHandler = async (event) => {
    event.preventDefault();
    const title = postSection.querySelector("input");
    const content = postSection.querySelector("textarea");
    const postTitle = title.value;
    const postContent = content.value;

    // Dealing with empty fields
    if (postTitle.length === 0) {
        title.classList.add("error");
        setTimeout(() => {
            title.classList.remove("error");
        }, 1000);
        return;
    }
    if (postContent.length === 0) {
        content.classList.add("error");
        setTimeout(() => {
            content.classList.remove("error");
        }, 1000);
        return;
    }

    // Sending post to the server and clearing the fields
    try {
        await createPost(postTitle, postContent);
        const postTemplate = document.querySelector("#single-post");

        // Clearing fields
        title.value = "";
        content.value = "";

        // Putting the post in our post list
        const postElement = document.importNode(postTemplate.content, true);
        postElement.querySelector("h2").textContent = postTitle;
        postElement.querySelector("p").textContent = postContent;
        listElement.append(postElement);
    } catch (error) {
        console.log(error.message);
    }
};

// Handling the post delete button click event
const deletePostHandler = async (event) => {
    if (event.target.nodeName !== "BUTTON") {
        return;
    }
    try {
        await sendHttpRequest(
            "DELETE",
            "https://jsonplaceholder.typicode.com/posts/1"
        );
        event.target.parentNode.remove();
    } catch (error) {
        console.log(error.message);
    }
};

// Adding event listeners: fetch button, add buttons, delete button
fetchButton.addEventListener("click", fetchPosts);
addButton.addEventListener("click", addPostHandler);
listElement.addEventListener("click", deletePostHandler);
