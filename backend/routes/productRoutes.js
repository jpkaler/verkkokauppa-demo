const express = require('express');
const sqlite3 = require('sqlite3');
const isAdmin = require('../middleware/isAdmin');

// Router
productRouter = express.Router();

// Product Database
const db = new sqlite3.Database('../mockproducts.db');

// GET -> Kaikki tuotteet hakuehdon mukaan
productRouter.get("/", (req,res) => {  
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
productRouter.get("/categories", (req,res) => {
    db.all('SELECT DISTINCT category FROM products',
        (err, rows) => {
            return res.status(200).json(rows);
        })
})

//GET -> kaikki yhden kategorian tuotteet
productRouter.get("/categories/:category", (req, res) => {
    db.all('SELECT * FROM products WHERE category=$category',
        {
            $category: req.params.category
        }, (err, rows) => {
            return res.status(200).json(rows);
        })
})

// GET -> yksi tuote tietokannasta
productRouter.get("/:productId", (req, res) => {
    
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
productRouter.post("/", isAdmin, (req,res) => {
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
productRouter.delete("/:productId", isAdmin, (req,res) => {
    db.run('DELETE FROM products WHERE ID = $productId', {
        $productId: req.params.productId
    }, (err) => {
        res.status(200).json({message: "Product deleted successfully"});
        }
    )
})

// PUT -> Muokkaa valitun tuotteen tietoja tietokannassa
productRouter.put("/:productId", isAdmin, (req,res) => {
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

module.exports = productRouter;