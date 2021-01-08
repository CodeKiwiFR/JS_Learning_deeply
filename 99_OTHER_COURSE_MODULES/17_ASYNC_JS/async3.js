/*
    Async JS
    04/01/2021
*/

/*
    Async/Await
    WARNING: await can make us think that we are changing the way JS works
    It looks like we are forcing "blocking code" creation.
    THAT'S WRONG!!!
    JS works the same way and async/await is just another way of writing promises
    It saves code but works the same way than then blocks!
    For error handling, use try/catch block!
*/

const button = document.querySelector("button");
const output = document.querySelector("p");

// setTimeout promise version
const setTimer = (duration) => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Timeout done!");
        }, duration);
    });
    return promise;
};

// navigator.geolocation.getCurrentPosition promise version
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

// Method called when clicking html button -> get user position
// When a function has the async keyword in front of it, it automatically returns a promise
const trackUserHandler = async () => {
    let posData;
    let timerData;

    try {
        posData = await getPosition();
        timerData = await setTimer(1000);
        console.log(timerData, posData);
    } catch (error) {
        console.log(error);
    }
};

button.addEventListener("click", trackUserHandler);

/*
    What is better between raw promises and async/await?
    There's no better option. Async/Await can sometimes be more confusing
    because it looks like it blocks execution but this is wrong, it juste
    hides the normal promise structure.

    Async/Await can only be used inside of functions whereas promises
    and then chains can be used everywhere.

    Finally, Async/Await makes the function do the things step by step
    and it looks like we are dealing with blocking code.
    We need to be careful about this.
*/