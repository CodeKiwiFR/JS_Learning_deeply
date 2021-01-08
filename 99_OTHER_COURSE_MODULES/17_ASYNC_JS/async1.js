/*
    Async JS
    03/01/2021
*/

const transition = () => {
    console.log("--------------------");
};

// // Understanding synchronous code execution
// // -> the browser will not wait for certain pieces of code to execute (non blocking code)
// // -> Then, we usually provide the asynchronous requst a callback function which is executed when the asynchrnous task is done
// const button = document.querySelector("button");
// const output = document.querySelector("p");

// const trackUserHandler = () => {
//     console.log("function");
// };
// // Our event listener will be a piece of asynchronous code because it won't be executed until the user clicks on the button
// button.addEventListener("click", trackUserHandler);

// // This code will be executed before any click on the button bucause this is blocking code and the event loop won't check for the message queue (sort of todo list) until the blocking code is executed
// let result = 0;
// for (let i = 0; i < 100000000; i++) {
//     result += i;
// }

// /*
//     This is the way the browser deals with longer taking operations.
//     When the JS engine detects asynchronous code, it will "let" the browser deal with this job.
//     When the browser job is done, the "JS engine todo queue" receives the callback to execute.
//     Then, when JS check for the todo queue, after having executed the main blocking code, it does the job from asynchrnous requests.
// */
// // We add two asynchronous tasks
// setTimeout(() => {
//     alert("Timer 2000");
// }, 2000);
// // The browser will send this todo task into the queue before the previous one because 500ms < 2000ms
// setTimeout(() => {
//     alert("Timer 500");
// }, 500);
// console.log("Timers running...");

/*
    EXECUTION ORDER
*/
const button = document.querySelector("button");
const output = document.querySelector("p");

const trackUserHandler = () => {
    // This is asynchronous code
    navigator.geolocation.getCurrentPosition(
        (posData) => {
            // This is useless but shows that we can have nested async requests
            setTimeout(() => {
                console.log(posData);
            }, 2000);
        },
        (error) => {
            console.log(error);
        }
    );
    // This will not be executed before the end of the main function code despite the zero timeout
    setTimeout(() => {
        console.log("Timeout 0 done!");
    }, 0);
    // This is executed first, no matter how much time the async request needs
    console.log("Getting position...");
};

button.addEventListener("click", trackUserHandler);
