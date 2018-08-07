var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var sass = require('node-sass-middleware');
var validator = require('express-validator');
// var cookieSession = require('cookie-session');
var session = require('express-session');

module.exports = function() {
    var app = express();

    //Check Production or development ------------------>
    if (process.env.NODE_ENV === 'development') {
        //Use morgan debugging
        app.use(morgan('dev'));
    }
    else {
        //Compress Respond
        app.use(compression);
    }
    // ------------------------------------------------->

    //Include Cookie-session
    // app.use(cookieSession({
    //     name: 'session',
    //     keys: ['secret_key1', 'secret_key2']
    // }));

    /*Include express-session Collect in Memory 
    but it's can store add MongoDB or Redis etc.*/
    app.use(session({
        secret: 'session',
        resave: false,
        saveUninitialized: true,
    }));
    // -------------------------------------------------->

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    // Include Express validator
    app.use(validator());

    //Include Jade frameworks
    app.set('views', './app/views');
    app.set('view engine', 'jade');

    //Include index route
    require('../app/routes/index.routes')(app);
    require('../app/routes/user.routes')(app);

    //Include SASS
    app.use(sass({
        src: './sass',
        dest: './public/css',
        outputStyle: 'compressed',
        prefix: '/css',
        indentedSyntax: true, //For SASS
        debug: true
    }))

    //This is load static file such as png css
    app.use(express.static('./public'));

    return app;
};