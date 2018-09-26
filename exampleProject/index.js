'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 5656;
const session = require('express-session');
const flash = require('express-flash');
const Factory = require('./Factory');
const router = require('./routes');

// DB Setup
const {
    Pool
} = require('pg');
// Heroku pool
let useSSL = false;
let local = process.env.LOCAL || false;
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres@127.0.0.1:5432/app';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});
const factoryInstance = Factory(pool);
const route = router(factoryInstance);
// app use
app.use(session({
    secret: 'Tshimugaramafatha'
}));
app.use(flash());
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

