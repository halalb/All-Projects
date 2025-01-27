var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session'); // Add this line to use session

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'appuser',
//     password: 'app2027',
//     database: 'taskhive'
// });

// db.connect((err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('Connected to database');
// });

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } 
}));

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

// Include routes
require('./routes.js')(app);

app.listen(port, () => console.log(`Calendar app listening on port ${port}!`));
