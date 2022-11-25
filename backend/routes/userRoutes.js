const express = require('express');
const sqlite3 = require('sqlite3');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

userRouter = express.Router();

// Product Database
const db = new sqlite3.Database('./db/products.db');


// Passport JS Middleware
userRouter.use(passport.initialize());
userRouter.use(passport.session());

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
    done(null, user.ID);
})

passport.deserializeUser((id, done) => {
    db.get('SELECT * FROM users WHERE ID=$id', {
        $id: id
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
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.log(`Server responded with error ${error}: ${error.message}`);
    }
    return null;
}

// POST - login -> tarkistetaan onnistuuko login
userRouter.post("/login", passport.authenticate('local-login', { failureRedirect: "/" }),
    (req, res) => {
        console.log("User:", req.user);
        let admin = (req.user.admin === 1);
        res.status(200).json({username: req.user.username, admin: admin});
    })


// POST - Register -> rekisteröidään käyttäjätili
userRouter.post("/register", async (req, res) => {
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
userRouter.post("/logout", (req, res, next) => {
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
userRouter.get("/", (req,res) => {
    return res.status(401).json({message: "Login failed! Check username and password"});
}) 

module.exports = userRouter;