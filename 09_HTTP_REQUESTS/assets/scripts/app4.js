/*
    HTTP Requests -> using fetch API
    05/01/2021
    -> NB: fetch API is not supported by all the browsers and for this reason we used XMLHttpRequests earlier in this module (thank you IE old shi*)
    -> Sometimes, fetch() can lead to ugly erro handling
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
const sendHttpRequest = async (method, url, data) => {
    // Fetch is natively a promise: we don't need to create our own promise
    try {
        let res = await fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                // In order to send extra data (like authentication data for example)
                "Content-type": "application/json",
            },
        });
        if (res.status >= 200 && res.status < 300) {
            return res.json(); // We need to turn the response into a JS readable JSON data
        } else {
            // Sometimes, there are information in the response that we could analyse in case of error -> we need to convert our response to JSON in order to explore it!
            let resError = await res.json();
            console.log(resError);
            throw new Error("An error occured -> Server side");
        }
    } catch (error) {
        throw error;
    }
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
