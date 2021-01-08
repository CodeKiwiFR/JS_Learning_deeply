/*
    Async JS
    04/01/2021
*/

/*
    Promise.all() / Promise.race()
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

// First, let's imagine we just want the fastest promise to be executed
// NB: the promises are both executed but the slowest result is ignored
Promise.race([getPosition(), setTimer(1000)])
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });

// Then, we want the then block to execute only when both promises are done
// The then arg is an array composed of promise results
// If one promise fails, all will cancel everything all or none
Promise.all([getPosition(), setTimer(1000)])
    .then((result) => {
        console.log(`First promise result: ${result[0]}`);
        console.log(`Second promise result: ${result[1]}`);
    })
    .catch((error) => {
        console.log(error);
    });

// Here, all the promises are executed no matter the errors and we get a detailed array about execution
Promise.allSettled([getPosition(), setTimer(1000)]).then((result) => {
    console.log(result);
});
