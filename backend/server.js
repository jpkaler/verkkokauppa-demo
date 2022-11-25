const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const sqlite3 = require('sqlite3');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');

let app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Current session
app.use(
    session({
        name: "shopping-session",
        secret: process.env.VERKKOKAUPPA_SECRET,
        cookie:{ maxAge: 1000 * 60 * 60},
        resave: false,
        saveUnitialized: false,
        store: new SQLiteStore({ db: 'sessions.db', dir: './db' })
    })
)

app.use('/api/users', userRouter);

app.use('/api/verkkokauppa', productRouter);

let port = process.env.PORT || 3001;
app.listen(port);

console.log("Running in port",port);
