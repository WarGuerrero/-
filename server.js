const express = require("express");
//Para construir las Rest apis
const bodyParser = require("body-parser");
//Ayuda a traducir las request y crear req.body objeto
const cors = require("cors");
//provee middleware a Express para habilitar CORS con varias opciones

const app = express();

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
//parse requests of content-type - application/json

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.json());
//parse rquests of content-type - application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models/index");
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

require("./app/routes/task.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});