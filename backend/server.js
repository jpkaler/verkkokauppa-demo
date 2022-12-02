const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3');
const productRouter = require('./routes/productRoutes');
const orderRouter = require('./routes/orderRoutes');

let app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// App Database
const db = new sqlite3.Database('../mockData.db');

// Current session
app.use(
    session({
        name: "shopping-session",
        secret: "testisecret",
        cookie:{ maxAge: 1000 * 60 * 60},
        resave: false,
        saveUnitialized: false,
        store: new SQLiteStore({ db: 'sessions.db', dir: '../' })
    })
)

// Passport JS Middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport Strategy
passport.use('local-login', new LocalStrategy({
    passReqToCallback: true
    },
    (req, username, password, done) => {
        db.get('SELECT * FROM users WHERE username=$username', {
            $username: username
        }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: "Username not in database"});
            }
            bcrypt.compare(password, user.password, (err, match) => {
                if (err) {
                    console.log(`Comparing passwords resulted in error: ${err}`);
                    return done(err);
                }
                if (!match) {
                    return done(null, false, {message: "Wrong password!"});
                }
                return done(null, user);
            })
        })
    }
))

passport.serializeUser((user, done) => {
    done(null, {
        id: user.ID,
        username: user.username
    });
})

passport.deserializeUser((user, done) => {
    db.get('SELECT * FROM users WHERE ID=$id', {
        $id: user.id
    }, (err, user) => {
        if (err) {
            return done(err);
        }
        return done(null, user);
    })
})


// Password hashing function
const passwordHash = async (password, saltRounds) => {
    try {
        // Salting initial password to make hashed password harder to crack
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.log(`Server responded with error ${error}: ${error.message}`);
    }
    return null;
}

// POST - login -> tarkistetaan onnistuuko login
app.post("/api/users/login", passport.authenticate('local-login', { failureRedirect: "/" }),
    (req, res) => {
        console.log("User:", req.user);
        console.log("Session:", req.session);
        let admin = (req.user.admin === 1);
        res.status(200).json({username: req.user.username, admin: admin});
    })


// POST - Register -> rekisteröidään käyttäjätili
app.post("/api/users/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({message: "Anna käyttäjätunnus ja salasana"});
    } 
    
    const hash = await passwordHash(password, 8);

    db.run('INSERT INTO users (username, password, admin) VALUES ($username, $hash, 0)', {
        $username: username,
        $hash: hash
    }, (err) => {
        if (err) {
            return res.status(400).json({message: `Käyttäjätunnus on varattu`});
        } else {
            return res.status(201).json({message: "User registered!"});
        }
    })
})

// POST - Logout -> poistaa user-objektin passport-objektista
app.post("/api/users/logout", (req, res, next) => {
    if (req.user) {
        req.logout((err) => {
            if (err) {
                console.log("logout error")
                return next(err);
            }
        });
        return res.status(200).json({message: "Logout successful"});
    } else {
        return res.status(404).json({message: "No user logged in currently."});
    }
})

// GET - failureRedirect
app.get("/api/users", (req,res) => {
    return res.status(401).json({message: "Login failed! Check username and password"});
})

app.use("/api/verkkokauppa", productRouter);
app.use("/api/orders", orderRouter);

let port = process.env.PORT || 3001;
app.listen(port);

console.log("Running in port",port);
