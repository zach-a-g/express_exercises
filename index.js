`use strict`

// 1) Create an Express App with a route at / that returns "Hello World."

const http = require(`http`);
const hostname = "127.0.0.1";
const port = 3000;

const express = require(`express`);
const app = express();


const server = http.createServer(app);

server.listen(port, hostname, function() {
    console.log(`Server is running at http://${hostname}:${port}`);
});

const rootController = function(request, response) {
    const snippet = `<h1>Hello World!</h1>`;
    response
        .status(200)
        .send(snippet)
        .end();
}



// 2) Create an Express app with the following routes:
//      Route / that returns the string "Hello World!"
//      Route /cats that returns the string "Meow!"
//      Route /dogs that returns the string "Woof!"
//      Route /cats_and_dogs that returns the string "Dogs and cats living together...mass hysteria!!"

const dogsAndCats = require(`./dogsAndCats`);

const dogsCatsController = function(request, response) {
    let snippet = `<h1>Select Route</h1>`;

    console.log(request.params);

    if (request.params.handle === undefined) {
        dogsAndCats.map(function(select) {
            snippet += `<p><a href='./select/${select.handle}'>${select.name}</a></p>`;
        })
    }
    if (request.params.handle !== undefined) {
        dogsAndCats.map(function(select) {
            if (request.params.handle === select.handle) {
                snippet += `<p>${select.name} says ${select.quote}!</p>`;
            } else {
                return null;
            }
        })
    }
    response
        .status(200)
        .send(snippet)
        .end();
}

app.get(`/`, rootController);
app.get(`/select/:handle?`, dogsCatsController);