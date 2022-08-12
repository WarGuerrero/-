const express = require("express");
//Para construir las Rest apis
const bodyParser = require("body-parser");
//Ayuda a traducir las request y crear req.body objeto
const cors = require("cors");
//provee middleware a Express para habilitar CORS con varias opciones

const app = express();

var corsOptions = {
    origin: "http://localhost:3000/"
};

app.use(cors(corsOptions));
//parse requests of content-type - application/json

app.use(bodyParser.json());
//parse rquests of content-type - application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

//simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to War application."});
});

require("./app/routes/task.routes.js");

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});