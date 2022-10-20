const express = require('express');
const res = require('express/lib/response');
const sqlite3 = require('sqlite3');

let app = express();                    //
app.use(express.json());                //kaikki menee expressin kautta

// Product Database

const db = new sqlite3.Database('../products.db');


// GET -> hakukriteerin mukainen tuotetietokanta
app.get("/api/verkkokauppa/", (req,res) => {  
    if (req.query.search || req.query.category) {
        db.all("SELECT * FROM products WHERE name LIKE $search", {
            $search: '%' + req.query.search + '%'
        },
             (err, rows) => {
                if (!rows[0]) {
                    return res.status(404).json({message:"No products found"})
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
app.post("/api/verkkokauppa", (req,res) => {
    db.run('INSERT INTO products (name, price, category) VALUES ($name, $price, $category)', {
        $name: req.body.name,
        $price: req.body.price,
        $category: req.body.category
    }, (err) => {
        if (err) {
            console.log(err.message);
            res.status(409).json({message: "Invalid product values"});
        } else {
            res.status(201).json({message: "New product added to the database"});
        }
    })
})

// DELETE -> Poistaa halutun tuotteen tietokannasta
app.delete("/api/verkkokauppa/:productId", (req,res) => {
    db.run('DELETE FROM products WHERE ID = $productId', {
        $productId: req.params.productId
    }, (err) => {
        res.status(200).json({message: "Product deleted successfully"});
        }
    )
})

// PUT -> Muokkaa valitun tuotteen tietoja tietokannassa
app.put("/api/verkkokauppa/:productId", (req,res) => {
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

//dev portti
let port = process.env.PORT || 3001;
app.listen(port);

console.log("Running in port",port);  // varmistusviesti

//npm init
//npm install express
//node server