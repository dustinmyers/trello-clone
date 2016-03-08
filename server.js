//These are your imports. We are missing express - add it at the top of the list

var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
var mongoose = require('mongoose');

//var app and var port will go here:


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: 'carpediem',
    saveUninitialized: false,
    resave: false
}));

var isAuthenticated = function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        return res.status(403).send('Please login first')
    }
}


/**************** API Controller *************/
var UserCtrl = require('./api/controllers/UserCtrl.js');
var ListCtrl = require('./api/controllers/ListCtrl.js')


/**************** API *************/

app.post('/auth/login', UserCtrl.login);

app.get('/auth/logout', UserCtrl.logout);

app.get('/api/getLists', isAuthenticated, ListCtrl.getLists)

app.post('/api/addList', isAuthenticated, ListCtrl.addList);

app.post('/api/deleteList', isAuthenticated, ListCtrl.deleteList);

app.post('/api/addCard', isAuthenticated, ListCtrl.addCard);

app.post('/api/deleteCard', isAuthenticated, ListCtrl.deleteCard);

app.post('/api/moveCard', isAuthenticated, ListCtrl.moveCard);

/************ END API *************/


/*************** DB ***************/
var mongoUri = 'mongodb://localhost:27017/betterTodo';
mongoose.connect(mongoUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
    console.log('connected to db at ' + mongoUri)
});

// Code for your app.listen() here:

