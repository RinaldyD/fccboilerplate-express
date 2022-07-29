let express = require('express');
let app = express();
require('dotenv').config();

app.use((req, res, next) => {
    var string = req.method + " " + req.path + " - " + req.ip;
    console.log(string);
    next();
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.use(express.static(__dirname + "/public"));
app.use("/public", express.static(__dirname + "/public"));

app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.send({
        time: req.time
    });
});

app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({
        echo: word
    });
});

app.route("/name").get((request, response) => {
    let string = request.query.first + " " + request.query.last;
    response.json({
        name: string
    });
}).post((request, response) => {
    let string = request.body.first + " " + request.body.last;
    response.json({
        name: string
    })
});

app.get("/json", (req, res) => {
    let jsonResponse = { "message": "Hello json" };
    if (process.env.MESSAGE_STYLE === "uppercase") {
        jsonResponse.message = jsonResponse.message.toUpperCase();
    }
    res.json(jsonResponse);
});


module.exports = app;