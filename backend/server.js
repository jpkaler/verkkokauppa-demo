const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3');

let app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Product Database
const db = new sqlite3.Database('./db/products.db');

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
app.post("/api/users/login", passport.authenticate('local-login', { failureRedirect: "/" }),
    (req, res) => {
        console.log("User:", req.user);
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

// Admin middleware
const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({message: "You do not have permission to do this."});
    } else if (req.user.admin !== 1) {
        return res.status(401).json({message: "You do not have permission to do this."});
    } else {
        next();
    }
}

// GET -> Kaikki tuotteet hakuehdon mukaan
app.get("/api/verkkokauppa/", (req,res) => {  
    if (req.query.search) {
        db.all("SELECT * FROM products WHERE name LIKE $search", {
            $search: '%' + req.query.search + '%'
        },
             (err, rows) => {
                if (!rows[0]) {
                    return res.status(404).json({message:"No products found"});
                }
                return res.status(200).json(rows);
            }
        )
    } else {
        db.all("SELECT * FROM products", (err, rows) => {
            return res.status(200).json(rows);
        })
    }
});

//GET -> kaikki kategoriat tietokannasta
app.get("/api/verkkokauppa/categories", (req,res) => {
    db.all('SELECT DISTINCT category FROM products',
        (err, rows) => {
            return res.status(200).json(rows);
        })
})

//GET -> kaikki yhden kategorian tuotteet
app.get("/api/verkkokauppa/categories/:category", (req, res) => {
    db.all('SELECT * FROM products WHERE category=$category',
        {
            $category: req.params.category
        }, (err, rows) => {
            return res.status(200).json(rows);
        })
})

// GET -> yksi tuote tietokannasta
app.get("/api/verkkokauppa/:productId", (req, res) => {
    
    db.get('SELECT * FROM products WHERE ID=$productId', // Käytetään SQL:ää tuotteen löytämiseksi

        {
            $productId: req.params.productId // Määritellään productId
        }, (err, row) => {
            if (!row) {
                return res.status(404).json({message: "Product not found"}); // Jos Id ei vastaa mitään tuotetta
            } 
            return res.status(200).json(row);
            
        })
})


// POST -> luo uusi tuote tietokantaan
app.post("/api/verkkokauppa", isAdmin, (req,res) => {
    db.run('INSERT INTO products (name, price, category) VALUES ($name, $price, $category)', {
        $name: req.body.name,
        $price: req.body.price,
        $category: req.body.category
    }, (err) => {
        if (err) {
            res.status(409).json({message: "Invalid product values"});
        } else {
            res.status(201).json({message: "New product added to the database"});
        }
    })
})

// DELETE -> Poistaa halutun tuotteen tietokannasta
app.delete("/api/verkkokauppa/:productId", isAdmin, (req,res) => {
    db.run('DELETE FROM products WHERE ID = $productId', {
        $productId: req.params.productId
    }, (err) => {
        res.status(200).json({message: "Product deleted successfully"});
        }
    )
})

// PUT -> Muokkaa valitun tuotteen tietoja tietokannassa
app.put("/api/verkkokauppa/:productId", isAdmin, (req,res) => {
    db.run('UPDATE products SET name=$name, price=$price, category=$category WHERE ID = $productId', {
        $name: req.body.name,
        $price: req.body.price,
        $category: req.body.category,
        $productId: req.params.productId
    }, (err) => {
        if (err) {
            console.log(err.message);
            res.status(404).json({message: "Invalid update values"});
        } else {
            res.status(200).json({message: "Product updated successfully"});
        }
    })
})

let port = process.env.PORT || 3001;
app.listen(port);

console.log("Running in port",port);
