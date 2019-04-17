var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();
var port = process.env.PORT || 3000;

app.use('/assets',express.static(`${__dirname}/public`))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Call bootstrap 
app.use('/bootstrap',express.static(`${__dirname}/node_modules/bootstrap/dist`))
app.use('/popper',express.static(`${__dirname}/node_modules/popper.js/dist`))
app.use('/jquery',express.static(`${__dirname}/node_modules/jquery/dist`))
// call font-awesome
app.use('/fontawesome', express.static(`${__dirname}/node_modules/@fortawesome/fontawesome-free`))
//call angularjs
app.use('/angular',express.static(`${__dirname}/node_modules/angular`))
//call angular-xeditable
app.use('/editable',express.static(`${__dirname}/node_modules/angular-xeditable/dist`))


app.use(morgan("dev"));

// Call API
var SetupControllers = require('./api/controllers/setup');
var AllControllerstodo = require('./api/controllers/todocontrollers');


// Connection DB
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var __data = 'mongodb://127.0.0.1/nodejs_todo';
mongoose.connect(__data,{useNewUrlParser: true } ).then(()=>
{
    console.log("Database is connected");
});

console.log(app.get('env'))

mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error',console.error.bind(console,'Can not connect Database'));

app.set('view engine', 'pug')

SetupControllers(app)
AllControllerstodo(app);

app.get('/',(req,res) =>
{
    res.render('index',{title: "Home"});
})

app.listen(port , () =>
{
    console.log("App is listening on Port: " + port);
})