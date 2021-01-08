/*
    Async JS
    04/01/2021
*/

// Getting started with promises -> callback hell is really difficult to maintain and debug because it is composed of nested callbacks
// This is the reason why we invented Promises
const button = document.querySelector("button");
const output = document.querySelector("p");

// Here we will promisify the browser API setTimeout
const setTimer = (duration) => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Done!");
        }, duration);
    });
    return promise;
};

// Here we promisify the browser API navigator.geolocation.getCurrentPosition method
const getPosition = () => {
    const promise = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (posData) => {
                resolve(posData);
            },
            (error) => {
                reject(error);
            }
        );
    });
    return promise;
};

// We use our promise inside of our old async1.js function
// We use promise chaining in order to avoid nested callabacks and confusion
const trackUserHandler = () => {
    let positionData;

    getPosition()
        .then((posData) => {
            positionData = posData;
            return setTimer(2000);
        })
        .then((data) => {
            console.log(data, positionData);
        })
        .catch((error) => {
            // NB: the catch block will be called if one of the promises from the top chain fails
            // WARNING: But the then block located after the catch will be executed!!!
            // We can structure our chain as we want :)
            console.log("ERROR");
            console.log(error);
            return ("There was an error");
        })
        .then((data) => {
            console.log(data + ". But we are in the next then block!");
        });
    setTimer(1000).then((data) => {
        console.log("Timeout 0 done!");
    });
    console.log("Getting position...");
};

button.addEventListener("click", trackUserHandler);
